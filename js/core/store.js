// Local-only progress store. No accounts, no network, no personal data.
const KEY = 'protolabas.v1';

const fresh = () => ({
  v: 1,
  updated: null,
  modules: {},   // id -> {status:'new'|'progress'|'done', stars, attempts, lastSeen, ms}
  skills: {},    // curriculum code -> {seen, ok}
  days: [],      // ISO dates with any activity
  settings: { audio: true, rate: 1, lang: 'lt' }
});

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw);
    const base = fresh();
    return {
      ...base, ...parsed,
      modules: parsed.modules || {},
      skills: parsed.skills || {},
      days: Array.isArray(parsed.days) ? parsed.days : [],
      settings: { ...base.settings, ...(parsed.settings || {}) }
    };
  } catch (_) { return fresh(); }
}

let state = read();

function persist() {
  state.updated = new Date().toISOString();
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { /* private mode */ }
}

const today = () => new Date().toISOString().slice(0, 10);

export const store = {
  get state() { return state; },

  getModule(id) {
    return state.modules[id] || { status: 'new', stars: 0, attempts: 0, lastSeen: null, ms: 0 };
  },

  touch(id) {
    const m = { ...this.getModule(id) };
    if (m.status !== 'done') m.status = 'progress';
    m.attempts = (m.attempts || 0) + 1;
    m.lastSeen = Date.now();
    state.modules[id] = m;
    if (!state.days.includes(today())) state.days.push(today());
    persist();
  },

  complete(id, stars = 3, ms = 0) {
    const prev = this.getModule(id);
    state.modules[id] = {
      ...prev,
      status: 'done',
      stars: Math.max(prev.stars || 0, stars),
      lastSeen: Date.now(),
      ms: (prev.ms || 0) + ms
    };
    if (!state.days.includes(today())) state.days.push(today());
    persist();
  },

  skill(code, ok) {
    if (!code) return;
    const s = state.skills[code] || { seen: 0, ok: 0 };
    s.seen += 1;
    if (ok) s.ok += 1;
    state.skills[code] = s;
    persist();
  },

  setSetting(key, value) {
    state.settings[key] = value;
    persist();
  },

  lastPlayed() {
    const entries = Object.entries(state.modules)
      .filter(([, m]) => m.lastSeen)
      .sort((a, b) => b[1].lastSeen - a[1].lastSeen);
    return entries.length ? entries[0][0] : null;
  },

  gradeStats(ids) {
    const done = ids.filter(id => this.getModule(id).status === 'done').length;
    return { done, total: ids.length, pct: ids.length ? Math.round(done / ids.length * 100) : 0 };
  },

  exportJSON() { return JSON.stringify(state, null, 2); },

  /**
   * S1-10: progress must be portable. Accepts a backup produced by exportJSON
   * and merges it with what is already on this device — never overwrites a
   * higher star count, never imports settings that could break the UI.
   * Returns { imported, modules, skipped }.
   */
  importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (_) { throw new Error('not-json'); }
    if (!data || typeof data !== 'object' || data.v !== 1 || typeof data.modules !== 'object') {
      throw new Error('not-backup');
    }
    let imported = 0, skipped = 0;
    for (const [id, inc] of Object.entries(data.modules)) {
      if (!inc || typeof inc !== 'object') { skipped += 1; continue; }
      const cur = this.getModule(id);
      state.modules[id] = {
        status: inc.status === 'done' || cur.status === 'done' ? 'done'
              : (inc.status === 'progress' || cur.status === 'progress' ? 'progress' : 'new'),
        stars: Math.max(cur.stars || 0, Number(inc.stars) || 0),
        attempts: Math.max(cur.attempts || 0, Number(inc.attempts) || 0),
        lastSeen: Math.max(cur.lastSeen || 0, Number(inc.lastSeen) || 0) || null,
        ms: Math.max(cur.ms || 0, Number(inc.ms) || 0)
      };
      imported += 1;
    }
    if (data.skills && typeof data.skills === 'object') {
      for (const [code, s] of Object.entries(data.skills)) {
        if (!s || typeof s !== 'object') continue;
        const cur = state.skills[code] || { seen: 0, ok: 0 };
        state.skills[code] = {
          seen: Math.max(cur.seen || 0, Number(s.seen) || 0),
          ok: Math.max(cur.ok || 0, Number(s.ok) || 0)
        };
      }
    }
    if (Array.isArray(data.days)) {
      state.days = [...new Set([...state.days, ...data.days.filter(d => typeof d === 'string')])].sort();
    }
    persist();
    return { imported, skipped };
  },

  reset() { state = fresh(); persist(); }
};
