// Tiny WebAudio cues — no files, no network.
import { store } from './store.js';

let ctx = null;

function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gain = 0.06) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.02);
}

const enabled = () => store.state.settings.audio !== false;

export const sfx = {
  pop() { if (enabled()) tone(520, 0, 0.08, 'triangle', 0.05); },
  good() { if (!enabled()) return; tone(523.25, 0, 0.12); tone(659.25, 0.1, 0.12); tone(783.99, 0.2, 0.22); },
  soft() { if (!enabled()) return; tone(330, 0, 0.12, 'sine', 0.04); tone(294, 0.1, 0.16, 'sine', 0.035); },
  chime() { if (!enabled()) return; tone(880, 0, 0.1, 'triangle', 0.04); tone(1174.66, 0.08, 0.25, 'triangle', 0.035); }
};
