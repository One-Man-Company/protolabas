import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Construction: stack blocks so each one overlaps the one below.
register('build', () => ({
  mount(root, cfg, api) {
    const goal = cfg.goal || 6;
    const W = 320;
    const BLOCK_H = 34;
    let blocks = [{ x: 1, colour: '#c2703a' }];
    let tries = 0;
    let collapsed = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw(note) {
      clear(wrap);
      const tower = h('div', {
        style: {
          position: 'relative', width: `${W}px`, maxWidth: '100%', height: `${goal * BLOCK_H + 16}px`,
          background: 'linear-gradient(180deg, #e0f2fe, #f8fafc)', borderRadius: '18px',
          border: '1px solid var(--line)', overflow: 'hidden', margin: '0 auto'
        }
      });

      blocks.forEach((b, idx) => {
        tower.append(h('div', {
          style: {
            position: 'absolute', bottom: `${idx * BLOCK_H}px`, left: `${b.x * 20}%`,
            width: '60%', height: `${BLOCK_H - 2}px`, background: b.colour,
            borderRadius: '6px', border: '1px solid rgba(0,0,0,.12)',
            transform: collapsed && idx === blocks.length - 1 ? 'rotate(18deg) translateY(20px)' : 'none',
            transition: 'transform .3s'
          }
        }));
      });

      const level = blocks.length - 1;
      const pos = h('div', { class: 'sim-row' });
      [['Kairėn', 0], ['Vidurin', 1], ['Dešinėn', 2]].forEach(([label, x]) => {
        const b = h('button', { class: 'btn', type: 'button' }, label);
        b.addEventListener('click', () => place(x));
        pos.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Pastatyk ${goal} aukštų bokštą. Kiekvienas blokas turi remtis apatiniu.`),
        tower,
        h('div', { class: 'sim-sub' }, `Aukštis: ${level} / ${goal - 1} · bandymai: ${tries}`),
        pos,
        h('p', { class: 'sim-sub' }, note || 'Statyk tiesiai virš apatinio bloko.')
      );
    }

    function place(x) {
      collapseIfBad(x);
    }

    function collapseIfBad(x) {
      const top = blocks[blocks.length - 1];
      if (Math.abs(x - top.x) > 1) {
        collapsed = true;
        tries++;
        draw('Blokas nukrito! Statyk arčiau vidurio.');
        api.wrong('Nukrito – blokas per daug išsikišo. Bandyk iš naujo.');
        setTimeout(() => {
          blocks = [{ x: 1, colour: '#c2703a' }];
          collapsed = false;
          draw();
        }, 900);
        return;
      }
      blocks.push({ x, colour: ['#f59e0b', '#0ea5e9', '#16a34a', '#db2777', '#7c3aed'][blocks.length % 5] });
      api.sfx.pop();
      draw();
      if (blocks.length - 1 >= goal - 1) {
        api.success('Bokštas stovi! Supratai: blokas turi remtis apačia, o ne kabėti ore.');
      }
    }

    draw();
    api.speak('Pastatyk bokštą. Kiekvienas blokas turi remtis apatiniu.');
  }
}));
