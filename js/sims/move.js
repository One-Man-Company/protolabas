import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Coordination: see an arrow, move that way, tap it. 12 trials.
const DIRS = [
  { id: 'up', symbol: '⬆️', word: 'aukštyn' },
  { id: 'down', symbol: '⬇️', word: 'žemyn' },
  { id: 'left', symbol: '⬅️', word: 'kairėn' },
  { id: 'right', symbol: '➡️', word: 'dešinėn' }
];

register('move', () => ({
  mount(root, cfg, api) {
    const trials = 12;
    let i = 0;
    let correct = 0;
    let current = null;
    let timeout = null;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      locked = false;
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      current = dir;

      const banner = h('div', {
        style: { fontSize: '5rem', lineHeight: 1, textAlign: 'center', minHeight: '90px' },
        'aria-live': 'polite'
      }, dir.symbol);

      const pad = h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 84px)', gridTemplateRows: 'repeat(3, 84px)', gap: '.5rem', justifyContent: 'center' } });
      const place = (id, area) => {
        const b = h('button', {
          type: 'button',
          'aria-label': DIRS.find(d => d.id === id).word,
          style: { gridArea: area, borderRadius: '20px', border: '2px solid var(--line)', background: '#fff', fontSize: '2rem', cursor: 'pointer' }
        }, DIRS.find(d => d.id === id).symbol);
        b.addEventListener('click', () => pick(id, b));
        return b;
      };
      pad.append(place('up', '1 / 2'), place('left', '2 / 1'), place('right', '2 / 3'), place('down', '3 / 2'));

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Pašok į tą pusę ir paliesk rodyklę'),
        banner,
        pad,
        h('p', { class: 'sim-sub' }, `Bandymas ${i + 1} iš ${trials} · taiklūs: ${correct}`)
      );
      api.speak(`${dir.word === 'aukštyn' ? 'Aukštyn' : dir.word}.`);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!locked) pick(null, null);
      }, 2200);
    }

    function pick(id, btn) {
      if (locked) return;
      locked = true;
      clearTimeout(timeout);
      if (id === current.id) {
        correct++;
        api.sfx.good();
        if (btn) btn.style.background = 'var(--ok-soft)';
      } else {
        api.wrong(`Buvo ${current.word}.`);
      }
      i++;
      setTimeout(() => {
        if (i >= trials) {
          api.success(`Judėjai ir reagavai. Taiklūs bandymai: ${correct} iš ${trials}.`);
        } else draw();
      }, 700);
    }

    draw();
  }
}));
