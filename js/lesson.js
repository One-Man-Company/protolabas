import { i18n } from './core/i18n.js';
import { store } from './core/store.js';
import { speech } from './core/speech.js';
import { sfx } from './core/sfx.js';
import { h, clear } from './core/dom.js';
import { create as createSim } from './core/sim.js';
import './sims/index.js';

const params = new URLSearchParams(location.search);
const grade = Number(params.get('g') || 1);
const slug = params.get('m');

const els = {
  title: document.getElementById('lessonTitle'),
  chip: document.getElementById('subjectChip'),
  steps: document.getElementById('steps'),
  count: document.getElementById('stepCount'),
  actTitle: document.getElementById('actTitle'),
  actText: document.getElementById('actText'),
  stage: document.getElementById('stage'),
  speak: document.getElementById('speakBtn'),
  prev: document.getElementById('prevBtn'),
  next: document.getElementById('nextBtn'),
  hint: document.getElementById('hint'),
  sound: document.getElementById('soundBtn')
};

const run = {
  module: null,
  idx: 0,
  fails: 0,
  cleanups: [],
  done: false,
  start: Date.now()
};

function setFeedback(msg, type = 'ok') {
  els.hint.textContent = msg || '';
  els.hint.className = `hint${msg ? ' fb' : ''}${type === 'hint' ? ' hint' : ''}`;
}

function setNext(enabled, label) {
  els.next.disabled = !enabled;
  const span = els.next.querySelector('span');
  const text = label || (isLast() ? i18n.t('finish') : i18n.t('next'));
  if (span) span.textContent = text;
  else els.next.textContent = text;
}

const isLast = () => run.idx >= run.module.activities.length - 1;

function renderSteps() {
  clear(els.steps);
  run.module.activities.forEach((a, i) => {
    const d = h('span', { class: `step-dot${i < run.idx ? ' done' : i === run.idx ? ' current' : ''}` });
    els.steps.append(d);
  });
  els.steps.setAttribute('aria-valuenow', String(Math.round(run.idx / run.module.activities.length * 100)));
  els.count.textContent = `${i18n.t('activity')} ${run.idx + 1} ${i18n.t('of')} ${run.module.activities.length}`;
}

function activitySpeech(a) {
  const bits = [a.title, a.text].filter(Boolean);
  if (a.type === 'quiz' && a.question) bits.push(a.question);
  return bits.join('. ');
}

function mountTalk(a) {
  els.stage.append(
    h('div', { class: 'sim' },
      h('div', { style: { fontSize: '4.4rem', lineHeight: 1, textAlign: 'center' }, 'aria-hidden': 'true' }, a.visual || '✨'),
      a.bullets ? h('ul', { style: { maxWidth: '46ch', margin: '0 auto', color: 'var(--ink-soft)' } },
        a.bullets.map(b => h('li', {}, b))) : null
    )
  );
  setNext(true);
}

function mountQuiz(a) {
  const box = h('div', { class: 'choices', role: 'group', 'aria-label': a.question || '' });
  const keys = ['A', 'B', 'C', 'D'];
  a.options.forEach((opt, i) => {
    const btn = h('button', { class: 'choice', type: 'button' },
      h('span', { class: 'key', 'aria-hidden': 'true' }, keys[i]),
      h('span', {}, opt)
    );
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-right')) return;
      if (i === a.answer) {
        btn.classList.add('is-right');
        sfx.good();
        setFeedback(a.explain || i18n.t('wellDone'), 'ok');
        speech.speak(a.explain || i18n.t('wellDone'));
        store.skill((a.codes || run.module.curriculum?.codes || [])[0], true);
        setNext(true);
      } else {
        btn.classList.add('is-wrong');
        run.fails++;
        sfx.soft();
        const msg = a.hint || i18n.t('almost');
        setFeedback(msg, 'hint');
        speech.speak(msg);
      }
    });
    box.append(btn);
  });
  els.stage.append(h('div', { class: 'sim' }, box));
  setNext(false);
}

function mountReflect(a) {
  const chosen = new Set();
  const chips = (a.chips || []).map(c => {
    const b = h('button', { class: 'choice', type: 'button', 'aria-pressed': 'false' }, c);
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-right', on);
      if (on) chosen.add(c); else chosen.delete(c);
      sfx.pop();
      setNext(true);
    });
    return b;
  });
  els.stage.append(
    h('div', { class: 'sim' },
      h('div', { class: 'choices' }, chips),
      h('p', { class: 'sim-sub', style: { marginTop: '.4rem' } }, a.note || 'Pasirink, kas tau buvo svarbiausia.')
    )
  );
  setNext(true);
}

function mountSim(a) {
  let sim;
  try { sim = createSim(a.sim); } catch (err) {
    els.stage.append(h('div', { class: 'card' }, `Simuliacija „${a.sim}“ nerasta.`));
    setNext(true);
    return;
  }
  const api = {
    t: (k, v) => i18n.t(k, v),
    speak: (txt) => speech.speak(txt),
    stopSpeech: () => speech.stop(),
    sfx,
    feedback: (msg, type = 'ok') => setFeedback(msg, type),
    success: (msg) => {
      if (run.done) return;
      run.done = true;
      sfx.good();
      setFeedback(msg || i18n.t('wellDone'), 'ok');
      if (msg) speech.speak(msg);
      setNext(true);
    },
    wrong: (msg) => {
      run.fails++;
      sfx.soft();
      setFeedback(msg || i18n.t('almost'), 'hint');
    },
    skills: (code, ok) => store.skill(code || (run.module.curriculum?.codes || [])[0], ok),
    cleanup: (fn) => run.cleanups.push(fn),
    module: run.module
  };
  try {
    sim.mount(els.stage, a.config || {}, api);
  } catch (err) {
    console.error(err);
    els.stage.append(h('div', { class: 'card' }, 'Ši veikla nepavyko įkelti. Pereik toliau.'));
    setNext(true);
  }
  setNext(false);
}

