

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.-nr9uu9s.js","_app/immutable/chunks/scheduler.CBeh0Oba.js","_app/immutable/chunks/index.DK-cTrEl.js"];
export const stylesheets = [];
export const fonts = [];
