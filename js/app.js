import { i18n } from './core/i18n.js';
import { store } from './core/store.js';
import { h, clear } from './core/dom.js';

const GRADES = [
  { n: 1, stage: 'Pradinis' }, { n: 2, stage: 'Pradinis' }, { n: 3, stage: 'Pradinis' }, { n: 4, stage: 'Pradinis' },
  { n: 5, stage: 'Pagrindinis' }, { n: 6, stage: 'Pagrindinis' }, { n: 7, stage: 'Pagrindinis' }, { n: 8, stage: 'Pagrindinis' },
  { n: 9, stage: 'Gimnazija' }, { n: 10, stage: 'Gimnazija' }, { n: 11, stage: 'Gimnazija' }, { n: 12, stage: 'Gimnazija' }
];

const COLORS = {
  sun: ['var(--sun)', 'var(--sun-soft)', 'chip-sun'],
  sky: ['var(--sky)', 'var(--sky-soft)', 'chip-sky'],
  leaf: ['var(--leaf)', 'var(--leaf-soft)', 'chip-leaf'],
  berry: ['var(--berry)', 'var(--berry-soft)', 'chip-berry'],
  plum: ['var(--plum)', 'var(--plum-soft)', 'chip-plum'],
  clay: ['var(--clay)', 'var(--clay-soft)', 'chip-clay']
};

const params = new URLSearchParams(location.search);
const wantedGrade = Number(params.get('g') || 1);

function applyStatic() {
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    node.innerHTML = i18n.t(key);
  });
}

function renderRail() {
  const rail = document.getElementById('gradeRail');
  clear(rail);
  GRADES.forEach(g => {
    const ready = g.n === 1;
    const soon = g.n === 2;
    const el = h('a', {
      class: `grade-pill${ready && wantedGrade === g.n ? '' : ''}${soon ? ' is-soon' : ''}${!ready && !soon ? ' is-locked' : ''}`,
      role: 'listitem',
      href: ready ? '#modules' : soon ? '?g=2#modules' : '#',
      'aria-current': wantedGrade === g.n ? 'true' : 'false',
      'aria-disabled': !ready && !soon ? 'true' : null,
      onclick: (e) => { if (!ready && !soon) e.preventDefault(); }
    },
      h('b', {}, String(g.n)),
      h('small', {}, ready ? 'Klasė' : soon ? i18n.t('soon') : 'Rengiama')
    );
    rail.append(el);
  });
}

function starsHTML(n) {
  return `<span class="stars" aria-label="${n} / 3">${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span></span>`;
}

async function loadGrade(grade) {
  const dir = `content/grade-${String(grade).padStart(2, '0')}`;
  const manifest = await fetch(`${dir}/_grade.json`).then(r => {
    if (!r.ok) throw new Error('no grade');
    return r.json();
  });
  const modules = await Promise.all(
    manifest.modules.map(id => fetch(`${dir}/modules/${id}/module.json`).then(r => r.json()))
  );
  return { manifest, modules };
}

function renderFilters(manifest, modules) {
  const box = document.getElementById('filters');
  clear(box);
  const all = h('button', { class: 'filter', 'aria-pressed': 'true', type: 'button' }, i18n.t('allSubjects'));
  const list = [all];
  const subjects = manifest.subjects || [];
  const buttons = new Map([['*', all]]);
  subjects.forEach(s => {
    const b = h('button', { class: 'filter', 'aria-pressed': 'false', type: 'button' }, s.label);
    buttons.set(s.id, b);
    list.push(b);
  });
  list.forEach(b => box.append(b));

  const apply = (key) => {
    buttons.forEach((btn, id) => btn.setAttribute('aria-pressed', String(id === key)));
    document.querySelectorAll('#moduleGrid .module-card').forEach(card => {
      card.hidden = key !== '*' && card.dataset.subject !== key;
    });
  };
  buttons.forEach((btn, id) => btn.addEventListener('click', () => apply(id)));
}

const SUBJECT_CHIP = {
  matematika: 'chip-leaf', lietuviu: 'chip-berry', gamta: 'chip-sky',
  visuomeninis: 'chip-plum', dorinis: 'chip-clay', muzika: 'chip-plum',
  choras: 'chip-sun', fizinis: 'chip-leaf', sokis: 'chip-berry',
  informatika: 'chip-sky', daile: 'chip-sun', technologijos: 'chip-clay'
};

