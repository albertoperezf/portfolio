import { describe, expect, it } from 'vitest';
import { negotiateLocale, resolveLocale, stripLocale } from '@/i18n/negotiate';

describe('negotiateLocale', () => {
  it.each([
    ['es-ES,es;q=0.9,en;q=0.8', 'es'],
    ['en-US,en;q=0.9', 'en'],
    ['fr-FR,fr;q=0.9,es;q=0.5', 'es'],
    ['fr-FR,de;q=0.9', 'en'],
    ['en;q=0.4,es;q=0.8', 'es'],
    ['es;q=0,en', 'en'],
    ['ES-mx', 'es'],
    ['', 'en'],
    [null, 'en'],
  ])('%s → %s', (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });

  it('keeps header order when q-values tie', () => {
    expect(negotiateLocale('es, en')).toBe('es');
  });
});

describe('resolveLocale', () => {
  it('prefers an explicit cookie choice over the browser language', () => {
    expect(resolveLocale('es', 'en-US')).toBe('es');
  });

  it('ignores unsupported cookie values', () => {
    expect(resolveLocale('fr', 'es-ES')).toBe('es');
  });
});

describe('stripLocale', () => {
  it.each([
    ['/en', '/'],
    ['/es/work/convocatoria', '/work/convocatoria'],
    ['/about', '/about'],
    ['/', '/'],
  ])('%s → %s', (path, expected) => {
    expect(stripLocale(path)).toBe(expected);
  });
});
