'use client';

import { useSyncExternalStore } from 'react';
import { SearchIcon } from './icons';

const subscribe = () => () => {};
const modifierSnapshot = () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘' : 'Ctrl');

/** Opens the command palette (it listens for Ctrl/⌘ + K on the window). */
export function PaletteHint({ label }: { label: string }) {
  const modifier = useSyncExternalStore(subscribe, modifierSnapshot, () => 'Ctrl');

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
      className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg"
    >
      <SearchIcon className="size-4" />
      {label}
      <span aria-hidden="true" className="flex items-center gap-1 font-mono text-xs">
        <kbd className="rounded border border-control px-1.5 py-0.5">{modifier}</kbd>
        <kbd className="rounded border border-control px-1.5 py-0.5">K</kbd>
      </span>
    </button>
  );
}
