import { register } from '../core/sim.js';
import { h, clear, randInt } from '../core/dom.js';

// Pattern copying and line symmetry on a small grid.
register('shapes', () => ({
  mount(root, cfg, api) {
    const size = cfg.size || 3;
    let i = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    const grid = (cells, editable, onToggle) => {
      const g = h('div', {
        style: {
          display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, gap: '6px',
          width: 'min(100%, 230px)', aspectRatio: '1', background: 'var(--cream-deep)',
          padding: '8px', borderRadius: '18px'
        }
      });
      cells.forEach((on, idx) => {
        const c = h('button', {
          type: 'button',
          'aria-label': on ? 'Užpildytas langelis' : 'Tuščias langelis',
          'aria-pressed': String(on),
          disabled: !editable,
          style: {
            border: 'none', borderRadius: '10px', cursor: editable ? 'pointer' : 'default',
            background: on ? 'var(--plum)' : '#fff',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.05)',
            transition: 'background .15s'
          }
        });
        if (editable) c.addEventListener('click', () => {
          if (locked) return;
          const now = c.getAttribute('aria-pressed') === 'true';
          c.setAttribute('aria-pressed', String(!now));
          c.style.background = !now ? 'var(--plum)' : '#fff';
          onToggle(idx, !now);
          api.sfx.pop();
        });
        g.append(c);
      });
      return g;
    };

    function makePattern(fill) {
      const cells = new Array(size * size).fill(false);
      const k = randInt(fill[0], fill[1]);
      let guard = 0;
      while (cells.filter(Boolean).length < k && guard++ < 80) {
        cells[randInt(0, cells.length - 1)] = true;
      }
      return cells;
    }

    function roundCopy() {
      const pattern = makePattern([3, 5]);
      let mine = new Array(size * size).fill(false);
      clear(wrap);
      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Padaryk dešinėje tokią pat figūrą'),
        h('div', { class: 'sim-row', style: { alignItems: 'center' } },
          grid(pattern, false, () => {}),
          h('div', { style: { fontSize: '1.5rem', color: 'var(--muted)' }, 'aria-hidden': 'true' }, '➜'),
          grid(mine, true, (idx, on) => { mine[idx] = on; })
        )
      );
      const check = h('button', { class: 'btn btn-primary', type: 'button' }, 'Tikrinti');
      check.addEventListener('click', () => {
        if (locked) return;
        const ok = mine.every((v, idx) => v === pattern[idx]);
        if (ok) {
          locked = true;
          api.feedback('Tiksliai! Figūros sutampa.', 'ok');
          api.speak('Tiksliai! Figūros sutampa.');
          setTimeout(next, 1000);
        } else {
          api.wrong('Lygink po vieną langelį: viršus, vidurys, apačia.');
        }
      });
      wrap.append(check);
      api.speak('Padaryk dešinėje tokią pat figūrą.');
    }

    function roundSymmetry() {
      const half = Math.ceil(size / 2);
      const left = [];
      for (let r = 0; r < size; r++) for (let c = 0; c < half; c++) left.push(Math.random() < 0.55);
      // full grid: left mirrored to right
      const full = [];
      for (let r = 0; r < size; r++) {
        const row = left.slice(r * half, r * half + half);
        const mirrored = row.slice(0, size - half).reverse();
        full.push(...row, ...mirrored);
      }
      const mine = full.map((v, idx) => {
        const c = idx % size;
        return c < half ? v : false;
      });

      clear(wrap);
      const gridEl = grid(mine, false, () => {});
      // make right half editable
      [...gridEl.children].forEach((cell, idx) => {
        if (idx % size >= half) {
          cell.disabled = false;
          cell.style.cursor = 'pointer';
          cell.addEventListener('click', () => {
            if (locked) return;
            const now = cell.getAttribute('aria-pressed') === 'true';
            cell.setAttribute('aria-pressed', String(!now));
            cell.style.background = !now ? 'var(--plum)' : '#fff';
            mine[idx] = !now;
            api.sfx.pop();
          });
        }
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Užbaik paveikslą: dešinė pusė turi atspindėti kairę'),
        h('div', { style: { position: 'relative', display: 'grid', placeItems: 'center' } },
          gridEl,
          h('div', {
            style: {
              position: 'absolute', top: '-6px', bottom: '-6px', width: '0',
              borderLeft: '3px dashed var(--berry)', pointerEvents: 'none'
            }
          })
        )
      );

      const check = h('button', { class: 'btn btn-primary', type: 'button' }, 'Tikrinti');
      check.addEventListener('click', () => {
        if (locked) return;
        const ok = mine.every((v, idx) => v === full[idx]);
        if (ok) {
          locked = true;
          api.feedback('Puiku! Abi pusės veidrodinės.', 'ok');
          api.speak('Puiku! Abi pusės veidrodinės.');
          setTimeout(next, 1000);
        } else {
          api.wrong('Rask veidrodį: kas kairėje viršuje, tas dešinėje viršuje.');
        }
      });
      wrap.append(check);
      api.speak('Užbaik paveikslą. Dešinė pusė turi atspindėti kairę.');
    }

    function next() {
      i++;
      if (i >= 4) { api.success('Moki pastebėti taisykles ir simetriją.'); return; }
      i < 2 ? roundCopy() : roundSymmetry();
    }

    roundCopy();
  }
}));
