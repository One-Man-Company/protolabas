import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Counting and subitizing in a ten-frame. Grade 1 core: quantity ↔ numeral.
register('tenframe', () => ({
  mount(root, cfg, api) {
    const rounds = cfg.rounds || 5;
    const plan = [
      { max: 5, flash: false },
      { max: 9, flash: false },
      { max: 10, flash: false },
      { max: 6, flash: true },
      { max: 10, flash: true }
    ].slice(0, rounds);

    let i = 0;
    let answered = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    const pad = (n, onPick) => {
      const grid = h('div', { class: 'pad', style: { gridTemplateColumns: 'repeat(6, minmax(46px, 58px))' } });
      for (let v = 0; v <= 10; v++) {
        const b = h('button', { type: 'button', 'aria-label': String(v) }, String(v));
        b.addEventListener('click', () => onPick(v, b));
        grid.append(b);
      }
      return grid;
    };

    const board = (n, hidden) => {
      const frame = h('div', { class: 'tenframe', role: 'img', 'aria-label': hidden ? 'Tuščias rėmelis' : `${n} obuolių` });
      for (let c = 0; c < 10; c++) {
        const cell = h('div', { class: `cell${c < n && !hidden ? ' filled' : ''}` });
        if (c < n && !hidden) cell.append(h('span', { class: 'pop', style: { animationDelay: `${c * 40}ms` } }, '🍎'));
        frame.append(cell);
      }
      return frame;
    };

    function round() {
      answered = false;
      const p = plan[i];
      const n = Math.floor(Math.random() * p.max) + 1;
      clear(wrap);

      const title = h('p', { class: 'sim-prompt' }, p.flash ? 'Pažiūrėk atidžiai…' : 'Suskaičiuok ir pasirink skaičių');
      const frame = board(n, false);
      wrap.dataset.round = String(i + 1);
      wrap.append(title, h('p', { class: 'sim-sub' }, `Klausimas ${i + 1} iš ${plan.length}`), frame);

      const ask = () => {
        title.textContent = 'Kiek obuolių buvo?';
        clear(frame);
        const empty = board(0, true);
        frame.append(...empty.childNodes);
        api.speak('Kiek obuolių buvo?');
      };

      if (p.flash) {
        api.speak('Pažiūrėk atidžiai.');
        setTimeout(ask, 1100);
      } else {
        api.speak('Suskaičiuok obuolius.');
      }

      wrap.append(pad(n, (v, btn) => {
        if (answered) return;
        if (v === n) {
          answered = true;
          btn.classList.add('is-right');
          api.feedback(`Taip! ${n}.`, 'ok');
          api.sfx.good();
          api.speak(`Taip, ${n}.`);
          clear(frame);
          const full = board(n, false);
          frame.append(...full.childNodes);
          setTimeout(() => {
            i++;
            if (i >= plan.length) {
              api.success('Puiku! Skaičiuoji vis tiksliau.');
            } else {
              round();
            }
          }, 950);
        } else {
          btn.classList.add('is-wrong');
          api.wrong('Suskaičiuok po vieną: 1, 2, 3…');
          setTimeout(() => btn.classList.remove('is-wrong'), 600);
        }
      }));
    }

    round();
  }
}));
