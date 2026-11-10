import { register } from '../core/sim.js';
import { h, clear, shuffle, randInt, svg } from '../core/dom.js';

// Clock: full hours only. The hour hand snaps to a tapped number — no dragging
// (P45: 6–7 year olds cannot reliably drag), no minutes, no timer.
const C = 150;         // dial centre in viewBox units
const R_HOUR = 62;     // short hand length
const R_MIN = 96;      // long hand length

function hourLabel(n) {
  if (n === 1) return '1 valanda';
  if (n >= 10) return `${n} valandų`;   // 10, 11, 12 valandų
  return `${n} valandos`;
}


function buildDial(hour) {
  const el = svg('svg', { viewBox: '0 0 300 300', class: 'clock-svg', 'aria-hidden': 'true' });

  el.append(svg('circle', { cx: C, cy: C, r: 132, fill: 'var(--surface, #fff)', stroke: '#c9d4de', 'stroke-width': 6 }));

  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const x1 = C + Math.cos(a) * 118, y1 = C + Math.sin(a) * 118;
    const x2 = C + Math.cos(a) * 126, y2 = C + Math.sin(a) * 126;
    el.append(svg('line', {
      x1, y1, x2, y2,
      stroke: i % 3 === 0 ? '#8fa3b5' : '#c9d4de',
      'stroke-width': i % 3 === 0 ? 4 : 2,
      'stroke-linecap': 'round'
    }));
  }

  // minute hand — always at 12 in this module
  el.append(svg('line', {
    x1: C, y1: C, x2: C, y2: C - R_MIN,
    stroke: '#2563eb', 'stroke-width': 7, 'stroke-linecap': 'round', class: 'hand-min'
  }));
  // hour hand
  el.append(svg('line', {
    x1: C, y1: C, x2: C, y2: C - R_HOUR,
    stroke: '#ea580c', 'stroke-width': 11, 'stroke-linecap': 'round',
    transform: `rotate(${hour * 30} ${C} ${C})`, class: 'hand-hour'
  }));
  el.append(svg('circle', { cx: C, cy: C, r: 11, fill: '#17212b' }));
  el.append(svg('circle', { cx: C, cy: C, r: 4, fill: '#fff' }));

  return el;
}

function buildNumbers(onPick) {
  const box = h('div', {
    class: 'clock-nums', role: 'group', 'aria-label': 'Laikrodžio skaičiai',
    style: { position: 'absolute', inset: '0' }
  });
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30) * Math.PI / 180;
    const left = 50 + Math.sin(a) * 41;
    const top = 50 - Math.cos(a) * 41;
    const b = h('button', {
      type: 'button',
      'aria-label': hourLabel(n),
      class: 'clock-num',
      style: {
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        transform: 'translate(-50%, -50%)',
        width: 'clamp(48px, 16%, 60px)',
        aspectRatio: '1',
        minWidth: '48px',
        minHeight: '48px',
        borderRadius: '50%',
        border: '2px solid #dbe4ec',
        background: 'var(--surface, #fff)',
        color: 'var(--ink, #17212b)',
        font: '700 clamp(0.95rem, 4.6vw, 1.2rem)/1 system-ui, sans-serif',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-s, 0 1px 3px rgba(0,0,0,.12))'
      }
    }, String(n));
    b.addEventListener('click', () => onPick(n, b));
    box.append(b);
  }
  return box;
}

