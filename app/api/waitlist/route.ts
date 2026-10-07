import { createHash } from 'node:crypto';
import { BlobNotFoundError, head, put } from '@vercel/blob';
import { parseWaitlist } from '@/lib/waitlist';
import { readFormRequest } from '@/lib/request';

export const runtime = 'nodejs';
export const maxDuration = 15;

/**
 * Guarda una inscripción validada en almacenamiento privado de Vercel Blob.
 * @param request - Solicitud del formulario en el mismo origen.
 * @returns 201 al guardar, 400/403/413/415 al rechazar la solicitud o 503 si falla el almacenamiento.
 * @remarks Los reintentos del mismo correo no sobrescriben datos ni revelan si ya estaba inscrito.
 */
export async function POST(request: Request): Promise<Response> {
  const result = await readFormRequest(request);
  if (result.error) return result.error;
  const parsed = parseWaitlist(result.data);
  if (!parsed.ok) {
    return Response.json(
      { error: 'Revisa los datos y el consentimiento.', fields: parsed.fields },
      { status: 400 },
    );
  }
  const entry = parsed.entry;
  const id = createHash('sha256').update(entry.email).digest('hex');
  try {
    let exists = false;
    try {
      await head(`waitlist/${id}.json`);
      exists = true;
    } catch (error) {
      if (!(error instanceof BlobNotFoundError)) throw error;
    }
    if (!exists)
      await put(`waitlist/${id}.json`, JSON.stringify(entry), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: 'application/json',
      });
  } catch (error) {
    // No registrar el cuerpo, el correo ni los mensajes del proveedor: pueden contener datos personales.
    console.error('[SIJAK waitlist] No se pudo guardar la inscripción.', {
      type: error instanceof Error ? error.name : 'UnknownError',
    });
    return Response.json(
      { error: 'No se pudo guardar la inscripción. Inténtalo de nuevo.' },
      { status: 503 },
    );
  }
  return Response.json(
    { success: true },
    { status: 201, headers: { 'Cache-Control': 'no-store' } },
  );
}
