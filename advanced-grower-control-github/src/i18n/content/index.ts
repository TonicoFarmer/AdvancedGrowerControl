import { enContent } from './en';
import { esContent } from './es';
import { deContent } from './de';
import type { LocalizedContent } from './types';
import type { Language } from '../index';

export const CONTENT_BY_LANGUAGE: Record<Exclude<Language, 'pt'>, LocalizedContent> = {
  en: enContent,
  es: esContent,
  de: deContent,
};

/** Merge translated overrides into records while preserving every original field. */
export function localizeItems<T extends { id: string }>(
  items: T[],
  overrides: Record<string, Partial<T>> | undefined,
): T[] {
  if (!overrides) return items;
  return items.map((item) => {
    const translation = overrides[item.id];
    return translation ? { ...item, ...translation } : item;
  });
}
