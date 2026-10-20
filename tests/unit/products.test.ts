import { describe, expect, it } from 'vitest';
import {
  filterProducts,
  generateProducts,
  marketNames,
  productName,
  sortProducts,
  type ProductRow,
} from '@/lib/lab/products';

const rows = generateProducts(500);
const markets = marketNames('en');

describe('generateProducts', () => {
  it('is deterministic for a given seed', () => {
    expect(generateProducts(50)).toEqual(generateProducts(50));
    expect(generateProducts(50, 1)).not.toEqual(generateProducts(50));
  });

  it('creates consistent rows', () => {
    for (const row of rows) {
      expect(row.units).toBeGreaterThanOrEqual(20);
      expect(row.revenue % row.units).toBe(0);
    }
  });
});

describe('filterProducts', () => {
  it('filters by category', () => {
    const shoes = filterProducts(rows, { text: '', category: 'shoes' }, 'en', markets);
    expect(shoes.length).toBeGreaterThan(0);
    expect(shoes.every((row) => row.category === 'shoes')).toBe(true);
  });

  it('matches every search term, ignoring case and accents', () => {
    const es = marketNames('es');
    const result = filterProducts(rows, { text: 'CARDIGAN alemania', category: '' }, 'es', es);
    expect(result.length).toBeGreaterThan(0);
    for (const row of result) {
      expect(productName(row, 'es')).toMatch(/Cárdigan/);
      expect(row.market).toBe('DE');
    }
  });
});

describe('sortProducts', () => {
  const isSorted = (list: ProductRow[], compare: (a: ProductRow, b: ProductRow) => number) =>
    list.every((row, index) => index === 0 || compare(list[index - 1], row) <= 0);

  it('sorts numbers in both directions', () => {
    expect(isSorted(sortProducts(rows, 'revenue', 'ascending', 'en', markets), (a, b) => a.revenue - b.revenue)).toBe(
      true,
    );
    expect(isSorted(sortProducts(rows, 'units', 'descending', 'en', markets), (a, b) => b.units - a.units)).toBe(true);
  });

  it('sorts text with the locale collator and does not mutate the input', () => {
    const copy = [...rows];
    const sorted = sortProducts(rows, 'market', 'ascending', 'en', markets);
    const collator = new Intl.Collator('en');
    expect(isSorted(sorted, (a, b) => collator.compare(markets[a.market], markets[b.market]))).toBe(true);
    expect(rows).toEqual(copy);
  });
});
