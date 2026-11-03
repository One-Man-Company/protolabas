import { register } from '../core/sim.js';
import { h, clear, randInt, shuffle } from '../core/dom.js';

// Place value 11–20: one ten + ones, built and read.
register('placevalue', () => ({
  mount(root, cfg, api) {
    const plan = [
      { mode: 'build', n: randInt(11, 15) },
      { mode: 'build', n: randInt(15, 19) },
      { mode: 'read', n: randInt(11, 19) },
      { mode: 'read', n: randInt(12, 18) },
      { mode: 'build', n: randInt(13, 19) }
    ];

    let i = 0;
    let tens = 0;
    let ones = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    const bundle = () => h('div', {
      title: 'dešimtukas', 'aria-label': 'vienas dešimtukas',
      style: {
        width: '46px', height: '64px', borderRadius: '8px', background: 'var(--plum-soft)',
        border: '2px solid var(--plum)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1px', padding: '4px'
      }
    }, ...Array.from({ length: 10 }, () => h('span', { style: { background: 'var(--plum)', opacity: '.75', borderRadius: '2px' } })));

    const stick = () => h('div', {
      title: 'vienetas', 'aria-label': 'vienas vienetas',
      style: { width: '9px', height: '62px', borderRadius: '4px', background: 'var(--sky)' }
    });

    function draw() {
      const p = plan[i];
      clear(wrap);
      locked = false;

      if (p.mode === 'build') {
        tens = 0; ones = 0;
        const target = h('div', { class: 'sim-prompt' }, `Sukurk skaičių ${p.n}`);
        const board = h('div', { style: { display: 'flex', gap: '1.2rem', alignItems: 'flex-end', minHeight: '90px', flexWrap: 'wrap', justifyContent: 'center' } });
        const counter = h('div', { class: 'range-label', style: { marginTop: '.5rem' } }, 'dešimtys: 0 · vienetai: 0');

        const redraw = () => {
          clear(board);
          for (let t = 0; t < tens; t++) board.append(bundle());
          for (let o = 0; o < ones; o++) board.append(stick());
          counter.textContent = `dešimtys: ${tens} · vienetai: ${ones} · viso ${tens * 10 + ones}`;
        };

        const addTen = h('button', { class: 'btn btn-primary', type: 'button' }, '+ 10');
        const addOne = h('button', { class: 'btn', type: 'button' }, '+ 1');
        const undo = h('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, 'Iš naujo');

        const check = () => {
          if (locked) return;
          const total = tens * 10 + ones;
          if (total === p.n) {
            locked = true;
            api.feedback(`Taip! 1 dešimtukas ir ${p.n - 10} vienetai – tai ${p.n}.`, 'ok');
            api.speak(`Taip! ${p.n}.`);
            setTimeout(next, 1200);
          } else if (total > p.n) {
            api.wrong(`Jau ${total} – per daug. Nuimk vienetą.`);
          }
        };

        addTen.addEventListener('click', () => { if (locked) return; tens++; api.sfx.pop(); redraw(); check(); });
        addOne.addEventListener('click', () => { if (locked) return; ones++; api.sfx.pop(); redraw(); check(); });
        undo.addEventListener('click', () => { if (locked) return; tens = 0; ones = 0; redraw(); });

        wrap.append(target, board, counter, h('div', { class: 'sim-row' }, addTen, addOne, undo));
        api.speak(`Sukurk skaičių ${p.n}. Pridėk dešimtuką ir vienetus.`);
        redraw();
      } else {
        const t = Math.floor(p.n / 10);
        const o = p.n % 10;
        const board = h('div', { style: { display: 'flex', gap: '1.2rem', alignItems: 'flex-end', minHeight: '90px', flexWrap: 'wrap', justifyContent: 'center' } });
        const tensBox = h('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '220px', justifyContent: 'center' } });
        const onesBox = h('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '220px', justifyContent: 'center' } });
        for (let k = 0; k < t; k++) tensBox.append(bundle());
        for (let k = 0; k < o; k++) onesBox.append(stick());
        board.append(h('div', { style: { textAlign: 'center' } }, h('div', { class: 'range-label' }, 'dešimtys'), tensBox),
          h('div', { style: { textAlign: 'center' } }, h('div', { class: 'range-label' }, 'vienetai'), onesBox));

        const options = shuffle([p.n, p.n + 1, p.n - 1, p.n + 2].filter(v => v >= 10 && v <= 20));
        const pad = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(4, minmax(56px, 66px))' } });
        options.forEach(v => {
          const b = h('button', { type: 'button' }, String(v));
          b.addEventListener('click', () => {
            if (locked) return;
            if (v === p.n) {
              locked = true;
              b.classList.add('is-right');
              api.feedback(`Taip! ${t} dešimtys ir ${o} vienetai = ${p.n}.`, 'ok');
              api.speak(`Taip, ${p.n}.`);
              setTimeout(next, 1100);
            } else {
              b.classList.add('is-wrong');
              api.wrong('Suskaičiuok dešimtukus, paskui vienetus.');
              setTimeout(() => b.classList.remove('is-wrong'), 700);
            }
          });
          pad.append(b);
        });

        wrap.append(h('p', { class: 'sim-prompt' }, 'Koks tai skaičius?'), board, pad);
        api.speak('Koks tai skaičius? Suskaičiuok dešimtukus ir vienetus.');
      }
    }

    function next() {
      i++;
      if (i >= plan.length) { api.success('Supratai, kaip veikia dešimtukai ir vienetai.'); return; }
      draw();
    }

    draw();
  }
}));
