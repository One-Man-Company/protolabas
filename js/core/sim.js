// Simulation registry. A sim is a factory returning { mount(root, config, api) }.
// Adding an interaction never requires touching the lesson runner.
const registry = new Map();

export function register(name, factory) {
  if (registry.has(name)) console.warn(`[sim] duplicate registration: ${name}`);
  registry.set(name, factory);
}

export function has(name) { return registry.has(name); }

export function create(name) {
  const factory = registry.get(name);
  if (!factory) throw new Error(`Unknown sim: ${name}`);
  return factory();
}

export function names() { return [...registry.keys()]; }
