import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Take-away strategy game: 12 stones, take 1–2, last stone wins.
// The winning rule is "leave a multiple of 3" — discovered, not told first.
register('nim', () => ({
  mount(root, cfg, api) {
    const start = cfg.stones || 12;
    let stones = start;
    let turn = 'you';
    let game = 0;
    let wins = 0;
    let message = '';
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function aiMove() {
      // Optimal: leave a multiple of 3. First game the opponent is careless.
      const careless = game === 0 && Math.random() < 0.7;
      let take;
      if (careless) take = 1 + Math.floor(Math.random() * 2);
      else {
        const rem = stones % 3;
        take = rem === 0 ? (stones > 1 ? 1 : 1) : rem;
      }
      take = Math.min(take, 2, stones);
      stones -= take;
      message = `Rokas paėmė ${take}.`;
      turn = 'you';
      api.speak(`Rokas paėmė ${take}.`);
      render();
      checkEnd();
    }

    function checkEnd() {
      if (stones === 0) {
        const youWon = turn === 'you' ? false : true;
        if (youWon) wins++;
        const text = youWon
          ? 'Tu laimėjai! Paskutinis akmuo – tavo.'
          : 'Rokas paėmė paskutinį. Pabandyk dar kartą.';
        api.feedback(text, youWon ? 'ok' : 'hint');
        api.speak(text);
        game++;
        setTimeout(() => {
          if (game >= 3) {
            api.success(`Sužaidei 3 kartus. Laimėjai ${wins}. Paslaptis: palik Rokui 3, 6 arba 9 akmenis.`);
          } else {
            stones = start;
            turn = 'you';
            message = 'Naujas žaidimas.';
            render();
          }
        }, 1800);
      }
    }

    function render() {
      clear(wrap);
      const pile = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '.45rem', justifyContent: 'center', maxWidth: '520px', minHeight: '80px' } });
      for (let k = 0; k < stones; k++) {
        pile.append(h('span', {
          style: {
            width: '26px', height: '26px', borderRadius: '50%', background: 'var(--ink)',
            display: 'inline-block', animation: 'popIn .2s ease'
          }
        }));
      }

      const controls = h('div', { class: 'sim-row' });
      const take = (n) => {
        if (turn !== 'you' || stones <= 0) return;
        const real = Math.min(n, stones);
        stones -= real;
        message = `Tu paėmei ${real}.`;
        turn = 'rokas';
        api.sfx.pop();
        render();
        if (stones === 0) {
          const text = 'Tu paėmei paskutinį – laimėjai!';
          wins++; game++;
          api.feedback(text, 'ok');
          api.speak(text);
          setTimeout(() => {
            if (game >= 3) api.success(`Laimėjai ${wins} iš 3. Paslaptis: palik 3, 6 arba 9.`);
            else { stones = start; turn = 'you'; render(); }
          }, 1800);
          return;
        }
        setTimeout(aiMove, 700);
      };

      [1, 2].forEach(n => {
        const b = h('button', { class: 'btn btn-primary', type: 'button', disabled: stones === 0 || turn !== 'you' }, `Imti ${n}`);
        b.addEventListener('click', () => take(n));
        controls.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Akmenų: ${stones}. Imk 1 arba 2. Kas paims paskutinį – laimi.`),
        pile,
        controls,
        h('p', { class: 'sim-sub', 'aria-live': 'polite' }, message || 'Tu pirmas.'),
        h('p', { class: 'sim-sub' }, `Žaidimas ${game + 1} iš 3 · laimėjimai: ${wins}`)
      );
      if (turn === 'rokas') {
        controls.querySelectorAll('button').forEach(b => b.disabled = true);
      }
    }

    render();
    api.speak('Dvylika akmenų. Imk vieną arba du. Kas paims paskutinį, laimi.');
  }
}));
