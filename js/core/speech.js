// Speech output for pre-readers. Falls back silently when no Lithuanian voice exists.
import { store } from './store.js';

let voice = null;
let voicesReady = false;

function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  const lt = voices.find(v => (v.lang || '').toLowerCase().startsWith('lt'));
  if (lt) return lt;
  // Some platforms expose Lithuanian under a generic name.
  return voices.find(v => /lithuan/i.test(v.name || '')) || null;
}

export const speech = {
  available() { return 'speechSynthesis' in window; },

  init() {
    if (!this.available() || voicesReady) return;
    voicesReady = true;
    voice = pickVoice();
    window.speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); };
  },

  speak(text, opts = {}) {
    if (!this.available() || !text) return;
    if (!store.state.settings.audio) return;
    this.init();
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, ' ').trim());
      u.lang = 'lt-LT';
      if (voice) u.voice = voice;
      u.rate = opts.rate ?? store.state.settings.rate ?? 1;
      u.pitch = opts.pitch ?? 1.02;
      window.speechSynthesis.speak(u);
    } catch (_) { /* ignore */ }
  },

  stop() {
    if (this.available()) { try { window.speechSynthesis.cancel(); } catch (_) {} }
  }
};
