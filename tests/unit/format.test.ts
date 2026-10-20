import { describe, expect, it } from 'vitest';
import { formatMonthYear, interpolate, yearsBetween } from '@/lib/format';

describe('interpolate', () => {
  it('replaces known placeholders and keeps unknown ones', () => {
    expect(interpolate('{years}+ years, {missing}', { years: 11 })).toBe('11+ years, {missing}');
  });
});

describe('formatMonthYear', () => {
  it('formats per locale', () => {
    expect(formatMonthYear('2023-12', 'en')).toBe('Dec 2023');
    expect(formatMonthYear('2023-12', 'es')).toBe('dic 2023');
  });

  it('returns the year alone when there is no month', () => {
    expect(formatMonthYear('2015', 'en')).toBe('2015');
  });
});

describe('yearsBetween', () => {
  it('counts whole years only', () => {
    expect(yearsBetween(new Date('2015-01-01'), new Date('2026-10-20'))).toBe(11);
    expect(yearsBetween(new Date('2015-11-01'), new Date('2026-10-20'))).toBe(10);
    expect(yearsBetween(new Date('2030-01-01'), new Date('2026-10-20'))).toBe(0);
  });
});
