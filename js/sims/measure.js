import { register } from '../core/sim.js';
import { h, clear, randInt, shuffle } from '../core/dom.js';

// Length: compare, order, and measure with a ruler (cm).
register('measure', () => ({
  mount(root, cfg, api) {
    let i = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function next() {
      i++;
      if (i >= 4) { api.success('Moki lyginti ir matuoti ilgį.'); return; }
      i === 0 ? compare() : i === 1 ? ruler() : i === 2 ? order() : ruler();
    }

    function compare() {
      clear(wrap);
      locked = false;
      const a = randInt(4, 10);
      let b = randInt(4, 10);
      if (a === b) b = a > 6 ? a - 2 : a + 2;
      const lengths = shuffle([a, b]);
      const bars = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 420px)' } });

      lengths.forEach((len, idx) => {
        const bar = h('button', {
          type: 'button',
          'aria-label': `Juosta ${idx + 1}`,
          style: {
            height: '44px', width: `${len * 9}%`, minWidth: '70px', border: 'none', borderRadius: '12px',
            background: idx === 0 ? 'var(--sky)' : 'var(--sun)', cursor: 'pointer',
            boxShadow: 'var(--shadow-s)'
          }
        });
        bar.addEventListener('click', () => {
          if (locked) return;
          if (len === Math.max(a, b)) {
            locked = true;
            api.feedback('Taip! Ši juosta ilgesnė.', 'ok');
            api.speak('Taip, ši juosta ilgesnė.');
            setTimeout(next, 900);
          } else {
            api.wrong('Palygink galus: kuri juosta tęsiasi toliau?');
          }
        });
        bars.append(bar);
      });

      wrap.append(h('p', { class: 'sim-prompt' }, 'Kuri juosta ilgesnė? Paliesk ją.'), bars);
      api.speak('Kuri juosta ilgesnė? Paliesk ją.');
    }

    function ruler() {
      clear(wrap);
      locked = false;
      const len = randInt(4, 9);
      const x0 = 24, unit = 34;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 380 120');
      svg.setAttribute('class', 'chart');
      const parts = [];
      parts.push(`<rect x="${x0}" y="18" width="${unit * 10}" height="62" rx="8" fill="#fef3c7" stroke="#e7c98a"/>`);
      for (let cm = 0; cm <= 10; cm++) {
        const x = x0 + cm * unit;
        parts.push(`<line x1="${x}" y1="18" x2="${x}" y2="${cm % 5 === 0 ? 44 : 34}" stroke="#9a6b1f" stroke-width="${cm % 5 === 0 ? 2 : 1}"/>`);
        parts.push(`<text x="${x}" y="60" font-size="12" text-anchor="middle" fill="#7c4a03" font-family="sans-serif">${cm}</text>`);
      }
      parts.push(`<rect x="${x0}" y="78" width="${len * unit}" height="14" rx="6" fill="#ea580c"/>`);
      parts.push(`<path d="M${x0} 92 L${x0} 104 L${x0 + 12} 98 Z" fill="#17212b"/>`);
      parts.push(`<text x="${x0 + unit * 5}" y="112" font-size="11" text-anchor="middle" fill="#5f6f7e" font-family="sans-serif">0 – 10 centimetrų</text>`);
      svg.innerHTML = parts.join('');

      const options = shuffle([len, len + 1, Math.max(1, len - 1), len + 2]);
      const pad = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(4, minmax(56px, 66px))' } });
      options.forEach(v => {
        const b = h('button', { type: 'button' }, String(v));
        b.addEventListener('click', () => {
          if (locked) return;
          if (v === len) {
            locked = true;
            b.classList.add('is-right');
            api.feedback(`Taip, ${len} cm.`, 'ok');
            api.speak(`Taip, ${len} centimetrų.`);
            setTimeout(next, 900);
          } else {
            b.classList.add('is-wrong');
            api.wrong('Pradėk nuo nulio ir skaičiuok brūkšnelius.');
            setTimeout(() => b.classList.remove('is-wrong'), 700);
          }
        });
        pad.append(b);
      });

      wrap.append(h('p', { class: 'sim-prompt' }, 'Kiek centimetrų ilgas pieštukas?'), svg, pad);
      api.speak('Kiek centimetrų ilgas pieštukas?');
    }

    function order() {
      clear(wrap);
      locked = false;
      const lens = shuffle([4, 6, 9]);
      const chosen = [];
      const row = h('div', { style: { display: 'flex', gap: '.8rem', alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' } });

      lens.forEach((len, idx) => {
        const bar = h('button', {
          type: 'button', 'aria-label': `Juosta ${idx + 1}`,
          style: {
            width: '54px', height: `${len * 16}px`, border: 'none', borderRadius: '10px',
            background: 'var(--plum)', cursor: 'pointer', boxShadow: 'var(--shadow-s)'
          }
        });
        bar.addEventListener('click', () => {
          if (locked || chosen.includes(len)) return;
          chosen.push(len);
          bar.style.outline = '4px solid var(--sun)';
          api.sfx.pop();
          const okSoFar = chosen.every((v, k) => k === 0 || v > chosen[k - 1]);
          if (!okSoFar) {
            api.wrong('Ne ta tvarka. Pradėk nuo trumpiausios.');
            chosen.length = 0;
            [...row.children].forEach(c => { c.style.outline = 'none'; });
            return;
          }
          if (chosen.length === 3) {
            locked = true;
            api.feedback('Surikiavai nuo trumpiausios iki ilgiausios!', 'ok');
            api.speak('Surikiavai nuo trumpiausios iki ilgiausios.');
            setTimeout(next, 1000);
          }
        });
        row.append(bar);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Paliesk juostas nuo trumpiausios iki ilgiausios'),
        row,
        h('p', { class: 'sim-sub' }, 'Pirma – trumpiausia.')
      );
      api.speak('Paliesk juostas nuo trumpiausios iki ilgiausios.');
    }

    compare();
  }
}));
