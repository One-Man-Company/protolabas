import { register } from '../core/sim.js';
import { h, clear, shuffle } from '../core/dom.js';

// Road safety: the order of actions matters. Two scenarios.
const ROUNDS = [
  {
    title: 'Perėja su šviesoforu',
    steps: [
      { id: 'wait', label: 'Palauk žalios šviesos' },
      { id: 'left', label: 'Pažiūrėk į kairę' },
      { id: 'right', label: 'Pažiūrėk į dešinę' },
      { id: 'walk', label: 'Eik per perėją' }
    ],
    hasLight: true
  },
  {
    title: 'Perėja be šviesoforo',
    steps: [
      { id: 'left', label: 'Pažiūrėk į kairę' },
      { id: 'right', label: 'Pažiūrėk į dešinę' },
      { id: 'left2', label: 'Dar kartą į kairę' },
      { id: 'walk', label: 'Eik per perėją' }
    ],
    hasLight: false
  }
];

register('traffic', () => ({
  mount(root, cfg, api) {
    let round = 0;
    let step = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      step = 0;
      locked = false;
      const data = ROUNDS[round];

      const scene = h('div', { class: 'scene' });
      scene.innerHTML = `
        <svg viewBox="0 0 420 230" aria-label="Gatvė su perėja">
          <rect width="420" height="230" rx="20" fill="#e0f2fe"/>
          <rect y="60" width="420" height="26" fill="#cbd5e1"/>
          <rect y="150" width="420" height="80" fill="#94a3b8"/>
          <rect y="60" width="420" height="90" fill="#64748b"/>
          <g fill="#fff">${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${120 + i * 26}" y="66" width="16" height="78" rx="3"/>`).join('')}</g>
          <g transform="translate(352,96)">
            <rect x="-16" y="-28" width="32" height="52" rx="8" fill="#1f2937"/>
            <circle cx="0" cy="-16" r="6" fill="#ef4444"/>
            <circle cx="0" cy="0" r="6" fill="#facc15" opacity=".35"/>
            <circle cx="0" cy="16" r="6" fill="#22c55e" opacity=".35"/>
          </g>
          <g id="kid" transform="translate(40,190)">
            <circle cx="0" cy="-34" r="10" fill="#fcd34d"/>
            <rect x="-8" y="-24" width="16" height="22" rx="6" fill="#7c3aed"/>
            <line x1="-6" y1="-2" x2="-8" y2="12" stroke="#17212b" stroke-width="4" stroke-linecap="round"/>
            <line x1="6" y1="-2" x2="8" y2="12" stroke="#17212b" stroke-width="4" stroke-linecap="round"/>
          </g>
          <g id="car" transform="translate(470,132)">
            <rect x="-42" y="-16" width="84" height="32" rx="10" fill="#f59e0b"/>
            <rect x="-24" y="-28" width="44" height="16" rx="7" fill="#fbbf24"/>
            <circle cx="-22" cy="18" r="8" fill="#1f2937"/><circle cx="24" cy="18" r="8" fill="#1f2937"/>
          </g>
        </svg>`;

      const buttons = h('div', { class: 'choices', style: { maxWidth: '520px' } });
      shuffle(data.steps).forEach(s => {
        const b = h('button', { class: 'choice', type: 'button', dataset: { id: s.id } }, s.label);
        b.addEventListener('click', () => {
          if (locked || b.disabled) return;
          const expected = data.steps[step];
          if (s.id === expected.id) {
            b.classList.add('is-right');
            b.disabled = true;
            step++;
            api.sfx.pop();
            if (s.id === 'left' || s.id === 'left2' || s.id === 'right') api.speak('Žiūriu.');
            if (step === data.steps.length) {
              locked = true;
              const kid = scene.querySelector('#kid');
              kid.style.transition = 'transform 1.6s ease-in-out';
              kid.style.transform = 'translate(360px,190px)';
              api.feedback('Saugiai perėjai!', 'ok');
              api.speak('Saugiai perėjai.');
              setTimeout(() => {
                round++;
                if (round >= ROUNDS.length) api.success('Žinai saugaus ėjimo per gatvę tvarką.');
                else draw();
              }, 1800);
            }
          } else {
            api.wrong('Ne ta tvarka. Pagalvok: kas pirmiausia?');
            b.classList.add('is-wrong');
            setTimeout(() => b.classList.remove('is-wrong'), 700);
          }
        });
        buttons.append(b);
      });

      const hint = h('p', { class: 'sim-sub' }, data.hasLight ? 'Šviesoforas raudonas. Ką daryti pirmiausia?' : 'Šviesoforo nėra. Nuo ko pradėti?');

      wrap.append(
        h('p', { class: 'sim-prompt' }, data.title + ' – sudėliok veiksmus iš eilės'),
        scene, buttons, hint
      );
      api.speak(`${data.title}. Sudėliok veiksmus teisinga tvarka.`);
    }

    draw();
  }
}));
