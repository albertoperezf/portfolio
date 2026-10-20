import type { Locale } from '@/i18n/config';

export type ColumnKey = 'product' | 'category' | 'market' | 'units' | 'revenue' | 'stock';
export type SortDirection = 'ascending' | 'descending';

export interface ProductRow {
  id: number;
  ref: string;
  garment: number;
  color: number;
  category: CategoryKey;
  market: string;
  units: number;
  revenue: number;
  stock: number;
}

const garments = [
  { en: 'Linen shirt', es: 'Camisa de lino', category: 'shirts' },
  { en: 'Oxford shirt', es: 'Camisa oxford', category: 'shirts' },
  { en: 'Wide-leg trousers', es: 'Pantalón ancho', category: 'trousers' },
  { en: 'Straight jeans', es: 'Vaquero recto', category: 'trousers' },
  { en: 'Wool coat', es: 'Abrigo de lana', category: 'outerwear' },
  { en: 'Trench coat', es: 'Gabardina', category: 'outerwear' },
  { en: 'Knit sweater', es: 'Jersey de punto', category: 'knitwear' },
  { en: 'Cardigan', es: 'Cárdigan', category: 'knitwear' },
  { en: 'Midi dress', es: 'Vestido midi', category: 'dresses' },
  { en: 'Leather loafers', es: 'Mocasines de piel', category: 'shoes' },
  { en: 'Trainers', es: 'Zapatillas', category: 'shoes' },
  { en: 'Tote bag', es: 'Bolso tote', category: 'accessories' },
] as const;

const colors = [
  { en: 'black', es: 'negro' },
  { en: 'white', es: 'blanco' },
  { en: 'navy', es: 'marino' },
  { en: 'camel', es: 'camel' },
  { en: 'grey', es: 'gris' },
  { en: 'olive', es: 'oliva' },
  { en: 'ecru', es: 'crudo' },
  { en: 'burgundy', es: 'burdeos' },
] as const;

export const categories = {
  shirts: { en: 'Shirts', es: 'Camisas' },
  trousers: { en: 'Trousers', es: 'Pantalones' },
  outerwear: { en: 'Outerwear', es: 'Abrigos' },
  knitwear: { en: 'Knitwear', es: 'Punto' },
  dresses: { en: 'Dresses', es: 'Vestidos' },
  shoes: { en: 'Shoes', es: 'Zapatos' },
  accessories: { en: 'Accessories', es: 'Accesorios' },
} as const;

export type CategoryKey = keyof typeof categories;

const markets = ['ES', 'FR', 'IT', 'DE', 'PT', 'GB', 'US', 'MX', 'JP', 'CN'];

/** Small deterministic PRNG so every visitor sees the same made-up data. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateProducts(count: number, seed = 2026): ProductRow[] {
  const random = mulberry32(seed);
  const pick = (length: number) => Math.floor(random() * length);

  return Array.from({ length: count }, (_, index) => {
    const garment = pick(garments.length);
    const units = 20 + pick(4980);
    const price = 19 + pick(180);
    return {
      id: index + 1,
      ref: String(100000 + pick(900000)),
      garment,
      color: pick(colors.length),
      category: garments[garment].category,
      market: markets[pick(markets.length)],
      units,
      revenue: units * price,
      stock: pick(2500),
    };
  });
}

export function productName(row: ProductRow, locale: Locale): string {
  return `${garments[row.garment][locale]} ${colors[row.color][locale]} · ${row.ref}`;
}

export function categoryName(key: CategoryKey, locale: Locale): string {
  return categories[key][locale];
}

export function marketNames(locale: Locale): Record<string, string> {
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  return Object.fromEntries(markets.map((code) => [code, names.of(code) ?? code]));
}

export interface ProductQuery {
  text: string;
  category: CategoryKey | '';
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function filterProducts(
  rows: ProductRow[],
  query: ProductQuery,
  locale: Locale,
  markets: Record<string, string>,
): ProductRow[] {
  const terms = normalize(query.text).split(/\s+/).filter(Boolean);
  return rows.filter((row) => {
    if (query.category && row.category !== query.category) return false;
    if (!terms.length) return true;
    const haystack = normalize(
      `${productName(row, locale)} ${categoryName(row.category, locale)} ${markets[row.market]}`,
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export function sortProducts(
  rows: ProductRow[],
  key: ColumnKey,
  direction: SortDirection,
  locale: Locale,
  markets: Record<string, string>,
): ProductRow[] {
  const collator = new Intl.Collator(locale, { sensitivity: 'base', numeric: true });
  const value = (row: ProductRow): string | number => {
    switch (key) {
      case 'product':
        return productName(row, locale);
      case 'category':
        return categoryName(row.category, locale);
      case 'market':
        return markets[row.market];
      default:
        return row[key];
    }
  };
  const factor = direction === 'ascending' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = value(a);
    const vb = value(b);
    const result =
      typeof va === 'number' && typeof vb === 'number' ? va - vb : collator.compare(String(va), String(vb));
    return result * factor || a.id - b.id;
  });
}
