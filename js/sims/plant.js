import { register } from '../core/sim.js';
import { h, clear } from '../core/dom.js';

// Plant growth: two variables (water, light), visible consequences over weeks.
register('plant', () => ({
  mount(root, cfg, api) {
    const maxWeeks = 6;
    let week = 0;
    let water = 3;
    let light = 3;
    let height = 8;
    let health = 3;
    let tries = 0;
    const history = [height];
    let locked = false;

    const wrap = h('div', { class: 'sim' });
    root.append(wrap);

    function plantSVG() {
      const hgt = Math.min(150, 20 + height);
      const leafColour = health >= 3 ? '#16a34a' : health === 2 ? '#84cc16' : '#ca8a04';
      const droop = health <= 1 ? 12 : 0;
      return `
        <svg viewBox="0 0 320 260" class="scene" aria-label="Augalas">
          <rect x="20" y="200" width="280" height="46" rx="12" fill="#f5e6cf"/>
          <path d="M110 200 L210 200 L196 246 L124 246 Z" fill="#c2703a"/>
          <line x1="160" y1="200" x2="160" y2="${200 - hgt}" stroke="#15803d" stroke-width="7" stroke-linecap="round"/>
          ${health > 0 ? `<ellipse cx="${160 - 26}" cy="${188 - hgt * .55}" rx="24" ry="11" fill="${leafColour}" transform="rotate(${-18 - droop} ${160 - 26} ${188 - hgt * .55})"/>` : ''}
          ${health > 1 ? `<ellipse cx="${160 + 26}" cy="${176 - hgt * .72}" rx="24" ry="11" fill="${leafColour}" transform="rotate(${18 + droop} ${160 + 26} ${176 - hgt * .72})"/>` : ''}
          ${height >= 90 && health >= 3 ? `<g><circle cx="160" cy="${200 - hgt - 10}" r="14" fill="#f472b6"/><circle cx="160" cy="${200 - hgt - 10}" r="6" fill="#fde047"/></g>` : ''}
          ${week >= 1 ? `<text x="286" y="52" text-anchor="end" font-size="13" fill="#5f6f7e" font-family="sans-serif">${week} sav.</text>` : ''}
        </svg>`;
    }

    function chart() {
      const max = Math.max(100, ...history);
      const pts = history.map((v, idx) => `${20 + idx * (280 / Math.max(1, maxWeeks))},${110 - (v / max) * 90}`).join(' ');
      return `<svg viewBox="0 0 320 130" class="chart" aria-label="Augimo grafikas">
        <line x1="20" y1="110" x2="300" y2="110" stroke="#eadfce" stroke-width="2"/>
        <line x1="20" y1="20" x2="20" y2="110" stroke="#eadfce" stroke-width="2"/>
        <polyline points="${pts}" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
        ${history.map((v, idx) => `<circle cx="${20 + idx * (280 / Math.max(1, maxWeeks))}" cy="${110 - (v / max) * 90}" r="4" fill="#16a34a"/>`).join('')}
        <text x="24" y="18" font-size="11" fill="#5f6f7e" font-family="sans-serif">aukštis</text>
        <text x="286" y="126" font-size="11" fill="#5f6f7e" font-family="sans-serif">savaitės</text>
      </svg>`;
    }

    function draw() {
      clear(wrap);
      const sceneBox = h('div', { class: 'scene' });
      sceneBox.innerHTML = plantSVG();
      const chartBox = h('div', { class: 'chart' });
      chartBox.innerHTML = chart();

      const waterCtl = h('input', {
        class: 'range', type: 'range', min: 0, max: 5, step: 1, value: water,
        'aria-label': 'Vanduo',
        oninput: (e) => { water = Number(e.target.value); labels.water.textContent = `Vanduo: ${water}/5`; }
      });
      const lightCtl = h('input', {
        class: 'range', type: 'range', min: 0, max: 5, step: 1, value: light,
        'aria-label': 'Šviesa',
        oninput: (e) => { light = Number(e.target.value); labels.light.textContent = `Šviesa: ${light}/5`; }
      });
      const labels = {
        water: h('span', { class: 'range-label' }, `Vanduo: ${water}/5`),
        light: h('span', { class: 'range-label' }, `Šviesa: ${light}/5`)
      };

      const advance = h('button', { class: 'btn btn-primary', type: 'button' }, 'Praėjo savaitė →');
      advance.addEventListener('click', () => {
        if (locked) return;
        week++;
        let growth = 0;
        let msg = '';

        if (water >= 2 && water <= 4 && light >= 2) {
          growth = 20;
          msg = 'Augalas augo: pakako vandens ir šviesos.';
        } else if (water > 4) {
          growth = 6;
          health = Math.max(0, health - 1);
          msg = 'Per daug vandens – lapai gelsta.';
        } else if (water < 2) {
          growth = 0;
          health = Math.max(0, health - 1);
          msg = 'Per mažai vandens – augalas vysta.';
        }
        if (light < 2) {
          growth = Math.min(growth, 4);
          msg = 'Per mažai šviesos – augalas blyškus ir lėtai auga.';
        }

        height += growth;
        history.push(height);
        api.feedback(msg, growth >= 12 ? 'ok' : 'hint');
        api.speak(msg);

        if (height >= 90 && health >= 3) {
          locked = true;
          api.success('Išaugo žiedas! Radai tinkamas sąlygas: vandens 2–4, daug šviesos.');
          draw();
          return;
        }
        if (week >= maxWeeks) {
          locked = true;
          tries++;
          if (tries >= 2) {
            api.success('Išsiaiškinome: augalui reikia vidutinio vandens ir daug šviesos.');
          } else {
            api.feedback('Šįkart nežydėjo. Bandyk dar kartą – keisk vandenį ir šviesą.', 'hint');
            api.speak('Bandyk dar kartą.');
            week = 0;
            height = 8;
            health = 3;
            history.length = 0;
            history.push(height);
            locked = false;
            setTimeout(draw, 1400);
            return;
          }
        }
        draw();
      });

      wrap.append(
        h('p', { class: 'sim-prompt' }, 'Padėk augalui užaugti iki žiedo per 6 savaites'),
        sceneBox,
        h('div', { style: { display: 'grid', gap: '.4rem', width: 'min(100%, 340px)' } }, labels.water, waterCtl, labels.light, lightCtl),
        advance,
        chartBox
      );
    }

    draw();
  }
}));
