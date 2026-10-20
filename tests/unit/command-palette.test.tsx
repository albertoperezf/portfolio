// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { CommandPalette, filterItems, type PaletteItem } from '@/components/command-palette';
import { en } from '@/i18n/dictionaries/en';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }), usePathname: () => '/en/about' }));

const items: PaletteItem[] = [
  { id: 'work', label: 'Work', group: 'Pages', href: '/en/work' },
  { id: 'about', label: 'About', group: 'Pages', href: '/en/about' },
  { id: 'theme', label: 'Toggle dark theme', group: 'Actions', action: 'toggle-theme' },
  { id: 'language', label: 'Ver en español', group: 'Actions', action: 'switch-language', locale: 'es' },
];

beforeAll(() => {
  // jsdom doesn't implement <dialog>.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
  };
});

describe('filterItems', () => {
  it('matches every term, ignoring case and accents', () => {
    expect(filterItems(items, 'ESPANOL').map((i) => i.id)).toEqual(['language']);
    expect(filterItems(items, 'dark toggle').map((i) => i.id)).toEqual(['theme']);
    expect(filterItems(items, '  ')).toHaveLength(items.length);
  });
});

describe('CommandPalette', () => {
  beforeEach(() => push.mockReset());

  it('opens with Ctrl+K and navigates with the keyboard', async () => {
    render(<CommandPalette items={items} copy={en.palette} />);
    await userEvent.keyboard('{Control>}k{/Control}');

    const input = screen.getByRole('combobox', { name: en.palette.label });
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('work'));

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'About' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Enter}');
    expect(push).toHaveBeenCalledWith('/en/about');
  });

  it('filters results and announces the count', async () => {
    render(<CommandPalette items={items} copy={en.palette} />);
    await userEvent.click(screen.getByRole('button', { name: en.palette.open }));
    await userEvent.type(screen.getByRole('combobox'), 'abo');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('1 results');

    await userEvent.clear(screen.getByRole('combobox'));
    await userEvent.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent(en.palette.noResults);
  });

  it('switches language keeping the current page', async () => {
    render(<CommandPalette items={items} copy={en.palette} />);
    await userEvent.keyboard('{Control>}k{/Control}');
    await userEvent.type(screen.getByRole('combobox'), 'español{Enter}');
    expect(push).toHaveBeenCalledWith('/es/about');
    expect(document.cookie).toContain('NEXT_LOCALE=es');
  });
});
