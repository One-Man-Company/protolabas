import { register } from '../core/sim.js';
import { h, clear, shuffle } from '../core/dom.js';

// Classification into two categories. Drag or tap-then-tap.
const ROUNDS = [
  {
    left: 'Gyva', right: 'Negyva',
    items: [
      { emoji: '🐦', name: 'paukštis', side: 'left', why: 'Kvėpuoja, maitinasi, auga.' },
      { emoji: '🪨', name: 'akmuo', side: 'right', why: 'Neauga ir nekvėpuoja.' },
      { emoji: '🌳', name: 'medis', side: 'left', why: 'Gyvas – auga ir kvėpuoja.' },
      { emoji: '💧', name: 'vanduo', side: 'right', why: 'Negyvas, bet būtinas gyvybei.' },
      { emoji: '🐜', name: 'skruzdėlė', side: 'left', why: 'Gyva būtybė.' },
      { emoji: '🪑', name: 'kėdė', side: 'right', why: 'Daiktas, ne gyvas.' }
    ]
  },
  {
    left: 'Gamta', right: 'Žmogaus sukurta',
    items: [
      { emoji: '🐟', name: 'žuvis', side: 'left', why: 'Sukurta gamtos.' },
      { emoji: '🚲', name: 'dviratis', side: 'right', why: 'Padarė žmogus.' },
      { emoji: '🌧️', name: 'lietus', side: 'left', why: 'Gamtos reiškinys.' },
      { emoji: '🏠', name: 'namas', side: 'right', why: 'Pastatė žmogus.' },
      { emoji: '🪨', name: 'akmuo', side: 'left', why: 'Gamtos kūnas.' },
      { emoji: '📱', name: 'telefonas', side: 'right', why: 'Žmogaus išradimas.' }
    ]
  }
];

register('sorting', () => ({
  mount(root, cfg, api) {
    let round = 0;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      const data = ROUNDS[round];
      const placed = new Map();
      let selected = null;

      const pool = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center', minHeight: '74px', width: '100%' } });
      const bins = h('div', { class: 'sim-row', style: { alignItems: 'stretch', width: '100%' } });

      const makeBin = (key, title) => {
        const items = h('div', { class: 'items' });
        const bin = h('div', { class: 'bin', dataset: { side: key } }, h('h4', {}, title), items);
        const accept = (item) => {
          placed.set(item.name, key);
          item.el.remove();
          items.append(item.el);
          item.el.style.outline = 'none';
          api.sfx.pop();
          if (placed.size === data.items.length) check();
        };
        bin.addEventListener('click', () => { if (selected) { accept(selected); selected = null; } });
        bin.addEventListener('dragover', (e) => { e.preventDefault(); bin.classList.add('over'); });
        bin.addEventListener('dragleave', () => bin.classList.remove('over'));
        bin.addEventListener('drop', (e) => {
          e.preventDefault();
          bin.classList.remove('over');
          const name = e.dataTransfer.getData('text/plain');
          const item = data.items.map(i => ({ ...i })).find(i => i.name === name);
          const live = [...pool.children].find(el => el.dataset.name === name);
          if (live && item) accept({ name, el: live, side: item.side });
        });
        return bin;
      };

      shuffle(data.items).forEach(item => {
        const el = h('button', {
          class: 'item', type: 'button', draggable: 'true', dataset: { name: item.name },
          'aria-label': item.name, title: item.name
        }, item.emoji);
        el.addEventListener('click', () => {
          if (selected) selected.el.style.outline = 'none';
          selected = { name: item.name, el, side: item.side };
          el.style.outline = '4px solid var(--sun)';
          api.sfx.pop();
          api.speak(item.name);
        });
        el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', item.name));
        pool.append(el);
      });

      const leftBin = makeBin('left', data.left);
      const rightBin = makeBin('right', data.right);
      bins.append(leftBin, rightBin);

      const check = () => {
        const wrong = data.items.filter(i => placed.get(i.name) !== i.side);
        if (wrong.length === 0) {
          api.feedback('Visi teisingai!', 'ok');
          api.speak('Visi teisingai.');
          setTimeout(() => {
            round++;
            if (round >= ROUNDS.length) api.success('Moki skirti gyvą nuo negyvo ir gamtą nuo daiktų.');
            else draw();
          }, 1200);
        } else {
          api.wrong(`${wrong.length} daiktai ne ten. Pažiūrėk: ${wrong[0].why}`);
          wrong.forEach(i => {
            const el = [...leftBin.querySelectorAll('.item'), ...rightBin.querySelectorAll('.item')]
              .find(n => n.dataset.name === i.name);
            if (el) { pool.append(el); placed.delete(i.name); }
          });
        }
      };

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Sudėk į dvi grupes: ${data.left} / ${data.right}`),
        pool,
        bins
      );
      api.speak(`Sudėk į dvi grupes. ${data.left} ir ${data.right}.`);
    }

    draw();
  }
}));
