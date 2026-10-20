'use client';

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Locale } from '@/i18n/config';
import {
  categories,
  categoryName,
  filterProducts,
  generateProducts,
  marketNames,
  productName,
  sortProducts,
  type CategoryKey,
  type ColumnKey,
  type SortDirection,
} from '@/lib/lab/products';
import { SortIcon } from './icons';

export const TOTAL_ROWS = 10_000;
const ROW_HEIGHT = 44;
const HEADER_HEIGHT = 48;
const VISIBLE_ROWS = 10;
const OVERSCAN = 6;
const PAGE = 10;

const columns: { key: ColumnKey; numeric?: boolean }[] = [
  { key: 'product' },
  { key: 'category' },
  { key: 'market' },
  { key: 'units', numeric: true },
  { key: 'revenue', numeric: true },
  { key: 'stock', numeric: true },
];
const gridTemplate =
  'grid grid-cols-[minmax(15rem,2.2fr)_minmax(7rem,1fr)_minmax(8rem,1fr)_minmax(7rem,1fr)_minmax(8rem,1fr)_minmax(5rem,0.8fr)]';

type Copy = Dictionary['lab'];

/** Row 0 is the header row; data rows start at 1. */
interface Cell {
  row: number;
  col: number;
}

const noopSubscribe = () => () => {};

