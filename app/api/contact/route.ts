import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import { parseContact } from '@/lib/contact';
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
  const parsed = parseContact(result.data);
  if (!parsed.ok) {
    return Response.json(
      { error: 'Revisa los datos y el consentimiento.', fields: parsed.fields },
      { status: 400 },
    );
  }
  try {
    await put(
      `contact/${randomUUID()}.json`,
      JSON.stringify({ ...parsed.entry, createdAt: new Date().toISOString() }),
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
