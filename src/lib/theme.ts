export const THEME_COOKIE = 'theme';
export type Theme = 'light' | 'dark';

/** Runs before first paint: explicit choice (cookie) first, then the system preference. */
export const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)(?:;|$)/);var t=m?m[1]:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;
