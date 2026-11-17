import { register } from '../core/sim.js';
import { h, clear, randInt } from '../core/dom.js';

// Comparing two quantities with =, <, >.
//
// The whole module rests on one visible rule: the wide (open) side of the sign
// faces the larger amount. So a wrong choice is answered with what that sign
// claims — "7 < 4 says the left is smaller, but the left is larger" — and never
// with a verdict (P43). Three signs only: a fourth button would break the
// three-choice limit for grade 1 (P10). No dragging, no timer (P45).

const SIGNS = [
  { sign: '=', name: 'lygu', opens: 'none' },
  { sign: '<', name: 'mažiau', opens: 'right' },
  { sign: '>', name: 'daugiau', opens: 'left' }
];

const bySign = (s) => SIGNS.find((x) => x.sign === s);

function expected(a, b) {
  if (a === b) return '=';
  return a < b ? '<' : '>';
}

function claim(sign, a, b) {
  if (sign === '=') return `${a} = ${b} – lygu`;
  if (sign === '<') return `${a} < ${b} – kairėje mažiau`;
  return `${a} > ${b} – kairėje daugiau`;
}

function truth(a, b) {
  if (a === b) return 'po lygiai';
  return a < b ? 'dešinėje daugiau' : 'kairėje daugiau';
}

// Round plan: one round in the middle is equal, so "=" is met on purpose (and
// its position varies from run to run) instead of being inferred from absence.
// Everything else is unequal, the first one widely apart.
function pairs(total) {
  const equalAt = Math.min(1 + (Math.random() < 0.5 ? 0 : 1), total - 1);
  const out = [];
  for (let i = 0; i < total; i++) {
    if (i === equalAt) {
      const v = randInt(2, 6);
      out.push([v, v]);
      continue;
    }
    let a = 0;
    let b = 0;
    let guard = 0;
    do {
      a = randInt(1, 10);
      b = randInt(1, 10);
      guard++;
    } while ((a === b || (i === 0 && Math.abs(a - b) < 2)) && guard < 40);
    out.push([a, b]);
  }
  return out;
}

function dots(n) {
  const box = h('div', {
    role: 'img',
    'aria-label': String(n),
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, auto)',
      gap: 'clamp(3px, 1vw, 6px)',
      justifyItems: 'center',
      alignItems: 'center',
      padding: 'clamp(5px, 1.4vw, 9px)',
      background: '#fff',
      border: '2px solid var(--line, #e9dfd0)',
      borderRadius: '16px',
      minHeight: 'clamp(44px, 11vw, 66px)',
      minWidth: 'clamp(58px, 15vw, 96px)'
    }
  });
  for (let k = 0; k < n; k++) {
    box.append(h('i', {
      style: {
        display: 'block',
        width: 'clamp(8px, 2.6vw, 14px)',
        height: 'clamp(8px, 2.6vw, 14px)',
        borderRadius: '50%',
        background: 'var(--plum, #7c3aed)'
      }
    }));
  }
  return box;
}

function numeral(n) {
  return h('div', {
    role: 'img',
    'aria-label': String(n),
    style: {
      fontSize: 'clamp(1.9rem, 8.5vw, 2.8rem)',
      fontWeight: '900',
      lineHeight: '1',
      padding: 'clamp(6px, 1.8vw, 12px)',
      minWidth: 'clamp(48px, 12vw, 72px)',
      textAlign: 'center',
      color: 'var(--ink, #17212b)'
    }
  }, String(n));
}