function render() {
  run.cleanups.forEach(fn => { try { fn(); } catch (_) {} });
  run.cleanups = [];
  run.done = false;
  speech.stop();
  clear(els.stage);
  setFeedback('');
  const a = run.module.activities[run.idx];

  els.actTitle.textContent = a.title || a.question || '';
  els.actText.textContent = a.text || '';
  els.speak.hidden = !a.text;
  renderSteps();

  if (a.type === 'talk') mountTalk(a);
  else if (a.type === 'quiz') mountQuiz(a);
  else if (a.type === 'reflect') mountReflect(a);
  else if (a.type === 'sim') mountSim(a);
  else { setNext(true); }

  els.prev.disabled = run.idx === 0;
  setNext(a.type === 'talk' || a.type === 'reflect');

  if (a.type !== 'sim') {
    setTimeout(() => speech.speak(activitySpeech(a)), 260);
  } else {
    setTimeout(() => speech.speak(a.text || ''), 260);
  }
}

function finish() {
  speech.stop();
  clear(els.stage);
  const stars = run.fails === 0 ? 3 : run.fails <= 2 ? 2 : 1;
  const ms = Date.now() - run.start;
  store.complete(run.module.id, stars, ms);
  els.actTitle.textContent = i18n.t('completedTitle');
  els.actText.textContent = '';
  els.speak.hidden = true;
  els.next.disabled = true;
  els.prev.disabled = true;
  els.count.textContent = '';
  els.steps.querySelectorAll('.step-dot').forEach(d => d.classList.add('done'));

  els.stage.append(
    h('div', { class: 'finish' },
      h('div', { class: 'big', 'aria-hidden': 'true' }, '🎉'),
      h('div', { class: 'earned', 'aria-label': `${stars} / 3` }, '★'.repeat(stars) + '☆'.repeat(3 - stars)),
      h('h3', {}, i18n.t('completedText')),
      h('ul', {}, (run.module.objectives || []).map(o => h('li', {}, o))),
      h('div', { style: { display: 'flex', gap: '.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' } },
        h('a', { class: 'btn btn-primary', href: './#modules' }, i18n.t('toModules')),
        h('a', { class: 'btn', href: `mokytis.html?g=${grade}&m=${run.module.id}` }, i18n.t('playAgain'))
      )
    )
  );
  sfx.chime();
  speech.speak(i18n.t('completedTitle'));
}

function go(delta) {
  if (delta > 0) {
    if (isLast()) { finish(); return; }
    run.idx++;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (run.idx > 0) {
    run.idx--;
    render();
  }
}

function wire() {
  els.next.addEventListener('click', () => go(1));
  els.prev.addEventListener('click', () => go(-1));
  els.speak.addEventListener('click', () => speech.speak(activitySpeech(run.module.activities[run.idx])));
  els.sound.addEventListener('click', () => {
    const on = !(store.state.settings.audio !== false);
    store.setSetting('audio', on);
    els.sound.textContent = on ? '🔊' : '🔇';
    els.sound.setAttribute('aria-pressed', String(on));
    if (on) sfx.pop(); else speech.stop();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !els.next.disabled && document.activeElement?.tagName !== 'BUTTON') go(1);
  });
}

async function boot() {
  const lang = params.get('lang') || store.state.settings.lang || 'lt';
  i18n.setLang(lang);
  if (lang !== 'lt') {
    try {
      const overlay = await fetch(`content/grade-01/i18n/${lang}.json`).then(r => r.ok ? r.json() : null);
      i18n.setOverlay(overlay);
    } catch (_) {}
  }
  document.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = i18n.t(n.dataset.i18n); });
  els.sound.textContent = store.state.settings.audio !== false ? '🔊' : '🔇';
  els.sound.setAttribute('aria-pressed', String(store.state.settings.audio !== false));

  const dir = `content/grade-${String(grade).padStart(2, '0')}`;
  let manifest, mod;
  try {
    manifest = await fetch(`${dir}/_grade.json`).then(r => r.json());
    const id = slug || manifest.modules[0];
    mod = await fetch(`${dir}/modules/${id}/module.json`).then(r => r.json());
  } catch (err) {
    els.actTitle.textContent = i18n.t('notFound');
    els.actText.textContent = String(err.message);
    return;
  }

  mod = i18n.module(mod);
  run.module = mod;
  document.title = `${mod.title} — Protolabas`;
  els.title.textContent = mod.title;
  els.chip.textContent = mod.subjectLabel;
  els.chip.className = `chip ${mod.chipClass || ''}`;
  store.touch(mod.id);

  wire();
  render();

  // QA hook: lets automated audits walk every activity without solving it,
  // and lets a scheduled agent detect dead ends. Not used by learners.
  window.__protolabas = {
    run,
    go,
    render,
    finish,
    solveAll: () => {
      const a = run.module.activities[run.idx];
      if (a && a.type === 'quiz') {
        const c = document.querySelectorAll('#stage .choice');
        if (c[a.answer]) c[a.answer].click();
      }
    },
    forceNext: () => {
      els.next.disabled = false;
      go(1);
    }
  };
}

boot();
