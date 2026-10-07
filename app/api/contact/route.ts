import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import { readFormRequest } from '@/lib/request';

export const runtime = 'nodejs';
export const maxDuration = 15;

/**
 * Guarda consultas y solicitudes de privacidad para revisión del equipo SIJAK.
 * @param request - JSON del formulario de contacto, enviado desde el mismo origen.
 * @returns Confirmación 201 únicamente después de guardar, o error 400/503.
 */
export async function POST(request: Request): Promise<Response> {
  const result = await readFormRequest(request);
  if (result.error) return result.error;
  const data = result.data;
  if (!data || typeof data !== 'object' || Array.isArray(data))
    return Response.json({ error: 'Datos inválidos.' }, { status: 400 });
  const value = data as Record<string, unknown>;
  if (
    typeof value.email !== 'string' ||
    value.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
    typeof value.message !== 'string' ||
    value.message.trim().length < 5 ||
    value.message.length > 3000 ||
    value.consent !== 'on' ||
    (value.lang !== 'es' && value.lang !== 'en')
  )
    return Response.json({ error: 'Revisa los datos y el consentimiento.' }, { status: 400 });
  try {
    await put(
      `contact/${randomUUID()}.json`,
      JSON.stringify({
        email: value.email.trim().toLowerCase(),
        message: value.message.trim(),
        lang: value.lang,
        createdAt: new Date().toISOString(),
      }),
      { access: 'private', contentType: 'application/json', addRandomSuffix: false },
    );
  } catch (error) {
    console.error('[SIJAK contact] No se pudo guardar el mensaje.', {
      type: error instanceof Error ? error.name : 'UnknownError',
    });
    return Response.json({ error: 'No se pudo guardar el mensaje.' }, { status: 503 });
  }
  return Response.json(
    { success: true },
    { status: 201, headers: { 'Cache-Control': 'no-store' } },
  );
}
