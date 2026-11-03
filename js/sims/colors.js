import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Colour mixing (RYB model, simplified for six-year-olds).
const PAINTS = {
  raudona: '#ef4444',
  geltona: '#facc15',
  mėlyna: '#3b82f6',
  balta: '#ffffff',
  juoda: '#1f2937'
};

const MIX = {
  'geltona|raudona': { hex: '#f97316', name: 'oranžinė' },
  'geltona|mėlyna': { hex: '#22c55e', name: 'žalia' },
  'mėlyna|raudona': { hex: '#a855f7', name: 'violetinė' },
  'geltona|balta': { hex: '#fef08a', name: 'šviesiai geltona' },
  'raudona|balta': { hex: '#fca5a5', name: 'rožinė' },
  'mėlyna|balta': { hex: '#93c5fd', name: 'šviesiai mėlyna' },
  'raudona|juoda': { hex: '#7f1d1d', name: 'tamsiai raudona' },
  'geltona|juoda': { hex: '#713f12', name: 'ruda' },
  'mėlyna|juoda': { hex: '#1e3a8a', name: 'tamsiai mėlyna' }
};

const TARGETS = [
  { hex: '#f97316', name: 'oranžinę' },
  { hex: '#22c55e', name: 'žalią' },
  { hex: '#a855f7', name: 'violetinę' },
  { hex: '#93c5fd', name: 'šviesiai mėlyną' }
];

register('colors', () => ({
  mount(root, cfg, api) {
    let round = 0;
    let potA = null;
    let potB = null;
    let active = 'A';
    let result = null;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function mix(a, b) {
      const key = Object.keys(MIX).find(k => k.split('|').includes(a) && k.split('|').includes(b) && a !== b);
      if (key) return MIX[key];
      return { hex: '#9ca3af', name: 'pilka' };
    }

    function draw() {
      clear(wrap);
      const target = TARGETS[round];

      const mixer = h('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' } });
      const potEl = (which) => {
        const colour = which === 'A' ? potA : potB;
        const el = h('button', {
          type: 'button',
          'aria-label': `Puodas ${which}`,
          style: {
            width: '96px', height: '110px', borderRadius: '0 0 22px 22px',
            border: `3px solid ${active === which ? 'var(--ink)' : 'var(--line)'}`,
            background: colour ? PAINTS[colour] : '#fff', cursor: 'pointer',
            display: 'grid', placeItems: 'end center', paddingBottom: '.4rem', fontSize: '.75rem', fontWeight: 800,
            color: colour === 'balta' ? '#64748b' : '#fff'
          }
        }, colour || 'tuščias');
        el.addEventListener('click', () => { active = which; draw(); });
        return el;
      };

      mixer.append(potEl('A'), h('span', { style: { fontSize: '1.6rem' } }, '➕'), potEl('B'), h('span', { style: { fontSize: '1.6rem' } }, '🟰'));
      if (result) mixer.append(h('div', {
        style: { width: '96px', height: '110px', borderRadius: '0 0 22px 22px', background: result.hex, border: '3px solid var(--ink)' }
      }));

      const palette = h('div', { class: 'sim-row', style: { gap: '.5rem' } });
      Object.entries(PAINTS).forEach(([name, hex]) => {
        const b = h('button', {
          type: 'button', class: 'tile', 'aria-label': name,
          style: { background: hex, borderColor: 'rgba(0,0,0,.15)', width: '54px', height: '54px', borderRadius: '50%' }
        });
        b.addEventListener('click', () => {
          if (active === 'A') { potA = name; active = 'B'; } else { potB = name; active = 'A'; }
          result = null;
          api.sfx.pop();
          draw();
        });
        palette.append(b);
      });

      const check = h('button', { class: 'btn btn-primary', type: 'button' }, 'Tikrinti spalvą');
      check.addEventListener('click', () => {
        if (!potA || !potB) { api.wrong('Įdėk dažų į abu puodus.'); return; }
        result = mix(potA, potB);
        const dist = Math.abs(parseInt(result.hex.slice(1, 3), 16) - parseInt(target.hex.slice(1, 3), 16))
          + Math.abs(parseInt(result.hex.slice(3, 5), 16) - parseInt(target.hex.slice(3, 5), 16))
          + Math.abs(parseInt(result.hex.slice(5, 7), 16) - parseInt(target.hex.slice(5, 7), 16));
        draw();
        if (dist < 40) {
          api.feedback(`Gavai ${target.name}! ${potA} + ${potB}.`, 'ok');
          api.speak(`Gavai ${target.name} spalvą.`);
          setTimeout(() => {
            round++;
            potA = null; potB = null; result = null;
            if (round >= TARGETS.length) api.success('Moki maišyti spalvas ir gauti naujas.');
            else draw();
          }, 1400);
        } else {
          api.wrong(`Tai ${result.name}. Bandyk kitas dažų poras.`);
        }
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Sukurk ${target.name} spalvą`),
        h('div', {
          style: { width: '76px', height: '76px', borderRadius: '50%', background: target.hex, border: '3px solid #fff', boxShadow: 'var(--shadow)' },
          'aria-label': 'Tikslo spalva'
        }),
        mixer,
        h('p', { class: 'sim-sub' }, `Pasirinkti puodas: ${active}`),
        palette,
        check
      );
    }

    draw();
  }
}));
