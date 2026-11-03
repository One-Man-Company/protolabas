import { register } from '../core/sim.js';
import { h, clear, randInt } from '../core/dom.js';

// Seasons: month drives day length, weather, tree and clothing.
const MONTHS = ['sausis', 'vasaris', 'kovas', 'balandis', 'gegužė', 'birželis', 'liepa', 'rugpjūtis', 'rugsėjis', 'spalis', 'lapkritis', 'gruodis'];
const SEASONS = {
  ziema: { label: 'Žiema', sky: ['#dbeafe', '#eff6ff'], ground: '#f8fafc', crown: null, temp: 'šalta', light: 8 },
  pavasaris: { label: 'Pavasaris', sky: ['#e0f2fe', '#f0fdf4'], ground: '#dcfce7', crown: '#86efac', temp: 'vėsu', light: 13 },
  vasara: { label: 'Vasara', sky: ['#bae6fd', '#fef9c3'], ground: '#bbf7d0', crown: '#16a34a', temp: 'šilta', light: 17 },
  ruduo: { label: 'Ruduo', sky: ['#e2e8f0', '#fef3c7'], ground: '#fde68a', crown: '#f59e0b', temp: 'vėsu', light: 11 }
};

function seasonOf(month) {
  if ([12, 1, 2].includes(month)) return 'ziema';
  if ([3, 4, 5].includes(month)) return 'pavasaris';
  if ([6, 7, 8].includes(month)) return 'vasara';
  return 'ruduo';
}

register('seasons', () => ({
  mount(root, cfg, api) {
    const plan = [1, 4, 7, 10, 12];
    let i = 0;
    let locked = false;
    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function scene(month) {
      const key = seasonOf(month);
      const s = SEASONS[key];
      const sunY = 92 - Math.sin((month - 1) / 12 * Math.PI * 2) * 22;
      const snow = key === 'ziema';
      const blossom = key === 'pavasaris';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 400 260');
      svg.innerHTML = `
        <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${s.sky[0]}"/><stop offset="1" stop-color="${s.sky[1]}"/>
        </linearGradient></defs>
        <rect width="400" height="260" rx="22" fill="url(#sky)"/>
        <circle cx="322" cy="${sunY}" r="26" fill="#fde047" opacity=".95"/>
        <rect y="200" width="400" height="60" fill="${s.ground}"/>
        <rect x="176" y="150" width="16" height="62" rx="6" fill="#92400e"/>
        ${key === 'ziema'
          ? `<g stroke="#92400e" stroke-width="6" stroke-linecap="round">
               <line x1="184" y1="160" x2="150" y2="130"/><line x1="184" y1="160" x2="218" y2="128"/>
               <line x1="184" y1="145" x2="162" y2="112"/><line x1="184" y1="145" x2="206" y2="110"/>
             </g>`
          : `<g><circle cx="184" cy="132" r="46" fill="${s.crown}"/>
               <circle cx="152" cy="148" r="30" fill="${s.crown}"/>
               <circle cx="216" cy="148" r="30" fill="${s.crown}"/></g>`}
        ${blossom ? `<g fill="#fbcfe8"><circle cx="160" cy="120" r="6"/><circle cx="196" cy="108" r="5"/><circle cx="212" cy="140" r="6"/><circle cx="146" cy="146" r="5"/></g>` : ''}
        ${key === 'ruduo' ? `<g fill="#ea580c"><circle cx="150" cy="196" r="5"/><circle cx="230" cy="186" r="4"/><circle cx="262" cy="206" r="5"/></g>` : ''}
        ${snow ? `<g fill="#fff"><circle cx="60" cy="60" r="4"/><circle cx="110" cy="100" r="3"/><circle cx="250" cy="70" r="4"/><circle cx="300" cy="140" r="3"/><circle cx="40" cy="150" r="3"/></g>` : ''}
      `;
      return { svg, s, key };
    }

    function draw() {
      clear(wrap);
      locked = false;
      const month = plan[i];
      const { svg, s, key } = scene(month);

      const lightPct = Math.round(s.light / 24 * 100);
      const meter = h('div', { class: 'meter' }, h('i', { style: { width: `${lightPct}%`, background: 'var(--sun)' } }));

      const opts = h('div', { class: 'choices', style: { maxWidth: '480px' } });
      Object.entries(SEASONS).forEach(([k, v]) => {
        const b = h('button', { class: 'choice', type: 'button' }, v.label);
        b.addEventListener('click', () => {
          if (locked) return;
          if (k === key) {
            locked = true;
            b.classList.add('is-right');
            api.feedback(`Taip! ${MONTHS[month - 1]} – ${v.label.toLowerCase()}.`, 'ok');
            api.speak(`Taip. ${MONTHS[month - 1]}. Tai ${v.label}.`);
            setTimeout(() => {
              i++;
              if (i >= plan.length) api.success('Skiri metų laikus pagal mėnesį ir gamtą.');
              else draw();
            }, 1400);
          } else {
            b.classList.add('is-wrong');
            api.wrong('Pažiūrėk į medį ir dangų. Ar lapai žali, geltoni, ar jų visai nėra?');
            setTimeout(() => b.classList.remove('is-wrong'), 800);
          }
        });
        opts.append(b);
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, `Koks metų laikas? ${MONTHS[month - 1]}`),
        h('div', { class: 'scene' }, svg),
        h('div', { style: { width: 'min(100%, 400px)', display: 'flex', flexDirection: 'column', gap: '.35rem' } },
          h('span', { class: 'range-label' }, `Dienos šviesa (${s.light} val.)`),
          meter,
          h('span', { class: 'sim-sub' }, `Oras: ${s.temp}`)
        ),
        opts
      );
      api.speak(`${MONTHS[month - 1]}. Koks tai metų laikas?`);
    }

    draw();
  }
}));
