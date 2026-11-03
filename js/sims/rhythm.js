import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Rhythm grid: build a pattern, hear it, then copy a pattern by ear.
const ROWS = [
  { id: 'drum', label: 'Būgnas', emoji: '🥁', freq: 140, type: 'sine' },
  { id: 'bell', label: 'Varpelis', emoji: '🔔', freq: 880, type: 'triangle' },
  { id: 'shaker', label: 'Barškutis', emoji: '🪇', freq: 1600, type: 'square' }
];

register('rhythm', () => ({
  mount(root, cfg, api) {
    const steps = 8;
    let grid = ROWS.map(() => new Array(steps).fill(false));
    let ctx = null;
    let timer = null;
    let playing = false;
    let mode = 'free';
    let target = null;
    let checkMode = false;
    let rounds = 0;

    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function ac() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function hit(row) {
      const c = ac();
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = row.type;
      o.frequency.value = row.freq;
      g.gain.setValueAtTime(0.001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.09, c.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.16);
      o.connect(g).connect(c.destination);
      o.start(); o.stop(c.currentTime + 0.18);
    }

    function playLoop() {
      if (playing) {
        playing = false;
        clearInterval(timer);
        render();
        return;
      }
      playing = true;
      let step = 0;
      const bpm = 96;
      const interval = (60 / bpm / 2) * 1000; // eighth notes
      render();
      timer = setInterval(() => {
        ROWS.forEach((r, ri) => { if ((checkMode && target ? target[ri] : grid[ri])[step]) hit(r); });
        document.querySelectorAll(`.step-col`).forEach((col, idx) => {
          col.style.background = idx === step ? 'var(--sun-soft)' : 'transparent';
        });
        step = (step + 1) % steps;
        if (checkMode && step === 0 && playing) {
          // one bar only in check mode
          setTimeout(() => { playing = false; clearInterval(timer); render(); }, interval);
        }
      }, interval);
    }

    function makeTarget() {
      const t = ROWS.map(() => new Array(steps).fill(false));
      const n = 4;
      for (let k = 0; k < n; k++) {
        const r = Math.floor(Math.random() * ROWS.length);
        const s = Math.floor(Math.random() * steps);
        t[r][s] = true;
      }
      return t;
    }

    function render() {
      clear(wrap);
      const head = h('p', { class: 'sim-prompt' },
        checkMode ? 'Paklausyk ritmo ir atkartok' : 'Sukurk ritmą ir paklausyk');

      const gridEl = h('div', {
        style: {
          display: 'grid', gridTemplateColumns: `auto repeat(${steps}, minmax(26px, 1fr))`,
          gap: '4px', width: 'min(100%, 520px)', alignItems: 'center'
        }
      });

      ROWS.forEach((r, ri) => {
        gridEl.append(h('span', { style: { fontSize: '1.25rem' }, title: r.label, 'aria-label': r.label }, r.emoji));
        for (let s = 0; s < steps; s++) {
          const on = checkMode ? false : grid[ri][s];
          const cell = h('button', {
            type: 'button', class: 'step-col',
            'aria-label': `${r.label}, ${s + 1}`,
            'aria-pressed': String(on),
            style: {
              aspectRatio: '1', borderRadius: '8px', border: '2px solid var(--line)',
              background: on ? 'var(--plum)' : '#fff', cursor: 'pointer', transition: 'background .1s'
            }
          });
          cell.addEventListener('click', () => {
            if (checkMode) { target[ri][s] = !target[ri][s]; cell.style.background = target[ri][s] ? 'var(--sky)' : '#fff'; return; }
            grid[ri][s] = !grid[ri][s];
            cell.style.background = grid[ri][s] ? 'var(--plum)' : '#fff';
            cell.setAttribute('aria-pressed', String(grid[ri][s]));
            api.sfx.pop();
          });
          if (checkMode && target[ri][s]) cell.style.background = 'var(--sky)';
          gridEl.append(cell);
        }
      });

      const play = h('button', { class: 'btn btn-primary', type: 'button' }, playing ? '■ Stabdyti' : '▶ Klausyti');
      play.addEventListener('click', playLoop);

      const extra = h('div', { class: 'sim-row' });
      if (checkMode) {
        const check = h('button', { class: 'btn', type: 'button' }, 'Tikrinti');
        check.addEventListener('click', () => {
          let ok = 0;
          for (let ri = 0; ri < ROWS.length; ri++) for (let s = 0; s < steps; s++) if (grid[ri][s] === target[ri][s]) ok++;
          const total = ROWS.length * steps;
          if (ok === total) {
            rounds++;
            checkMode = false;
            api.feedback('Tiksliai! Ritmas atkartotas.', 'ok');
            api.speak('Tiksliai!');
            if (rounds >= 2) api.success('Moki išgirsti ir atkartoti ritmą.');
            else { target = null; render(); }
          } else {
            api.wrong('Paklausyk dar kartą ir lygink po vieną dūrį.');
          }
        });
        const replay = h('button', { class: 'btn btn-ghost', type: 'button' }, '🔈 Dar kartą');
        replay.addEventListener('click', playLoop);
        extra.append(check, replay);
      } else {
        const next = h('button', { class: 'btn', type: 'button' }, 'Išgirsti ritmą →');
        next.addEventListener('click', () => {
          if (playing) playLoop();
          target = makeTarget();
          checkMode = true;
          render();
          setTimeout(playLoop, 350);
        });
        extra.append(next);
      }

      wrap.append(head, gridEl, h('div', { class: 'sim-row' }, play, ...extra.children));
    }

    render();
    api.speak('Sukurk ritmą. Spausk langelius ir klausyk.');
  }
}));
