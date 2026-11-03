import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Balance-scale number bonds to 10. Child composes the missing part.
register('bonds', () => ({
  mount(root, cfg, api) {
    const target = cfg.target || 10;
    const lefts = cfg.lefts || [6, 7, 8, 9, 5];
    let round = 0;
    let right = 0;
    let locked = false;

    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    const strip = (n, colour) => {
      const s = h('div', { class: 'tenframe', style: { width: 'min(100%, 300px)' } });
      for (let i = 0; i < target; i++) {
        const cell = h('div', { class: `cell${i < n ? ' filled' : ''}` });
        if (i < n) cell.append(h('span', { class: 'dot', style: { background: colour } }));
        s.append(cell);
      }
      return s;
    };

    function draw() {
      const left = lefts[round];
      clear(wrap);
      locked = false;

      const beam = h('div', {
        style: {
          width: 'min(100%, 320px)', height: '10px', background: 'var(--plum)', borderRadius: '99px',
          transform: `rotate(${Math.max(-7, Math.min(7, (right - left) * 1.4))}deg)`,
          transition: 'transform .45s cubic-bezier(.2,.8,.2,1)'
        }
      });
      const pivot = h('div', { style: { width: '8px', height: '26px', background: 'var(--plum)', opacity: '.6', margin: '0 auto', borderRadius: '4px' } });

      const pan = (n, colour, label) => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '.4rem', alignItems: 'center', flex: '1 1 140px' } },
        h('span', { class: 'range-label' }, `${label}: ${n}`),
        strip(n, colour)
      );

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Kairėje ${left}. Pridėk dešinėje, kad abi pusės būtų lygios.`),
        beam, pivot,
        h('div', { class: 'sim-row', style: { alignItems: 'flex-start' } },
          pan(left, 'var(--berry)', 'Kairė'),
          h('div', { style: { fontSize: '1.6rem', alignSelf: 'center', color: 'var(--muted)' }, 'aria-hidden': 'true' }, '⚖'),
          pan(right, 'var(--sky)', 'Dešinė')
        )
      );

      const chips = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(5, minmax(48px, 60px))' } });
      for (let v = 1; v <= 9; v++) {
        const b = h('button', { type: 'button', 'aria-label': `Pridėti ${v}` }, `+${v}`);
        b.addEventListener('click', () => {
          if (locked) return;
          const total = left + right + v;
          if (total > target) {
            api.wrong(`Bus ${total} – per daug. Pabandyk mažesnį skaičių.`);
            return;
          }
          right += v;
          api.sfx.pop();
          if (left + right === target) {
            locked = true;
            api.feedback(`Šaunu! ${left} ir ${target - left} – viso ${target}. Svarstyklės lygios!`, 'ok');
            api.speak(`Šaunu! ${left} ir ${target - left} yra ${target}.`);
            setTimeout(() => {
              round++;
              if (round >= lefts.length) { api.success('Dabar moki sudėti iki dešimt.'); return; }
              right = 0;
              draw();
            }, 1300);
          } else {
            api.speak(`Dabar ${right}.`);
          }
          draw();
        });
        chips.append(b);
      }

      const reset = h('button', { class: 'btn btn-sm', type: 'button' }, 'Iš naujo');
      reset.addEventListener('click', () => { if (!locked) { right = 0; draw(); } });

      wrap.append(chips, reset);
    }

    draw();
  }
}));
