import { register } from '../core/sim.js';
import { h, clear, randInt } from '../core/dom.js';

// Pitch comparison and melody echo, using pure WebAudio tones (no files).
const SCALE = [
  { n: 'do', f: 261.63, c: '#ef4444' },
  { n: 're', f: 293.66, c: '#f59e0b' },
  { n: 'mi', f: 329.63, c: '#16a34a' },
  { n: 'fa', f: 349.23, c: '#0ea5e9' },
  { n: 'sol', f: 392.00, c: '#7c3aed' }
];

register('melody', () => ({
  mount(root, cfg, api) {
    let ctx = null;
    let mode = 'pitch';
    let round = 0;
    let locked = false;
    let seq = [];
    let entered = [];
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function ac() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function note(freq, at, dur = 0.5) {
      const c = ac();
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      const t = c.currentTime + at;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination);
      o.start(t); o.stop(t + dur + 0.05);
    }

    function playSeq(freqs, gap = 0.55) {
      freqs.forEach((f, idx) => note(f, idx * gap));
    }

    function draw() {
      clear(wrap);
      locked = false;

      if (mode === 'pitch') {
        const a = randInt(0, 4);
        let b = randInt(0, 4);
        if (a === b) b = (b + 2) % 5;
        const higherIsSecond = SCALE[b].f > SCALE[a].f;
        const play = h('button', { class: 'btn btn-primary', type: 'button' }, '▶ Paklausyk dviejų garsų');
        play.addEventListener('click', () => playSeq([SCALE[a].f, SCALE[b].f], 0.8));

        const choices = h('div', { class: 'sim-row' });
        [['Pirmas aukštesnis', higherIsSecond ? false : true], ['Antras aukštesnis', higherIsSecond ? true : false]].forEach(([label, correct]) => {
          const btn = h('button', { class: 'btn', type: 'button' }, label);
          btn.addEventListener('click', () => {
            if (locked) return;
            if (correct) {
              locked = true;
              btn.classList.add('is-right');
              api.feedback('Taip! Garsai skiriasi aukščiu.', 'ok');
              api.speak('Taip. Vienas garsas aukštesnis už kitą.');
              setTimeout(next, 1000);
            } else {
              api.wrong('Paklausyk dar kartą: kuris skamba ploniau?');
            }
          });
          choices.append(btn);
        });

        wrap.append(
          h('p', { class: 'sim-prompt' }, 'Kuris garsas aukštesnis?'),
          play, choices,
          h('p', { class: 'sim-sub' }, 'Aukštas garsas – plonas, kaip paukštis. Žemas – storas, kaip lokys.')
        );
        playSeq([SCALE[a].f, SCALE[b].f], 0.8);
      } else {
        if (seq.length === 0) {
          seq = Array.from({ length: 3 }, () => randInt(0, 4));
        }
        const play = h('button', { class: 'btn', type: 'button' }, '▶ Klausyti melodijos');
        play.addEventListener('click', () => {
          entered = [];
          playSeq(seq.map(i => SCALE[i].f));
          renderSlots();
        });

        const slots = h('div', { class: 'sim-row' });
        const renderSlots = () => {
          clear(slots);
          for (let k = 0; k < seq.length; k++) {
            slots.append(h('div', { class: `slot${entered[k] !== undefined ? ' filled' : ''}` },
              entered[k] !== undefined ? SCALE[entered[k]].n : '…'));
          }
        };

        const keys = h('div', { class: 'sim-row', style: { gap: '.4rem' } });
        SCALE.forEach((s, idx) => {
          const b = h('button', {
            class: 'tile', type: 'button',
            style: { background: s.c, color: '#fff', borderColor: s.c, minWidth: '64px' },
            'aria-label': s.n
          }, s.n);
          b.addEventListener('click', () => {
            if (locked || entered.length >= seq.length) return;
            note(s.f, 0, 0.3);
            entered.push(idx);
            renderSlots();
            if (entered.length === seq.length) {
              if (entered.every((v, k) => v === seq[k])) {
                locked = true;
                api.feedback('Melodija atpažinta!', 'ok');
                api.speak('Teisingai. Melodija atpažinta.');
                setTimeout(next, 1000);
              } else {
                api.wrong('Ne ta pati melodija. Klausyk dar kartą ir pradėk iš naujo.');
                entered = [];
                renderSlots();
              }
            }
          });
          keys.append(b);
        });

        wrap.append(h('p', { class: 'sim-prompt' }, 'Pakartok melodiją'), play, slots, keys);
        renderSlots();
        playSeq(seq.map(i => SCALE[i].f));
      }
    }

    function next() {
      round++;
      if (round === 4) { mode = 'melody'; seq = []; }
      if (round >= 6) { api.success('Girdi aukštį ir pakartoji melodiją.'); return; }
      draw();
    }

    draw();
  }
}));
