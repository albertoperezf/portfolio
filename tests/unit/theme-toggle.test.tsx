// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/components/theme-toggle';

function mockSystemTheme(dark: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: dark,
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    })),
  );
  return (matches: boolean) => listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.cookie = 'theme=; path=/; max-age=0';
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('is a toggle button reflecting the current theme', () => {
    mockSystemTheme(false);
    render(<ThemeToggle label="Dark theme" />);
    expect(screen.getByRole('button', { name: 'Dark theme' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches theme and remembers the choice in a cookie', async () => {
    mockSystemTheme(false);
    render(<ThemeToggle label="Dark theme" />);
    const button = screen.getByRole('button', { name: 'Dark theme' });

    await userEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.cookie).toContain('theme=light');
  });

  it('applies the theme itself when the inline script did not run', () => {
    document.documentElement.removeAttribute('data-theme');
    mockSystemTheme(true);
    render(<ThemeToggle label="Dark theme" />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('follows system changes until the user picks a theme', async () => {
    const emitSystemChange = mockSystemTheme(false);
    render(<ThemeToggle label="Dark theme" />);

    act(() => emitSystemChange(true));
    await vi.waitFor(() => expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true'));

    await userEvent.click(screen.getByRole('button'));
    act(() => emitSystemChange(true));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
