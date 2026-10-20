'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LOCALE_COOKIE, type Locale } from '@/i18n/config';
import { stripLocale } from '@/i18n/negotiate';
import { SearchIcon } from './icons';
import { switchTheme } from './theme-toggle';

export interface PaletteItem {
  id: string;
  label: string;
  group: string;
  /** Internal route, external URL or file to download. */
  href?: string;
  external?: boolean;
  download?: boolean;
  action?: 'toggle-theme' | 'switch-language';
  locale?: Locale;
}

export interface PaletteCopy {
  open: string;
  label: string;
  placeholder: string;
  noResults: string;
  results: string;
  close: string;
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function filterItems(items: PaletteItem[], query: string): PaletteItem[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return items;
  return items.filter((item) => {
    const haystack = normalize(`${item.label} ${item.group}`);
    return terms.every((term) => haystack.includes(term));
  });
}

export function CommandPalette({ items, copy }: { items: PaletteItem[]; copy: PaletteCopy }) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const results = useMemo(() => filterItems(items, query), [items, query]);
  const activeItem = results[Math.min(active, results.length - 1)];

  function open() {
    setQuery('');
    setActive(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    // Clicking the backdrop (the dialog element itself, outside its content) closes it; Esc is handled natively.
    const dialog = dialogRef.current;
    const onBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) close();
    };
    dialog?.addEventListener('click', onBackdropClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      dialog?.removeEventListener('click', onBackdropClick);
    };
  }, []);

  function select(item: PaletteItem | undefined) {
    if (!item) return;
    close();
    if (item.action === 'toggle-theme') return switchTheme();
    if (item.action === 'switch-language' && item.locale) {
      document.cookie = `${LOCALE_COOKIE}=${item.locale}; path=/; max-age=31536000; SameSite=Lax`;
      const rest = stripLocale(pathname);
      return router.push(rest === '/' ? `/${item.locale}` : `/${item.locale}${rest}`);
    }
    if (!item.href) return;
    if (item.external || item.download) {
      const link = document.createElement('a');
      link.href = item.href;
      if (item.download) link.download = '';
      link.click();
      return;
    }
    router.push(item.href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      select(activeItem);
    }
  }

  const groups = [...new Set(results.map((item) => item.group))];

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-keyshortcuts="Meta+K Control+K"
        aria-haspopup="dialog"
        className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface"
      >
        <SearchIcon />
        <span className="sr-only">{copy.open}</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={copy.label}
        onClose={() => setQuery('')}
        className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-2xl border border-border bg-bg p-0 text-fg shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="size-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeItem ? `${listId}-${activeItem.id}` : undefined}
            aria-label={copy.label}
            placeholder={copy.placeholder}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={close}
            className="shrink-0 rounded-md px-2 py-1 font-mono text-xs text-muted hover:bg-surface"
          >
            Esc<span className="sr-only"> · {copy.close}</span>
          </button>
        </div>
        <div id={listId} role="listbox" aria-label={copy.label} className="max-h-[50vh] overflow-y-auto p-2">
          {groups.map((group) => (
            <div key={group} role="group" aria-label={group}>
              <p aria-hidden="true" className="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-muted uppercase">
                {group}
              </p>
              {results
                .filter((item) => item.group === group)
                .map((item) => {
                  const selected = item === activeItem;
                  return (
                    // Keyboard selection is handled by the combobox input (aria-activedescendant).
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={item.id}
                      id={`${listId}-${item.id}`}
                      role="option"
                      aria-selected={selected}
                      tabIndex={-1}
                      onMouseMove={() => setActive(results.indexOf(item))}
                      onClick={() => select(item)}
                      className="flex min-h-11 cursor-pointer items-center rounded-lg px-3 aria-selected:bg-surface aria-selected:text-fg"
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          ))}
          {!results.length && <p className="px-3 py-6 text-center text-muted">{copy.noResults}</p>}
        </div>
        <p role="status" className="sr-only">
          {results.length ? copy.results.replace('{count}', String(results.length)) : copy.noResults}
        </p>
      </dialog>
    </>
  );
}