register('clock', () => ({
  mount(root, cfg, api) {
    const mode = cfg && cfg.mode === 'read' ? 'read' : 'set';
    const total = Math.max(1, (cfg && cfg.rounds) || 3);
    let round = 0;
    let fails = 0;
    let target = 0;
    let locked = false;
    const timers = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    if (api.cleanup) api.cleanup(() => timers.forEach(clearTimeout));

    const wrap = h('div', { class: 'sim' });
    const prompt = h('p', { class: 'sim-prompt' });
    const stage = h('div', {
      style: { position: 'relative', width: 'min(92vw, 330px)', aspectRatio: '1', margin: '0.2rem auto 0.6rem' }
    });
    const pad = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(3, minmax(64px, 1fr))' } });
    wrap.append(prompt, stage, pad);
    root.append(wrap);

    function drawDial(hour, onPick, interactive) {
      clear(stage);
      stage.append(buildDial(hour));
      if (interactive) stage.append(buildNumbers(onPick));
    }

    function setHand(hour) {
      const hand = stage.querySelector('.hand-hour');
      if (hand) hand.setAttribute('transform', `rotate(${hour * 30} ${C} ${C})`);
    }

    function hintHands() {
      stage.querySelectorAll('.hand-hour').forEach(n => {
        n.setAttribute('stroke-width', '14');
        n.setAttribute('stroke', '#c2410c');
      });
      stage.querySelectorAll('.hand-min').forEach(n => {
        n.setAttribute('stroke-width', '9');
        n.setAttribute('stroke', '#1d4ed8');
      });
    }

    function done() {
      api.success(mode === 'set' ? 'Nustatai valandas laikrodyje.' : 'Perskaitai, kiek valandų.');
    }

    function nextRound() {
      round++;
      fails = 0;
      if (round >= total) { done(); return; }
      if (mode === 'set') setRound(); else readRound();
    }

    // ---- mode "set": child taps the hour number -----------------------------
    function setRound() {
      clear(pad);
      locked = false;
      const use24 = round === total - 1 && total >= 3;
      target = use24 ? 3 : randInt(1, 12);

      const startHour = (target % 12) + 1; // never starts on the answer
      drawDial(startHour, (n) => pick(n), true);

      if (use24) {
        prompt.textContent = `15:00 – tai 3 valanda po pietų. Nustatyk 3.`;
        api.speak('15:00 – tai 3 valanda po pietų. Nustatyk 3 valandą.');
      } else {
        prompt.textContent = `Nustatyk ${target} valandą`;
        api.speak(`Nustatyk ${hourLabel(target)}`);
      }
    }

    function pick(n) {
      if (locked) return;
      setHand(n);
      if (n === target) {
        locked = true;
        api.sfx && api.sfx.pop();
        api.feedback(`Taip, ${hourLabel(target)}.`, 'ok');
        api.speak(`Taip, ${hourLabel(target)}.`);
        later(nextRound, 900);
        return;
      }
      fails++;
      api.wrong(`Rodyklė dabar ties ${n}. Reikia ${target}.`);
      if (fails === 1) {
        api.speak(`Rodyklė dabar ties ${n}. Reikia ${target}.`);
      } else if (fails === 2) {
        hintHands();
        api.feedback('Trumpa rodyklė – valandos. Ilga stovi ties 12.', 'hint');
        api.speak('Trumpa rodyklė rodo valandas. Ilga rodyklė stovi ties 12.');
      } else {
        hintHands();
        api.feedback(`Štai ${target}: paliesk ${target}.`, 'hint');
        api.speak(`Štai ${hourLabel(target)}. Paliesk ${target}.`);
      }
    }

    // ---- mode "read": child reads the dial and picks the digital time ------
    function readRound() {
      clear(pad);
      locked = false;
      target = randInt(1, 12);
      drawDial(target, null, false);
      prompt.textContent = 'Kiek valandų rodo laikrodis?';
      api.speak('Kiek valandų rodo laikrodis? Pažiūrėk į trumpą rodyklę.');

      const near = shuffle([target + 1 > 12 ? 1 : target + 1, target - 1 < 1 ? 12 : target - 1]);
      const opts = shuffle([target, near[0], near[1]]);
      opts.forEach(v => {
        const b = h('button', { type: 'button', 'aria-label': `${v} valanda` },
          `${v}:00`);
        b.addEventListener('click', () => {
          if (locked) return;
          if (v === target) {
            locked = true;
            b.classList.add('is-right');
            api.feedback(`Taip, ${target}:00.`, 'ok');
            api.speak(`Taip, ${hourLabel(target)}.`);
            later(nextRound, 900);
            return;
          }
          fails++;
          b.classList.add('is-wrong');
          const msg = fails === 1
            ? `Skaičius ${target} yra po trumpąja rodykle.`
            : `Trumpa rodyklė ties ${target}. Paliesk ${target}:00.`;
          api.wrong(msg);
          api.speak(msg);
          if (fails >= 2) {
            hintHands();
            prompt.textContent = `Rodyklė ties ${target}`;
          }
          later(() => b.classList.remove('is-wrong'), 700);
        });
        pad.append(b);
      });
    }

    if (mode === 'set') setRound(); else readRound();
  }
}));