function renderModules(modules) {
  const grid = document.getElementById('moduleGrid');
  clear(grid);
  modules.forEach(m => {
    const st = store.getModule(m.id);
    const [accent, accentSoft] = COLORS[m.color] || COLORS.sun;
    const chipClass = SUBJECT_CHIP[m.subject] || 'chip-sun';
    const card = h('a', {
      class: `module-card${st.status === 'done' ? ' is-done' : ''}`,
      href: `mokytis.html?g=${m.grade}&m=${encodeURIComponent(m.id)}`,
      dataset: { subject: m.subject },
      style: { '--accent': accent, '--accent-soft': accentSoft }
    },
      h('span', { class: 'stars', html: starsHTML(st.stars).replace(/^<span class="stars"[^>]*>|<\/span>$/g, '') }),
      h('div', { class: 'icon', 'aria-hidden': 'true' }, m.icon || '✳'),
      h('h3', {}, m.title),
      h('p', {}, m.tagline),
      h('div', { class: 'module-meta' },
        h('span', { class: `chip ${chipClass}` }, m.subjectLabel),
        h('span', {}, `${m.minutes} ${i18n.t('minutes')}`),
        st.status === 'done' ? h('span', { class: 'chip chip-leaf' }, `✓ ${i18n.t('done')}`) : null,
        h('span', { class: 'go' }, '→')
      )
    );
    grid.append(card);
  });
}

function renderContinue(modules) {
  const card = document.getElementById('continueCard');
  const last = store.lastPlayed();
  if (!last) { card.hidden = true; return; }
  const m = modules.find(x => x.id === last);
  if (!m) { card.hidden = true; return; }
  document.getElementById('continueTitle').textContent = m.title;
  document.getElementById('continueLink').href = `mokytis.html?g=${m.grade}&m=${m.id}`;
  card.hidden = false;
}

function renderSoon() {
  const grid = document.getElementById('moduleGrid');
  const head = document.getElementById('modulesHeading');
  head.textContent = `${wantedGrade} klasė — rengiama`;
  clear(grid);
  grid.append(h('div', { class: 'card', style: { gridColumn: '1 / -1' } },
    h('h3', {}, 'Ši klasė dar kuriama'),
    h('p', { style: { color: 'var(--muted)', margin: 0 } },
      'Kiekviena klasė kuriama atskirai: pagal savo bendrąją programą, amžių ir tai, ką vaikai jau moka. 1 klasė jau veikia – pradėk nuo jos.'),
    h('p', { style: { margin: '1rem 0 0' } },
      h('a', { class: 'btn btn-primary', href: '?g=1#modules' }, 'Atidaryti 1 klasę'))
  ));
}

async function boot() {
  const lang = params.get('lang') || store.state.settings.lang || 'lt';
  i18n.setLang(lang);
  if (lang !== 'lt') {
    try {
      const overlay = await fetch(`content/grade-01/i18n/${lang}.json`).then(r => r.ok ? r.json() : null);
      i18n.setOverlay(overlay);
    } catch (_) { /* optional */ }
  }
  applyStatic();
  renderRail();

  if (wantedGrade !== 1) { renderSoon(); return; }

  try {
    const { manifest, modules } = await loadGrade(1);
    renderFilters(manifest, modules);
    renderModules(modules);
    renderContinue(modules);

    const stats = store.gradeStats(modules.map(m => m.id));
    const chip = document.getElementById('gradeProgress');
    chip.hidden = false;
    chip.textContent = `${stats.done} / ${stats.total} baigta`;
  } catch (err) {
    document.getElementById('moduleGrid').append(
      h('div', { class: 'card' }, h('h3', {}, 'Nepavyko įkelti turinio'), h('p', {}, String(err.message)))
    );
  }
}

function wireProgress() {
  const msg = document.getElementById('progressMsg');
  const say = (text, kind = 'ok') => {
    if (!msg) return;
    msg.textContent = text;
    msg.dataset.kind = kind;
  };

  document.getElementById('exportProgress')?.addEventListener('click', () => {
    const blob = new Blob([store.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `protolabas-pazanga-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    say('Pažanga išsaugota – failas atsisiųstas.');
  });

  document.getElementById('importProgress')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { imported } = store.importJSON(await file.text());
      say(`Įkelta modulių: ${imported}. Perkraunama…`);
      setTimeout(() => location.reload(), 900);
    } catch (err) {
      say(err.message === 'not-backup'
        ? 'Šis failas nepanašus į Protolabo pažangos failą.'
        : 'Failo perskaityti nepavyko.', 'err');
    } finally {
      e.target.value = '';
    }
  });

  document.getElementById('resetProgress')?.addEventListener('click', () => {
    if (!confirm('Išvalyti visą pažangą šiame įrenginyje?')) return;
    store.reset();
    location.reload();
  });
}

wireProgress();
boot();
