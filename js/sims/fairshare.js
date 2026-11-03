import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Fair division: split, then the other child chooses. Divide-and-choose rule.
register('fairshare', () => ({
  mount(root, cfg, api) {
    const plan = [6, 7, 8];
    let i = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      locked = false;
      const total = plan[i];
      let mine = Math.floor(total / 2);

      const plates = h('div', { class: 'sim-row', style: { alignItems: 'stretch', width: '100%' } });

      const plate = (title, count, colour) => {
        const slices = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center', minHeight: '54px' } });
        for (let k = 0; k < count; k++) slices.append(h('span', { style: { fontSize: '1.5rem', lineHeight: 1 } }, '🍰'));
        return h('div', { class: 'bin', style: { borderStyle: 'solid', borderColor: colour } },
          h('h4', {}, title), slices, h('div', { class: 'range-label', style: { textAlign: 'center' } }, `${count} gabalėliai`));
      };

      const render = () => {
        clear(plates);
        plates.append(plate('Tu (dalini)', mine, 'var(--sky)'), plate('Rokas', total - mine, 'var(--berry)'));
        slider.value = mine;
        label.textContent = `Tu: ${mine} · Rokas: ${total - mine}`;
      };

      const slider = h('input', {
        class: 'range', type: 'range', min: 0, max: total, step: 1, value: mine,
        'aria-label': 'Kiek gabalėlių pasilieki',
        oninput: (e) => { mine = Number(e.target.value); render(); }
      });
      const label = h('span', { class: 'range-label' }, `Tu: ${mine} · Rokas: ${total - mine}`);

      const give = h('button', { class: 'btn btn-primary', type: 'button' }, 'Paduok lėkštes');
      give.addEventListener('click', () => {
        if (locked) return;
        locked = true;
        const diff = Math.abs(mine - (total - mine));
        const rokasTakes = mine >= total - mine ? 'tavo' : 'savo';
        const msg = diff === 0
          ? 'Rokas gavo lygiai tiek pat. Abiem sąžininga!'
          : `Rokas pasirinko ${rokasTakes === 'tavo' ? 'didesnę – tavo – lėkštę' : 'didesnę lėkštę'}. Tau liko mažiau.`;
        api.feedback(msg, diff === 0 ? 'ok' : 'hint');
        api.speak(msg);

        const fair = diff <= (total % 2 === 1 ? 1 : 0);
        setTimeout(() => {
          if (fair) {
            i++;
            if (i >= plan.length) {
              api.success('Supratai: dalink po lygiai – tada sąžininga, kad ir ką rinktųsi kitas.');
            } else draw();
          } else {
            locked = false;
            api.wrong('Pabandyk dar kartą: padalink taip, kad abiem būtų po lygiai.');
          }
        }, 1900);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Padalink ${total} gabalėlius torto dviem vaikams`),
        h('p', { class: 'sim-sub' }, 'Po to Rokas rinksis pirmas. Kaip padalinti, kad būtų sąžininga?'),
        plates, label, slider, give
      );
      render();
      api.speak(`Padalink ${total} gabalėlius dviem vaikams. Rokas rinksis pirmas.`);
    }

    draw();
  }
}));
