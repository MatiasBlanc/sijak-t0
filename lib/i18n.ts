import enLanding from '@/locales/en/landing.json';
import esLanding from '@/locales/es/landing.json';
import enProduct from '@/locales/en/product.json';
import esProduct from '@/locales/es/product.json';
import type { Lang } from './copy';

export const dictionaries = {
  en: { landing: enLanding, product: enProduct },
  es: { landing: esLanding, product: esProduct },
} as const;

type Namespace = 'landing' | 'product';

/**
 * Crea un traductor por idioma y dominio, con interpolación de parámetros obligatorios.
 * @param lang - Idioma activo.
 * @param namespace - Diccionario de contenido o de usos del producto.
 * @returns Función que resuelve claves con puntos y sus parámetros.
 * @throws Error si la clave no existe, no es texto o le faltan parámetros.
 */
export function getTranslator(lang: Lang, namespace: Namespace) {
  const dictionary: unknown = dictionaries[lang][namespace];
  return (key: string, params: Record<string, string | number> = {}): string => {
    let value: unknown = dictionary;
    for (const segment of key.split('.')) {
      if (Array.isArray(value) && /^\d+$/.test(segment)) {
        value = value[Number(segment)];
      } else if (isDictionary(value) && segment in value) {
        value = value[segment];
      } else {
        throw new Error(`No existe la traducción: ${namespace}.${key} (${lang})`);
      }
    }
    if (typeof value !== 'string')
      throw new Error(`La traducción no es texto: ${namespace}.${key} (${lang})`);
    return value.replace(/\{(\w+)\}/g, (_, param: string) => {
      if (!(param in params))
        throw new Error(`Falta el parámetro ${param}: ${namespace}.${key} (${lang})`);
      return String(params[param]);
    });
  };
}

function isDictionary(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
