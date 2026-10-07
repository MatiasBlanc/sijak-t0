export interface FormFailure {
  status: number;
  fields: string[];
}

export interface FormErrorCopy {
  title: string;
  network: string;
  unavailable: string;
  invalid: string;
  unexpected: string;
  tooLarge: string;
  fields: Record<string, string>;
}

/**
 * Envía JSON al mismo origen y normaliza el fallo sin exponer el cuerpo al azar.
 * @param url - Ruta relativa de la API.
 * @param body - Payload ya validado en el cliente o pendiente de validación del servidor.
 * @returns Confirmación o el estado HTTP y los campos rechazados.
 */
export async function postForm(
  url: string,
  body: unknown,
): Promise<{ ok: true } | { ok: false; failure: FormFailure }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    if (response.ok) return { ok: true };
    return {
      ok: false,
      failure: { status: response.status, fields: await readErrorFields(response) },
    };
  } catch {
    return { ok: false, failure: { status: 0, fields: [] } };
  }
}

/**
 * Traduce un fallo de red o de API a mensajes visibles, sin usar el texto crudo del servidor.
 * @param copy - Textos del idioma activo.
 * @param failure - Estado HTTP y campos devueltos por la API.
 * @returns Lista sin duplicados, lista para el aviso del formulario.
 */
export function formErrorMessages(copy: FormErrorCopy, failure: FormFailure): string[] {
  if (failure.status === 0) return [copy.network];
  if (failure.status === 413) return [copy.tooLarge];
  if (failure.status === 503) return [copy.unavailable];
  const messages = [
    ...new Set(
      failure.fields
        .map((field) => copy.fields[field])
        .filter((message): message is string => Boolean(message)),
    ),
  ];
  if (messages.length > 0) return messages;
  if (failure.status === 400) return [copy.invalid];
  return [copy.unexpected];
}

async function readErrorFields(response: Response): Promise<string[]> {
  try {
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== 'object' || !('fields' in payload)) return [];
    const { fields } = payload;
    if (!Array.isArray(fields)) return [];
    return fields.filter((field): field is string => typeof field === 'string');
  } catch {
    return [];
  }
}
