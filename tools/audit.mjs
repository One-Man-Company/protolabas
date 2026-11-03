#!/usr/bin/env node
/**
 * Protolabas content auditor — dependency-free (Node 22+, built-in WebSocket).
 *
 * Walks every module, activity by activity, in a real headless Chrome over CDP and
 * reports: JS exceptions, failed requests, blank activities, horizontal overflow,
 * quiz answers that do not unlock "Toliau", and sims that a naive solver cannot finish.
 *
 * Usage:
 *   python3 tools/serve.py 8092 &
 *   node tools/audit.mjs --base http://127.0.0.1:8092 --out .audit.json
 *
 * Exit code 0 = no blocking findings. 1 = blocking findings. 2 = harness failure.
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : fallback;
};

const BASE = arg('base', 'http://127.0.0.1:8092').replace(/\/$/, '');
const OUT = arg('out', '.audit.json');
const GRADE = Number(arg('grade', 1));
const PORT = Number(arg('port', 9333));
const CHROME = arg('chrome', process.env.CHROME_BIN || 'google-chrome');
const KEEP = argv.includes('--keep-window');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- tiny CDP client ---------- */

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.ready = new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(`${msg.error.message} (${msg.error.code})`)) : resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 30000);
    });
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true
    });
    if (r.exceptionDetails) {
      throw new Error(`eval threw: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    }
    return r.result?.value;
  }
  drain() {
    const out = this.events;
    this.events = [];
    return out;
  }
}

/* ---------- helpers ---------- */

async function launchChrome() {
  // Chrome's process-singleton socket lives under TMPDIR; Hermes' scratch path is
  // too long for AF_UNIX (108 bytes). Force a short temp root for the browser only.
  const root = process.env.AUDIT_TMP || '/tmp/pl-audit';
  mkdirSync(root, { recursive: true });
  const profile = mkdtempSync(join(root, 'p-'));
  const flags = [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--autoplay-policy=no-user-gesture-required',
    'about:blank'
  ];
  if (!KEEP) flags.unshift('--window-size=1024,900');
  const proc = spawn(CHROME, flags, {
    stdio: 'ignore',
    env: { ...process.env, TMPDIR: root }
  });
  proc.on('error', () => {});
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return proc;
    } catch (_) {}
    await sleep(150);
  }
  throw new Error('Chrome did not expose a debugging port');
}

async function openTab() {
  const r = await fetch(`http://127.0.0.1:${PORT}/json/new?url=about:blank`, { method: 'PUT' });
  const tab = await r.json();
  const cdp = new CDP(tab.webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await cdp.send('Network.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__errs=[];
      window.addEventListener('error',e=>window.__errs.push('ERR: '+e.message));
      window.addEventListener('unhandledrejection',e=>window.__errs.push('REJ: '+String((e.reason&&e.reason.message)||e.reason)));`
  });
  return cdp;
}

const CLICK_ALL = `(() => {
  const n = document.getElementById('nextBtn');
  let clicks = 0;
  for (let round = 0; round < 5 && n && n.disabled; round++) {
    const cands = [...document.querySelectorAll('#stage button, #stage [role=button], #stage .cell, #stage .tile, #stage label')];
    for (const el of cands) {
      if (!n.disabled) break;
      el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      clicks++;
    }
  }
  return { clicks, enabled: !!(n && !n.disabled) };
})()`;

async function goto(cdp, url) {
  await cdp.send('Page.navigate', { url });
  for (let i = 0; i < 60; i++) {
    await sleep(120);
    try {
      const ready = await cdp.eval('document.readyState');
      if (ready === 'complete') break;
    } catch (_) {}
  }
  await sleep(700);
}

async function auditModule(cdp, slug, manifest) {
  const res = { slug, url: `${BASE}/mokytis.html?g=${GRADE}&m=${slug}`, activities: [], findings: [] };
  await goto(cdp, res.url);
  cdp.drain();

  const booted = await cdp.eval('!!window.__protolabas && !!window.__protolabas.run.module');
  if (!booted) {
    res.findings.push({ level: 'blocking', kind: 'boot', detail: 'module did not boot (manifest or JSON error)' });
    return res;
  }

  const mod = await cdp.eval(`(() => { const m = window.__protolabas.run.module;
    return { id: m.id, title: m.title, activities: m.activities.map(a => ({ type: a.type, sim: a.sim || null, answer: a.answer ?? null })) }; })()`);
  res.title = mod.title;

  for (let i = 0; i < mod.activities.length; i++) {
    const a = mod.activities[i];
    const step = { index: i, type: a.type, sim: a.sim };

    // is the stage actually rendered?
    const rendered = await cdp.eval(`(() => {
      const st = document.getElementById('stage');
      return { nodes: st ? st.querySelectorAll('*').length : 0, w: st ? st.scrollWidth : 0, vw: innerWidth };
    })()`);
    step.nodes = rendered.nodes;
    if (rendered.nodes < 3) {
      res.findings.push({ level: 'blocking', kind: 'blank-activity', activity: i, sim: a.sim || null, detail: 'stage rendered no interactive content' });
    }
    if (rendered.w > rendered.vw + 4) {
      res.findings.push({ level: 'warn', kind: 'overflow', activity: i, sim: a.sim || null, detail: `stage is ${rendered.w}px wide vs viewport ${rendered.vw}px` });
    }

    if (a.type === 'quiz') {
      const clicked = await cdp.eval(`(() => {
        const c = document.querySelectorAll('#stage .choice');
        if (!c[${a.answer}]) return false;
        c[${a.answer}].click();
        return true;
      })()`);
      await sleep(250);
      const unlocked = await cdp.eval(`!document.getElementById('nextBtn').disabled`);
      step.solved = clicked && unlocked;
      if (!step.solved) {
        res.findings.push({ level: 'blocking', kind: 'quiz-dead-end', activity: i, detail: 'correct option did not unlock "Toliau"' });
      }
    } else if (a.type === 'reflect') {
      await cdp.eval(`document.querySelector('#stage .choice')?.click()`);
      step.solved = true;
    } else if (a.type === 'sim') {
      const r = await cdp.eval(CLICK_ALL);
      await sleep(500);
      const r2 = await cdp.eval(CLICK_ALL);
      step.solved = r2.enabled || r.enabled;
      step.clicks = (r.clicks || 0) + (r2.clicks || 0);
      if (!step.solved) {
        // informational: puzzle sims need real solving; a human pass is still required
        res.findings.push({
          level: 'info',
          kind: 'sim-unsolved-by-bot',
          activity: i,
          sim: a.sim,
          detail: 'naive clicker did not unlock "Toliau"; verify manually that a correct solution is reachable'
        });
      }
    } else {
      step.solved = true;
    }

    res.activities.push(step);

    await cdp.eval(`(() => { const n = document.getElementById('nextBtn');
      if (!n.disabled) n.click(); else window.__protolabas.forceNext(); })()`);
    await sleep(420);
  }

  const finalised = await cdp.eval(`document.getElementById('actTitle').textContent`);
  res.finished = /Baigei|Baigtas|Užbaigtas/i.test(finalised || '');
  if (!res.finished) {
    res.findings.push({ level: 'blocking', kind: 'no-finish', detail: `module did not reach the end screen (last title: ${finalised})` });
  }

  const errs = await cdp.eval('window.__errs || []');
  for (const e of errs) res.findings.push({ level: 'blocking', kind: 'js-error', detail: e });

  for (const ev of cdp.drain()) {
    if (ev.method === 'Runtime.exceptionThrown') {
      res.findings.push({ level: 'blocking', kind: 'js-error', detail: ev.params.exceptionDetails?.exception?.description?.slice(0, 300) || 'exception' });
    }
    if (ev.method === 'Network.responseReceived' && ev.params.response.status >= 400) {
      res.findings.push({ level: 'blocking', kind: 'http-error', detail: `${ev.params.response.status} ${ev.params.response.url}` });
    }
    if (ev.method === 'Log.entryAdded' && ev.params.entry.level === 'error') {
      res.findings.push({ level: 'warn', kind: 'console-error', detail: ev.params.entry.text?.slice(0, 200) });
    }
  }
  return res;
}

/* ---------- main ---------- */

(async () => {
  let chrome;
  try {
    const manifest = await fetch(`${BASE}/content/grade-${String(GRADE).padStart(2, '0')}/_grade.json`).then((r) => {
      if (!r.ok) throw new Error(`manifest HTTP ${r.status}`);
      return r.json();
    });
    chrome = await launchChrome();
    const cdp = await openTab();

    // hub sanity first
    await goto(cdp, `${BASE}/index.html`);
    const hub = await cdp.eval(`({ title: document.title, cards: document.querySelectorAll('.module-card, a[href*="mokytis"]').length })`);
    const hubFindings = [];
    if (!hub.cards) hubFindings.push({ level: 'blocking', kind: 'hub-empty', detail: 'no module cards on the hub' });
    const hubErrs = await cdp.eval('window.__errs || []');
    for (const e of hubErrs) hubFindings.push({ level: 'blocking', kind: 'js-error', detail: `hub: ${e}` });

    const modules = [];
    for (const slug of manifest.modules) {
      const r = await auditModule(cdp, slug, manifest);
      modules.push(r);
      const blocking = r.findings.filter((f) => f.level === 'blocking').length;
      process.stdout.write(`${blocking ? '✗' : '✓'} ${slug}${blocking ? ` (${blocking} blocking)` : ''}\n`);
    }

    const all = [...hubFindings, ...modules.flatMap((m) => m.findings.map((f) => ({ ...f, module: m.slug })))];
    const report = {
      generated: new Date().toISOString(),
      base: BASE,
      grade: GRADE,
      hub,
      modules: modules.length,
      blocking: all.filter((f) => f.level === 'blocking').length,
      warnings: all.filter((f) => f.level === 'warn').length,
      info: all.filter((f) => f.level === 'info').length,
      findings: all,
      detail: modules
    };
    writeFileSync(OUT, JSON.stringify(report, null, 1));
    console.log(`\n${report.modules} modules · ${report.blocking} blocking · ${report.warnings} warnings · ${report.info} manual checks → ${OUT}`);
    process.exit(report.blocking ? 1 : 0);
  } catch (err) {
    console.error('audit harness failed:', err.message);
    process.exit(2);
  } finally {
    if (chrome) chrome.kill();
  }
})();
