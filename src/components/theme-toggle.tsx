'use client';

import { useSyncExternalStore } from 'react';
import { THEME_COOKIE, type Theme } from '@/lib/theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function savedTheme(): Theme | undefined {
  return document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=(light|dark)(?:;|$)`))?.[1] as Theme | undefined;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);

  // Client-rendered fallbacks (e.g. 404s under Cache Components) don't run the inline <head> script.
  if (!document.documentElement.hasAttribute('data-theme')) {
    applyTheme(savedTheme() ?? (media.matches ? 'dark' : 'light'));
  }

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Keep following the OS setting until the user picks a theme explicitly.
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  media.addEventListener('change', onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener('change', onSystemChange);
  };
}

const getSnapshot = (): Theme => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
const getServerSnapshot = (): Theme | null => null;

export function switchTheme() {
  const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
}

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={switchTheme}
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface"
    >
      <svg
        className="only-light size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="only-dark size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span className="sr-only">{label}</span>
    </button>
  );
}