register('compare', () => ({
  mount(root, cfg, api) {
    const mode = cfg && cfg.mode === 'symbols' ? 'symbols' : 'pictures';
    const total = Math.max(2, (cfg && cfg.rounds) || 4);
    const plan = pairs(total);

    let round = 0;
    let fails = 0;
    let locked = false;
    const timers = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    api.cleanup(() => timers.forEach(clearTimeout));

    const wrap = h('div', { class: 'sim' });
    const prompt = h('p', { class: 'sim-prompt' });
    const row = h('div', {
      class: 'sim-row',
      style: { flexWrap: 'nowrap', gap: 'clamp(0.25rem, 1.4vw, 0.8rem)' }
    });
    const slot = h('div', {
      class: 'slot',
      'aria-live': 'polite',
      style: {
        minWidth: 'clamp(44px, 11vw, 64px)',
        minHeight: 'clamp(44px, 11vw, 64px)',
        fontSize: 'clamp(1.6rem, 7vw, 2.2rem)'
      }
    }, '?');
    const pad = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(3, minmax(70px, 88px))' } });
    wrap.append(prompt, row, pad);
    root.append(wrap);

    const sides = {};
    function sideBox(n) {
      return h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', borderRadius: '18px' }
      }, mode === 'symbols' ? numeral(n) : dots(n));
    }

    function drawRound() {
      clear(row);
      clear(pad);
      locked = false;
      fails = 0;
      slot.textContent = '?';
      slot.classList.remove('filled');

      const [a, b] = plan[round];
      sides.a = sideBox(a);
      sides.b = sideBox(b);
      row.append(sides.a, slot, sides.b);

      prompt.textContent = mode === 'symbols' ? 'Padėk ženklą tarp skaičių' : 'Kur mažiau, kur daugiau?';
      api.speak(mode === 'symbols'
        ? 'Padėk ženklą tarp skaičių.'
        : 'Palygink krūveles ir padėk ženklą.');

      SIGNS.forEach((s) => {
        const b2 = h('button', {
          type: 'button',
          'aria-label': s.name,
          style: { fontSize: 'clamp(1.5rem, 6vw, 2.1rem)' }
        }, s.sign);
        b2.addEventListener('click', () => pick(s.sign, b2, a, b));
        pad.append(b2);
      });
    }

    function highlightMore(a, b) {
      const target = a === b ? null : (a > b ? sides.a : sides.b);
      [sides.a, sides.b].forEach((el) => {
        if (!el) return;
        el.style.outline = el === target || (a === b) ? '3px solid #c2410c' : 'none';
        el.style.outlineOffset = '2px';
      });
    }

    function finishRound() {
      later(() => {
        round++;
        if (round >= total) {
          api.success(mode === 'symbols'
            ? 'Dedi ženklą ir be paveikslėlių.'
            : 'Skaitai krūveles ir dedi ženklą.');
        } else {
          drawRound();
        }
      }, 950);
    }

    function pick(sign, btn, a, b) {
      if (locked) return;
      slot.textContent = sign;
      slot.classList.add('filled');

      if (sign === expected(a, b)) {
        locked = true;
        btn.classList.add('is-right');
        api.sfx && api.sfx.pop();
        const meta = bySign(sign);
        api.feedback(`${claim(sign, a, b)}.`, 'ok');
        api.speak(meta.opens === 'none'
          ? 'Taip. Skaičiai lygūs.'
          : `Taip. ${meta.opens === 'right' ? 'Dešinėje' : 'Kairėje'} daugiau, todėl ženklas atsiveria į ${meta.opens === 'right' ? 'dešinę' : 'kairę'}.`);
        finishRound();
        return;
      }

      fails++;
      btn.classList.add('is-wrong');
      later(() => btn.classList.remove('is-wrong'), 500);

      if (fails >= 3) {
        locked = true;
        slot.textContent = expected(a, b);
        api.feedback(`Žiūrėk: ${claim(expected(a, b), a, b)}.`, 'hint');
        api.speak(`Žiūrėk. ${claim(expected(a, b), a, b)}.`);
        highlightMore(a, b);
        finishRound();
        return;
      }

      if (fails === 1) {
        api.wrong(`${claim(sign, a, b)}. O iš tikrųjų ${truth(a, b)}.`);
        api.speak(`${claim(sign, a, b)}. Bet iš tikrųjų ${truth(a, b)}.`);
        return;
      }

      highlightMore(a, b);
      const where = a === b ? 'Abiejose pusėse po lygiai.' : (a < b ? 'Daugiau yra dešinėje.' : 'Daugiau yra kairėje.');
      api.feedback(`${where} Ženklas atsiveria į didesnę pusę.`, 'hint');
      api.speak(`${where} Ženklas atsiveria į didesnę pusę.`);
    }

    drawRound();
  }
}));