export function DataGrid({ copy, locale }: { copy: Copy; locale: Locale }) {
  // Server and browser ICU data can format currency differently, so rows render only in the browser.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const rows = useMemo(() => generateProducts(TOTAL_ROWS), []);
  const markets = useMemo(() => marketNames(locale), [locale]);
  const numberFormat = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const currencyFormat = useMemo(
    () => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
    [locale],
  );

  const [text, setText] = useState('');
  const [category, setCategory] = useState<CategoryKey | ''>('');
  const [sort, setSort] = useState<{ key: ColumnKey; direction: SortDirection }>({
    key: 'revenue',
    direction: 'descending',
  });
  const query = useDeferredValue(text);

  const displayed = useMemo(
    () =>
      sortProducts(
        filterProducts(rows, { text: query, category }, locale, markets),
        sort.key,
        sort.direction,
        locale,
        markets,
      ),
    [rows, query, category, sort, locale, markets],
  );

  const [active, setActive] = useState<Cell>({ row: 0, col: 0 });
  const [scrollTop, setScrollTop] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusPending = useRef(false);
  const ids = useId();

  // Filtering can remove the active row; keep focus on a cell that still exists.
  const activeCell: Cell = { row: Math.min(active.row, displayed.length), col: active.col };

  const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const last = Math.min(displayed.length, Math.ceil((scrollTop + VISIBLE_ROWS * ROW_HEIGHT) / ROW_HEIGHT) + OVERSCAN);
  const visible = hydrated ? displayed.slice(first, last) : [];
  // The grid keeps one tab stop; if the active row was scrolled out of the DOM, fall back to its header cell.
  const activeRendered = activeCell.row === 0 || (activeCell.row > first && activeCell.row <= last);
  const tabStop: Cell = activeRendered ? activeCell : { row: 0, col: activeCell.col };

  useEffect(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    gridRef.current?.querySelector<HTMLElement>(`[data-cell="${activeCell.row}-${activeCell.col}"]`)?.focus();
  });

  function scrollIntoView(row: number) {
    const grid = gridRef.current;
    if (!grid || row === 0) return;
    const top = (row - 1) * ROW_HEIGHT;
    const viewport = grid.clientHeight - HEADER_HEIGHT;
    let next = grid.scrollTop;
    if (top < next) next = top;
    else if (top + ROW_HEIGHT > next + viewport) next = top + ROW_HEIGHT - viewport;
    if (next !== grid.scrollTop) {
      grid.scrollTop = next;
      setScrollTop(next);
    }
  }

  function moveTo(cell: Cell) {
    const next = {
      row: Math.max(0, Math.min(displayed.length, cell.row)),
      col: Math.max(0, Math.min(columns.length - 1, cell.col)),
    };
    focusPending.current = true;
    setActive(next);
    scrollIntoView(next.row);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const { row, col } = activeCell;
    const lastRow = displayed.length;
    const lastCol = columns.length - 1;
    const keys: Record<string, Cell | undefined> = {
      ArrowRight: { row, col: col + 1 },
      ArrowLeft: { row, col: col - 1 },
      ArrowDown: { row: row + 1, col },
      ArrowUp: { row: row - 1, col },
      PageDown: { row: row + PAGE, col },
      PageUp: { row: row - PAGE, col },
      Home: event.ctrlKey || event.metaKey ? { row: 0, col: 0 } : { row, col: 0 },
      End: event.ctrlKey || event.metaKey ? { row: lastRow, col: lastCol } : { row, col: lastCol },
    };
    const target = keys[event.key];
    if (!target) return;
    event.preventDefault();
    moveTo(target);
  }

  function onFocus(event: React.FocusEvent<HTMLDivElement>) {
    const cell = (event.target as HTMLElement).closest<HTMLElement>('[data-cell]')?.dataset.cell;
    if (!cell) return;
    const [row, col] = cell.split('-').map(Number);
    if (row !== activeCell.row || col !== activeCell.col) setActive({ row, col });
  }

  function toggleSort(key: ColumnKey) {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === 'ascending' ? 'descending' : 'ascending' }
        : { key, direction: columns.find((c) => c.key === key)?.numeric ? 'descending' : 'ascending' },
    );
  }

  function resetScroll() {
    if (gridRef.current) gridRef.current.scrollTop = 0;
    setScrollTop(0);
  }

  function cellValue(row: (typeof displayed)[number], key: ColumnKey): string {
    switch (key) {
      case 'product':
        return productName(row, locale);
      case 'category':
        return categoryName(row.category, locale);
      case 'market':
        return markets[row.market];
      case 'revenue':
        return currencyFormat.format(row.revenue);
      default:
        return numberFormat.format(row[key]);
    }
  }

  const tabIndexFor = (row: number, col: number) => (row === tabStop.row && col === tabStop.col ? 0 : -1);
  const instructionsId = `${ids}-instructions`;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-0 flex-1 basis-64">
          <label htmlFor={`${ids}-search`} className="font-medium">
            {copy.search}
          </label>
          <input
            id={`${ids}-search`}
            type="search"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              resetScroll();
            }}
            autoComplete="off"
            className="mt-2 block w-full rounded-lg border border-control bg-bg px-4 py-2.5"
          />
        </div>
        <div className="basis-56">
          <label htmlFor={`${ids}-category`} className="font-medium">
            {copy.category}
          </label>
          <select
            id={`${ids}-category`}
            value={category}
            onChange={(event) => {
              setCategory(event.target.value as CategoryKey | '');
              resetScroll();
            }}
            className="mt-2 block w-full rounded-lg border border-control bg-bg px-4 py-2.5"
          >
            <option value="">{copy.allCategories}</option>
            {(Object.keys(categories) as CategoryKey[]).map((key) => (
              <option key={key} value={key}>
                {categoryName(key, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p role="status" className="mt-6 text-sm text-muted">
        {copy.results
          .replace('{count}', numberFormat.format(displayed.length))
          .replace('{total}', numberFormat.format(TOTAL_ROWS))}
      </p>
      <p id={instructionsId} className="sr-only">
        {copy.instructions}
      </p>

      <div
        ref={gridRef}
        role="grid"
        tabIndex={-1}
        aria-label={copy.gridLabel}
        aria-describedby={instructionsId}
        aria-rowcount={displayed.length + 1}
        aria-colcount={columns.length}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        style={{ height: HEADER_HEIGHT + VISIBLE_ROWS * ROW_HEIGHT }}
        className="relative mt-3 overflow-auto overscroll-contain rounded-2xl border border-border"
      >
        <div role="rowgroup" className="sticky top-0 z-10 min-w-[56rem]">
          <div
            role="row"
            aria-rowindex={1}
            className={`${gridTemplate} border-b border-border bg-surface`}
            style={{ height: HEADER_HEIGHT }}
          >
            {columns.map((column, col) => {
              const sorted = sort.key === column.key ? sort.direction : undefined;
              return (
                <div key={column.key} role="columnheader" aria-colindex={col + 1} aria-sort={sorted} className="flex">
                  <button
                    type="button"
                    data-cell={`0-${col}`}
                    tabIndex={tabIndexFor(0, col)}
                    onClick={() => {
                      toggleSort(column.key);
                      resetScroll();
                    }}
                    className={`flex w-full items-center gap-1.5 px-4 text-sm font-semibold -outline-offset-2 ${column.numeric ? 'justify-end' : ''}`}
                  >
                    {copy.columns[column.key]}
                    <SortIcon
                      direction={sorted}
                      className={`size-4 shrink-0 ${sorted ? 'text-accent' : 'text-muted'}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div role="rowgroup" className="relative min-w-[56rem]" style={{ height: displayed.length * ROW_HEIGHT }}>
          {visible.map((product, offset) => {
            const row = first + offset + 1;
            return (
              <div
                key={product.id}
                role="row"
                aria-rowindex={row + 1}
                className={`${gridTemplate} absolute inset-x-0 border-b border-border/60 ${row % 2 === 0 ? 'bg-surface/50' : ''}`}
                style={{ top: (row - 1) * ROW_HEIGHT, height: ROW_HEIGHT }}
              >
                {columns.map((column, col) => (
                  <div
                    key={column.key}
                    role="gridcell"
                    aria-colindex={col + 1}
                    data-cell={`${row}-${col}`}
                    tabIndex={tabIndexFor(row, col)}
                    className={`flex items-center truncate px-4 text-sm -outline-offset-2 ${column.numeric ? 'justify-end tabular-nums' : ''}`}
                  >
                    {cellValue(product, column.key)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
