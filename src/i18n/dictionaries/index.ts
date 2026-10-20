import { notFound } from 'next/navigation';
import { locale as getLocaleParam } from 'next/root-params';
import { isLocale, type Locale } from '../config';
import { en, type Dictionary } from './en';
import { es } from './es';

const dictionaries: Record<Locale, Dictionary> = { en, es };

export async function getLocale(): Promise<Locale> {
  const value = await getLocaleParam();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}

export type { Dictionary };
