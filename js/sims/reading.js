import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Build a word from syllables, guided by a picture. Lithuanian syllable reading.
const WORDS = [
  { word: 'katė', parts: ['ka', 'tė'], emoji: '🐈' },
  { word: 'namas', parts: ['na', 'mas'], emoji: '🏠' },
  { word: 'medis', parts: ['me', 'dis'], emoji: '🌳' },
  { word: 'žuvis', parts: ['žu', 'vis'], emoji: '🐟' },
  { word: 'saulė', parts: ['sau', 'lė'], emoji: '☀️' },
  { word: 'pienas', parts: ['pie', 'nas'], emoji: '🥛' },
  { word: 'lapė', parts: ['la', 'pė'], emoji: '🦊' },
  { word: 'gėlė', parts: ['gė', 'lė'], emoji: '🌸' },
  { word: 'tortas', parts: ['tor', 'tas'], emoji: '🎂' },
  { word: 'rutulys', parts: ['ru', 'tu', 'lys'], emoji: '⚽' }
];

const DISTRACTORS = ['ša', 'ko', 'ry', 'lu', 'pi', 'da', 'mė', 'ža', 'ti', 'no'];

register('reading', () => ({
  mount(root, cfg, api) {
    const plan = [0, 1, 2, 3, 9]; // ends with a 3-syllable challenge
    let i = 0;
    let built = [];
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function next() {
      i++;
      if (i >= plan.length) { api.success('Perskaitei visus žodžius!'); return; }
      draw();
    }

    function draw() {
      clear(wrap);
      built = [];
      locked = false;
      const item = WORDS[plan[i]];
      const need = item.parts.length;

      const tilesPool = [...item.parts, ...DISTRACTORS.slice(i, i + 2)];
      const shuffled = tilesPool
        .map((t, idx) => ({ t, r: Math.random() + (idx < need ? 0.25 : 0) }))
        .sort((a, b) => a.r - b.r)
        .map(x => x.t);

      const slots = h('div', { class: 'sim-row', style: { gap: '.5rem' } });
      const tileRow = h('div', { class: 'sim-row', style: { gap: '.5rem', flexWrap: 'wrap' } });

      const redrawSlots = () => {
        clear(slots);
        for (let s = 0; s < need; s++) {
          const val = built[s];
          const slot = h('button', {
            class: `slot${val ? ' filled' : ''}`, type: 'button',
            'aria-label': val ? `Skiemenis ${val}, paliesk kad nuimtum` : 'Tuščias skiemuo',
            disabled: !val
          }, val || '…');
          if (val) slot.addEventListener('click', () => {
            if (locked) return;
            built.splice(s, 1);
            redrawSlots();
            redrawTiles();
            api.sfx.pop();
          });
          slots.append(slot);
        }
      };

      const redrawTiles = () => {
        clear(tileRow);
        shuffled.forEach(t => {
          const used = built.filter(x => x === t).length >= shuffled.filter(x => x === t).length;
          const b = h('button', { class: `tile${used ? ' used' : ''}`, type: 'button', disabled: used }, t);
          b.addEventListener('click', () => {
            if (locked || built.length >= need) return;
            built.push(t);
            api.sfx.pop();
            redrawSlots();
            redrawTiles();
            if (built.length === need) check(item);
          });
          tileRow.append(b);
        });
      };

      const check = (it) => {
        if (built.join('') === it.word) {
          locked = true;
          api.feedback(`Taip! ${it.word}.`, 'ok');
          api.speak(`${it.word}.`);
          setTimeout(next, 1400);
        } else {
          api.wrong('Perskaityk: ar skamba kaip paveikslėlyje? Paspausk skiemenį, kad nuimtum.');
          api.speak(built.join(''));
        }
      };

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Sudėk žodį iš skiemenų'),
        h('div', { style: { fontSize: '4.4rem', lineHeight: 1 }, 'aria-hidden': 'true' }, item.emoji),
        h('button', { class: 'speak-btn', type: 'button', onclick: () => api.speak(item.word) }, '🔈 Paklausyk žodžio'),
        slots,
        tileRow
      );

      redrawSlots();
      redrawTiles();
      setTimeout(() => api.speak('Sudėk žodį iš skiemenų.'), 250);
    }

    draw();
  }
}));
