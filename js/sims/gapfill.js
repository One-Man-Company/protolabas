import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Missing addend: one whole, one part, one empty cell.
//
// The child sets the missing part with a two-button stepper and commits with
// "Patikrink". Wrong answers are answered with what that number *makes* ("viso
// 7 – per daug, nuimk 2"), never with a verdict (P43). In counters mode the whole stays
// visible as a frame of empty places, so the child counts what is still free
// instead of holding it in working memory (P10); in symbols mode the frame is
// gone and only the equation remains (P13: object → picture → symbol).
//
// Visible controls per round: −1, +1, Patikrink. Three, never four (P10).

const PLANS = {
  counters: [
    { n: 5, part: 2 },
    { n: 7, part: 3 },
    { n: 9, part: 5 },
    { n: 10, part: 6 }
  ],
  symbols: [
    { n: 6, part: 2 },
    { n: 8, part: 5 },
    { n: 9, part: 4 },
    { n: 10, part: 7 }
  ]
};

const EXAMPLE = { a: 5, b: 4 };

function word(n) {
  return ['nulis', 'vienas', 'du', 'trys', 'keturi', 'penki', 'šeši', 'septyni', 'aštuoni', 'devyni', 'dešimt'][n] || String(n);
}

register('gapfill', () => ({
  mount(root, cfg, api) {
    const mode = cfg && cfg.mode === 'symbols' ? 'symbols' : 'counters';
    const plan = (PLANS[mode] || PLANS.counters).slice(0, Math.max(1, (cfg && cfg.rounds) || 4));

    let round = 0;
    let value = 0;
    let touched = false; // until the child moves the number, the cell stays a question mark
    let fails = 0;
    let locked = false;
    let firstTry = 0;
    const timers = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    api.cleanup(() => timers.forEach(clearTimeout));

    const wrap = h('div', { class: 'sim' });
    const prompt = h('p', { class: 'sim-prompt' });
    const status = h('p', { class: 'sim-sub', role: 'status', 'aria-live': 'polite' });
    const board = h('div', { class: 'sim-row', style: { flexDirection: 'column', gap: '0.6rem', width: '100%' } });
    // The frame lives in its own holder so a value change redraws only it.
    const frameHolder = h('div', { style: { display: 'flex', justifyContent: 'center', width: '100%' } });
    const help = h('div', { style: { display: 'none', width: '100%' } });
    wrap.append(prompt, status, board, help);
    root.append(wrap);

    // A frame of n places: `part` already dotted, `value` added by the child.
    function frame(n, part, added, muted) {
      const box = h('div', {
        class: 'tenframe',
        role: 'img',
        'aria-label': `${part} ir ${added} iš ${n}`,
        // flex-shrink:0 keeps the frame from collapsing inside the column flex
        style: { width: 'min(100%, 330px)', flex: '0 0 auto', opacity: muted ? '.85' : null }
      });
      for (let i = 0; i < n; i++) {
        const cell = h('div', { class: 'cell' });
        const given = i < part;
        const ownAdd = i >= part && i < part + added;
        if (given || ownAdd) {
          cell.classList.add('filled');
          cell.append(h('i', { class: `dot${ownAdd ? ' leaf' : ''}` }));
        }
        box.append(cell);
      }
      // Anything beyond the frame is shown, not asserted: the child sees the
      // overflow instead of being told about it.
      const spill = Math.max(0, part + added - n);
      const wrapFrame = h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'min(100%, 330px)', gap: '0.4rem' }
      }, box);
      if (spill) {
        // The extra dots sit in their own dashed strip, clearly outside the frame.
        const extra = h('div', {
          role: 'img',
          'aria-label': `${spill} per daug`,
          style: {
            display: 'flex', gap: '0.35rem', justifyContent: 'center',
            padding: '0.3rem 0.6rem', borderTop: '3px dashed var(--warn, #b45309)', width: '100%'
          }
        });
        for (let i = 0; i < spill; i++) {
          extra.append(h('i', {
            class: 'dot',
            style: {
              display: 'block', width: 'clamp(14px, 4.4vw, 20px)', height: 'clamp(14px, 4.4vw, 20px)',
              borderRadius: '50%', background: 'var(--warn, #b45309)'
            }
          }));
        }
        wrapFrame.append(extra);
      }
      return wrapFrame;
    }

    function equation(part, shown, n) {
      const blank = !touched;
      const cell = h('div', {
        class: `slot${blank ? '' : ' filled'}`,
        'aria-label': blank ? 'Tuščias langelis' : String(shown)
      }, blank ? '?' : String(shown));
      cell.style.fontSize = '1.7rem';
      return h('div', {
        class: 'sim-row',
        style: { gap: '0.55rem', fontSize: 'clamp(1.5rem, 7vw, 2.1rem)', fontWeight: '900' }
      },
        h('span', { 'aria-hidden': 'true' }, String(part)),
        h('span', { 'aria-hidden': 'true' }, '+'),
        cell,
        h('span', { 'aria-hidden': 'true' }, '='),
        h('span', { 'aria-hidden': 'true' }, String(n))
      );
    }

    function drawHelp() {
      const { a, b } = EXAMPLE;
      clear(help);
      help.style.display = 'block';
      help.append(
        h('div', { class: 'sim-row', style: { flexDirection: 'column', gap: '0.5rem' } },
          h('p', { class: 'sim-prompt', style: { fontSize: '1rem' } }, `Pavyzdys: ${a} + ${b} = ${a + b}`),
          frame(a + b, a, b, true)
        )
      );
      api.speak(`Pavyzdys. ${word(a)} ir ${word(b)} yra ${word(a + b)}. Visi langeliai pilni.`);
    }

    function draw() {
      const p = plan[round];
      locked = false;
      fails = 0;
      value = 0;
      touched = false;
      clear(board);
      clear(help);
      help.style.display = 'none';

      prompt.textContent = mode === 'symbols'
        ? 'Parodyk trūkstamą skaičių'
        : 'Kiek dar trūksta?';
      status.textContent = `Raundas ${round + 1} iš ${plan.length}`;

      board.append(equation(p.part, value, p.n));
      clear(frameHolder);
      // The frame shows the given part and the empty places only. The child's
      // number appears there after "Patikrink" — otherwise watching dots appear
      // would replace counting the free places.
      if (mode === 'counters') frameHolder.append(frame(p.n, p.part, 0, false));
      board.append(frameHolder);

      const stepper = h('div', {
        class: 'sim-row',
        style: { gap: '0.75rem', alignItems: 'center' }
      });
      const minus = h('button', {
        type: 'button',
        'aria-label': 'Vienu mažiau',
        style: { minWidth: '72px', minHeight: '72px', fontSize: '1.8rem' }
      }, '−');
      const plus = h('button', {
        type: 'button',
        'aria-label': 'Vienu daugiau',
        style: { minWidth: '72px', minHeight: '72px', fontSize: '1.8rem' }
      }, '+');

      const bump = (delta) => {
        if (locked) return;
        const max = p.n - p.part + 2; // one or two too many is allowed — the child sees the result
        const next = Math.max(0, Math.min(max, value + delta));
        if (next === value) return;
        value = next;
        touched = true;
        api.sfx && api.sfx.pop();
        redrawValue();
        // After a check the frame showed the guess; stepping again restores the
        // free places so the child recounts instead of nudging the picture full.
        clear(frameHolder);
        if (mode === 'counters') frameHolder.append(frame(p.n, p.part, 0, false));
      };
      minus.addEventListener('click', () => bump(-1));
      plus.addEventListener('click', () => bump(1));

      stepper.append(minus, plus);

      const check = h('button', {
        class: 'btn',
        type: 'button',
        style: { minHeight: '56px', padding: '0 1.6rem' }
      }, 'Patikrink');
      check.addEventListener('click', () => commit(check));

      board.append(stepper, check);
      // Round 1 already gets the activity text read by the runner; later rounds
      // need their own prompt or the screen goes silent.
      if (round > 0) {
        api.speak(mode === 'symbols'
          ? `${word(p.part)} ir kiek, kad būtų ${word(p.n)}?`
          : `Kiek dar trūksta? ${word(p.part)} jau yra, viso ${word(p.n)}.`);
      }
    }

    // Only the equation is redrawn while stepping: the stepper keeps focus and
    // the frame keeps showing the free places the child must count.
    function redrawValue() {
      const p = plan[round];
      board.firstChild.replaceWith(equation(p.part, value, p.n));
    }

    // Reveal the chosen number in the frame — right or wrong, the child sees
    // what it makes, then decides again.
    function revealFrame() {
      const p = plan[round];
      clear(frameHolder);
      if (mode === 'counters') frameHolder.append(frame(p.n, p.part, value, false));
    }

    function commit(btn) {
      if (locked) return;
      const p = plan[round];
      const gap = p.n - p.part;

      if (!touched) {
        // Nothing chosen yet is not a mistake — it is an empty answer.
        api.feedback('Paspausk + arba − ir parodyk skaičių.', 'hint');
        api.speak('Paspausk plius arba minus ir parodyk skaičių.');
        return;
      }

      if (value === gap) {
        locked = true;
        if (fails === 0) firstTry++;
        revealFrame();
        btn.classList.add('is-right');
        api.feedback(`${p.part} + ${value} = ${p.n}. Rėmelis pilnas.`, 'ok');
        api.speak(`Taip. ${word(p.part)} ir ${word(value)} yra ${word(p.n)}.`);
        later(next, 1200);
        return;
      }

      fails++;
      revealFrame();
      btn.classList.remove('is-right');
      btn.classList.add('is-wrong');
      later(() => btn.classList.remove('is-wrong'), 500);

      // Two kinds of honest consequence, never a verdict (P43, S1-12).
      const sum = p.part + value;
      const what = sum > p.n
        ? `Dabar viso ${sum} – per daug. Nuimk ${sum - p.n}.`
        : mode === 'counters'
          ? `Dabar viso ${sum}. Rėmelyje dar liko tuščių vietų.`
          : `Dabar ${p.part} ir ${value} – viso ${sum}. O reikia ${p.n}.`;

      if (fails >= 3) {
        // Third miss: show what fits, say why, move on with different numbers.
        locked = true;
        value = gap;
        redrawValue();
        revealFrame();
        api.feedback(`${what} Žiūrėk: ${p.part} + ${gap} = ${p.n}.`, 'hint');
        api.speak(`${what} Žiūrėk. ${word(p.part)} ir ${word(gap)} yra ${word(p.n)}.`);
        later(next, 1800);
        return;
      }

      api.wrong(what);
      api.speak(what);

      if (fails === 2) drawHelp(); // second miss changes the help type (S1-07/S1-08)
    }

    function next() {
      round++;
      if (round >= plan.length) {
        api.skills && api.skills(null, firstTry >= Math.ceil(plan.length * 0.75));
        api.success('Rėmelis pilnas kiekvieną kartą. Trūkstamą dalį randi atimdamas.');
        return;
      }
      draw();
    }

    draw();
  }
}));
