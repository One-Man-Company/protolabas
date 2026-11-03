import { register } from '../core/sim.js';
import { h, clear, shuffle } from '../core/dom.js';

// Perspective taking: a choice, its consequence, and how the other child feels.
const SCENARIOS = [
  {
    title: 'Draugas nukrito',
    emoji: '🤕',
    choices: [
      { text: 'Padėti atsikelti', result: 'Draugas atsistoja ir nusišypso. Jis jaučiasi saugiai.' },
      { text: 'Eiti toliau', result: 'Draugas lieka vienas. Jam skauda ir liūdna.' },
      { text: 'Nusijuokti', result: 'Draugui gėda. Jis nebenori žaisti.' }
    ]
  },
  {
    title: 'Naujas mokinys klasėje',
    emoji: '🧑‍🎓',
    choices: [
      { text: 'Pasikviesti žaisti', result: 'Naujokas nusišypso – jis jaučiasi laukiamas.' },
      { text: 'Nieko nesakyti', result: 'Naujokas sėdi vienas ir nežino, ką daryti.' }
    ]
  },
  {
    title: 'Draugas pamiršo pieštukus',
    emoji: '✏️',
    choices: [
      { text: 'Paskolinti savo', result: 'Draugas gali piešti. Jis dėkingas.' },
      { text: 'Pasakyti mokytojui', result: 'Mokytojas padeda rasti sprendimą.' },
      { text: 'Nesidalinti', result: 'Draugas negali atlikti užduoties ir liūdi.' }
    ]
  }
];

const FEELINGS = ['linksma', 'liūdna', 'saugu', 'neramu', 'gėda'];

register('scenarios', () => ({
  mount(root, cfg, api) {
    let i = 0;
    let stage = 'choice';
    let chosen = null;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      const s = SCENARIOS[i];

      if (stage === 'choice') {
        const options = h('div', { class: 'choices' });
        shuffle(s.choices).forEach(c => {
          const b = h('button', { class: 'choice', type: 'button' }, h('span', {}, c.text));
          b.addEventListener('click', () => {
            chosen = c;
            stage = 'feel';
            api.sfx.pop();
            api.speak(c.result);
            draw();
          });
          options.append(b);
        });
        wrap.append(
          h('p', { class: 'sim-prompt' }, s.title),
          h('div', { style: { fontSize: '3.8rem', lineHeight: 1 }, 'aria-hidden': 'true' }, s.emoji),
          options
        );
        api.speak(s.title + '. Ką darytum?');
      } else {
        const chips = h('div', { class: 'sim-row', style: { gap: '.5rem', flexWrap: 'wrap' } });
        FEELINGS.forEach(f => {
          const b = h('button', { class: 'tile', type: 'button', style: { fontSize: '1rem', padding: '.6rem 1rem' } }, f);
          b.addEventListener('click', () => {
            b.classList.add('is-right');
            api.feedback('Ačiū, kad pagalvojai apie kito jausmus.', 'ok');
            api.speak('Ačiū, kad pagalvojai apie kito jausmus.');
            setTimeout(() => {
              i++;
              if (i >= SCENARIOS.length) {
                api.success('Moki pastebėti, kaip jaučiasi kitas.');
                return;
              }
              stage = 'choice';
              chosen = null;
              draw();
            }, 1000);
          });
          chips.append(b);
        });

        wrap.append(
          h('p', { class: 'sim-prompt' }, chosen ? chosen.result : ''),
          h('p', { class: 'sim-sub' }, 'Kaip dabar jaustųsi kitas vaikas?'),
          chips
        );
      }
    }

    draw();
  }
}));
