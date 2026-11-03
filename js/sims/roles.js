import { register } from '../core/sim.js';
import { h, clear, shuffle } from '../core/dom.js';

// Community roles: who uses which tool, and why the role matters.
const ROLES = [
  { who: 'Gydytojas', emoji: '👨‍⚕️', tool: '🩺', why: 'Klauso širdies ir padeda pasveikti.' },
  { who: 'Virėjas', emoji: '👩‍🍳', tool: '🍳', why: 'Ruošia maistą ir rūpinasi, kad būtų skanu.' },
  { who: 'Vairuotojas', emoji: '🚌', tool: '🚌', why: 'Saugiai veža žmones.' },
  { who: 'Statybininkas', emoji: '👷', tool: '🔧', why: 'Stato namus ir taiso.' },
  { who: 'Mokytojas', emoji: '👩‍🏫', tool: '📚', why: 'Moko ir padeda suprasti.' },
  { who: 'Paštininkas', emoji: '📮', tool: '✉️', why: 'Neša laiškus ir siuntas.' },
  { who: 'Gaisrininkas', emoji: '👨‍🚒', tool: '🚒', why: 'Gesina gaisrus ir gelbsti.' },
  { who: 'Bibliotekininkas', emoji: '📚', tool: '📖', why: 'Padeda rasti knygas.' }
];
const ALL_TOOLS = [...new Set(ROLES.map(r => r.tool))];

register('roles', () => ({
  mount(root, cfg, api) {
    const plan = shuffle(ROLES).slice(0, 5);
    let i = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function draw() {
      clear(wrap);
      locked = false;
      const role = plan[i];
      const options = shuffle([role.tool, ...shuffle(ALL_TOOLS.filter(t => t !== role.tool)).slice(0, 3)]);

      const grid = h('div', { class: 'sim-row', style: { gap: '.7rem' } });
      options.forEach(t => {
        const b = h('button', {
          class: 'tile', type: 'button',
          style: { fontSize: '2.2rem', minWidth: '84px', minHeight: '84px' },
          'aria-label': t
        }, t);
        b.addEventListener('click', () => {
          if (locked) return;
          if (t === role.tool) {
            locked = true;
            b.classList.add('is-right');
            api.feedback(`Taip! ${role.who} naudoja ${t}. ${role.why}`, 'ok');
            api.speak(`Taip. ${role.who}. ${role.why}`);
            setTimeout(() => {
              i++;
              if (i >= plan.length) api.success('Pažįsti žmones, kurie padeda mums kasdien.');
              else draw();
            }, 1500);
          } else {
            b.classList.add('is-wrong');
            api.wrong('Pagalvok, ką šis žmogus veikia visą dieną.');
            setTimeout(() => b.classList.remove('is-wrong'), 700);
          }
        });
        grid.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Ką naudoja ${role.who.toLowerCase()}?`),
        h('div', { style: { fontSize: '4rem', lineHeight: 1 }, 'aria-hidden': 'true' }, role.emoji),
        grid
      );
      api.speak(`Ką naudoja ${role.who.toLowerCase()}?`);
    }

    draw();
  }
}));
