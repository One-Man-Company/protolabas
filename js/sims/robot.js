import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Algorithms: build a command sequence, run it, debug it.
const LEVELS = [
  { start: [4, 0], goal: [0, 0], walls: [] },
  { start: [4, 0], goal: [4, 4], walls: [[3, 2]] },
  { start: [4, 0], goal: [0, 4], walls: [[3, 1], [1, 3]] }
];

const CMDS = {
  up: { arrow: '⬆️', dr: -1, dc: 0, label: 'Aukštyn' },
  down: { arrow: '⬇️', dr: 1, dc: 0, label: 'Žemyn' },
  left: { arrow: '⬅️', dr: 0, dc: -1, label: 'Kairėn' },
  right: { arrow: '➡️', dr: 0, dc: 1, label: 'Dešinėn' }
};

register('robot', () => ({
  mount(root, cfg, api) {
    let level = 0;
    let queue = [];
    let robot = [...LEVELS[0].start];
    let running = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function reset() {
      robot = [...LEVELS[level].start];
      queue = [];
      running = false;
      render();
    }

    function render(note) {
      clear(wrap);
      const lv = LEVELS[level];
      const size = 5;

      const grid = h('div', {
        style: {
          display: 'grid', gridTemplateColumns: `repeat(${size}, minmax(48px, 64px))`, gap: '4px',
          background: 'var(--cream-deep)', padding: '8px', borderRadius: '18px'
        }
      });

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const isWall = lv.walls.some(([wr, wc]) => wr === r && wc === c);
          const isRobot = robot[0] === r && robot[1] === c;
          const isGoal = lv.goal[0] === r && lv.goal[1] === c;
          grid.append(h('div', {
            style: {
              aspectRatio: '1', borderRadius: '10px', display: 'grid', placeItems: 'center', fontSize: '1.5rem',
              background: isWall ? '#94a3b8' : isRobot ? 'var(--plum-soft)' : '#fff',
              border: isGoal ? '3px dashed var(--leaf)' : '1px solid rgba(0,0,0,.04)'
            }
          }, isRobot ? '🤖' : isGoal ? '⭐' : isWall ? '🧱' : ''));
        }
      }

      const pad = h('div', { class: 'sim-row', style: { gap: '.5rem' } });
      Object.entries(CMDS).forEach(([id, cmd]) => {
        const b = h('button', { class: 'tile', type: 'button', 'aria-label': cmd.label, disabled: running }, cmd.arrow);
        b.addEventListener('click', () => {
          if (running) return;
          queue.push(id);
          api.sfx.pop();
          render();
        });
        pad.append(b);
      });

      const queueBox = h('div', {
        style: {
          display: 'flex', gap: '4px', flexWrap: 'wrap', minHeight: '38px', justifyContent: 'center',
          padding: '.35rem', borderRadius: '12px', background: 'var(--cream-deep)', width: 'min(100%, 360px)'
        },
        'aria-label': 'Komandų seka'
      });
      if (queue.length === 0) queueBox.append(h('span', { class: 'sim-sub', style: { margin: 0 } }, 'Čia atsiras tavo komandos'));
      queue.forEach(id => queueBox.append(h('span', { style: { fontSize: '1.2rem' } }, CMDS[id].arrow)));

      const run = h('button', { class: 'btn btn-primary', type: 'button', disabled: running || queue.length === 0 }, '▶ Vykdyti');
      const clearBtn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', disabled: running }, 'Valyti');

      run.addEventListener('click', () => runQueue());
      clearBtn.addEventListener('click', () => { queue = []; robot = [...LEVELS[level].start]; render(); });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Nuvesk robotą iki žvaigždės. Lygis ${level + 1} iš 3`),
        grid, queueBox,
        h('div', { class: 'sim-row' }, run, clearBtn),
        h('p', { class: 'sim-sub' }, note || 'Sudėk komandas iš eilės, tada spausk „Vykdyti“.')
      );
    }

    function runQueue() {
      running = true;
      const lv = LEVELS[level];
      let step = 0;
      const tick = () => {
        if (step >= queue.length) {
          running = false;
          render('Komandos baigėsi. Ar pasiekei žvaigždę?');
          return;
        }
        const cmd = CMDS[queue[step]];
        const nr = robot[0] + cmd.dr;
        const nc = robot[1] + cmd.dc;
        if (nr < 0 || nr > 4 || nc < 0 || nc > 4) {
          running = false;
          api.wrong('Robotas atsimušė į sieną. Pataisyk komandas.');
          robot = [...lv.start];
          render('Siena! Pabandyk trumpesnį kelią.');
          return;
        }
        if (lv.walls.some(([wr, wc]) => wr === nr && wc === nc)) {
          running = false;
          api.wrong('Kliūtis! Apeik ją kitaip.');
          robot = [...lv.start];
          render('Kliūtis kelyje. Sudėk kitas komandas.');
          return;
        }
        robot = [nr, nc];
        api.sfx.pop();
        render();
        if (nr === lv.goal[0] && nc === lv.goal[1]) {
          running = false;
          queue = [];
          if (level >= LEVELS.length - 1) {
            api.success('Programavai robotą ir išsprendei visus lygius!');
          } else {
            level++;
            robot = [...LEVELS[level].start];
            api.feedback('Pasiekei žvaigždę! Kitas lygis.', 'ok');
            api.speak('Šaunu! Kitas lygis.');
            render();
          }
          return;
        }
        step++;
        setTimeout(tick, 320);
      };
      tick();
    }

    render();
    api.speak('Nuvesk robotą iki žvaigždės. Sudėk komandas ir spausk vykdyti.');
  }
}));
