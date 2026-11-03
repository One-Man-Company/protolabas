import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Movement sequence memory: watch, then repeat with your body and the buttons.
const MOVES = [
  { id: 'hands', emoji: '🙌', label: 'Rankos aukštyn' },
  { id: 'clap', emoji: '👏', label: 'Suplok' },
  { id: 'stomp', emoji: '🦶', label: 'Trypki' },
  { id: 'spin', emoji: '🌀', label: 'Apskrisk' }
];

register('dance', () => ({
  mount(root, cfg, api) {
    let length = 3;
    let seq = [];
    let entered = [];
    let showing = false;
    let active = null;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function makeSeq() {
      seq = Array.from({ length }, () => MOVES[Math.floor(Math.random() * MOVES.length)]);
      entered = [];
    }

    function play() {
      showing = true;
      entered = [];
      let k = 0;
      const tick = () => {
        if (k > 0) active = null;
        render();
        if (k >= seq.length) {
          showing = false;
          render();
          return;
        }
        active = seq[k].id;
        render();
        api.sfx.pop();
        k++;
        setTimeout(tick, 720);
      };
      tick();
    }

    function render() {
      clear(wrap);
      const buttons = h('div', { class: 'sim-row', style: { gap: '.6rem', flexWrap: 'wrap' } });

      MOVES.forEach(m => {
        const on = active === m.id;
        const b = h('button', {
          class: 'tile', type: 'button',
          style: {
            minWidth: '96px', minHeight: '96px', fontSize: '.85rem', gap: '.2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: on ? 'var(--sun-soft)' : '#fff',
            borderColor: on ? 'var(--sun)' : 'var(--line)',
            transform: on ? 'scale(1.08)' : 'none',
            transition: 'transform .15s, background .15s'
          }
        }, h('span', { style: { fontSize: '2rem' }, 'aria-hidden': 'true' }, m.emoji), m.label);
        b.addEventListener('click', () => {
          if (showing || entered.length >= seq.length) return;
          api.sfx.pop();
          entered.push(m);
          if (entered[entered.length - 1].id !== seq[entered.length - 1].id) {
            api.wrong('Ne ta judesį. Pažiūrėk dar kartą.');
            entered = [];
            setTimeout(play, 500);
            return;
          }
          if (entered.length === seq.length) {
            if (length >= 5) {
              api.success('Įsiminei ir pakartojai visą šokių seką!');
              return;
            }
            length++;
            api.feedback('Teisingai! Seka ilgėja.', 'ok');
            setTimeout(() => { makeSeq(); play(); }, 900);
          }
        });
        buttons.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, showing ? 'Žiūrėk ir įsimink judesius' : 'Pakartok judesius ta pačia tvarka'),
        buttons,
        h('p', { class: 'sim-sub' }, `Sekos ilgis: ${seq.length} · atlikta: ${entered.length}`),
        showing ? null : h('button', { class: 'btn btn-sm', type: 'button', onclick: play }, '▶ Rodyti dar kartą')
      );
    }

    makeSeq();
    render();
    setTimeout(play, 600);
  }
}));
