import { register } from '../core/sim.js';
import { h, clear, randInt, shuffle } from '../core/dom.js';

// Lithuanian letters: first sound of a spoken word, then open-syllable building.
const WORDS = [
  { word: 'obuolys', emoji: '🍎', letter: 'o' },
  { word: 'medis', emoji: '🌳', letter: 'm' },
  { word: 'saulė', emoji: '☀️', letter: 's' },
  { word: 'katė', emoji: '🐈', letter: 'k' },
  { word: 'namas', emoji: '🏠', letter: 'n' },
  { word: 'žuvis', emoji: '🐟', letter: 'ž' },
  { word: 'lapė', emoji: '🦊', letter: 'l' },
  { word: 'ežys', emoji: '🦔', letter: 'e' },
  { word: 'vėliava', emoji: '🚩', letter: 'v' },
  { word: 'tortas', emoji: '🎂', letter: 't' },
  { word: 'balionas', emoji: '🎈', letter: 'b' },
  { word: 'pienas', emoji: '🥛', letter: 'p' },
  { word: 'durys', emoji: '🚪', letter: 'd' },
  { word: 'šuo', emoji: '🐕', letter: 'š' },
  { word: 'uoga', emoji: '🍇', letter: 'u' },
  { word: 'ėriukas', emoji: '🐑', letter: 'ė' },
  { word: 'automobilis', emoji: '🚗', letter: 'a' }
];

const VOWELS = ['a', 'e', 'ė', 'i', 'o', 'u', 'y'];
const CONSONANTS = ['b', 'd', 'k', 'l', 'm', 'n', 'p', 'r', 's', 'š', 't', 'v', 'ž'];

register('letters', () => ({
  mount(root, cfg, api) {
    let i = 0;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function next() {
      i++;
      if (i >= 4) { api.success('Pažįsti raides ir garsus.'); return; }
      i < 3 ? soundRound() : syllableLab();
    }

    function soundRound() {
      clear(wrap);
      const item = WORDS[randInt(0, WORDS.length - 1)];
      const options = shuffle([item.letter, ...shuffle(WORDS.filter(w => w.letter !== item.letter)).slice(0, 2).map(w => w.letter)]);
      let answered = false;

      const tiles = h('div', { class: 'sim-row' });
      options.forEach(letter => {
        const b = h('button', { class: 'tile', type: 'button', style: { fontSize: '1.7rem', minWidth: '72px', minHeight: '72px' } }, letter);
        b.addEventListener('click', () => {
          if (answered) return;
          api.speak(item.word);
          if (letter === item.letter) {
            answered = true;
            b.classList.add('is-right');
            api.feedback(`Taip! ${item.word} prasideda raide „${item.letter}“.`, 'ok');
            api.speak(`Taip. ${item.word}.`);
            setTimeout(next, 1200);
          } else {
            b.classList.add('is-wrong');
            api.wrong('Paklausyk dar kartą pirmo garso.');
            setTimeout(() => b.classList.remove('is-wrong'), 700);
          }
        });
        tiles.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Kokia raidė pradeda žodį?'),
        h('div', { style: { fontSize: '4.6rem', lineHeight: 1 }, 'aria-hidden': 'true' }, item.emoji),
        h('button', { class: 'speak-btn', type: 'button', onclick: () => api.speak(item.word) }, '🔈 Paklausyk žodžio'),
        tiles
      );
      setTimeout(() => api.speak(item.word), 300);
    }

    function syllableLab() {
      clear(wrap);
      let consonant = null;
      let built = 0;
      const out = h('div', { style: { fontSize: '2.6rem', fontWeight: 900, minHeight: '58px', letterSpacing: '.02em' } }, ' ');
      const say = h('button', { class: 'speak-btn', type: 'button' }, '🔈 Pasakyk');

      const cRow = h('div', { class: 'sim-row', style: { gap: '.4rem', maxWidth: '520px' } });
      const vRow = h('div', { class: 'sim-row', style: { gap: '.4rem', maxWidth: '520px' } });

      CONSONANTS.forEach(c => {
        const b = h('button', { class: 'tile', type: 'button' }, c);
        b.addEventListener('click', () => {
          consonant = c;
          [...cRow.children].forEach(x => x.classList.remove('selected'));
          b.classList.add('selected');
          api.sfx.pop();
          out.textContent = c;
        });
        cRow.append(b);
      });

      VOWELS.forEach(v => {
        const b = h('button', { class: 'tile', type: 'button' }, v);
        b.addEventListener('click', () => {
          if (!consonant) { api.wrong('Pirma pasirink priebalsį.'); return; }
          const syl = consonant + v;
          out.textContent = syl;
          api.speak(syl);
          api.sfx.pop();
          built++;
          if (built === 4) {
            api.feedback('Skaitei skiemenis: ' + '…', 'ok');
            api.success('Skiemenuoji! Dabar skaityk juos balsu.');
          }
        });
        vRow.append(b);
      });

      say.addEventListener('click', () => {
        if (out.textContent.trim()) api.speak(out.textContent.trim());
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Sukurk skiemenį: priebalsis + balsis'),
        out,
        say,
        h('p', { class: 'sim-sub' }, 'Priebalsiai'),
        cRow,
        h('p', { class: 'sim-sub' }, 'Balsiai'),
        vRow,
        h('p', { class: 'sim-sub' }, 'Sudaryk bent 4 skiemenis.')
      );
      api.speak('Pasirink priebalsį, paskui balsį. Perskaityk skiemenį balsu.');
    }

    soundRound();
  }
}));
