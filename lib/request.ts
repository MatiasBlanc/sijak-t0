export type JsonRequestResult =
  { data: unknown; error?: never } | { error: Response; data?: never };

/**
 * Lee un JSON pequeño desde el mismo origen, limitando el cuerpo antes de decodificarlo.
 * @param request - Solicitud HTTP entrante.
 * @returns Datos desconocidos para validar o una respuesta de error segura.
 */
export async function readFormRequest(request: Request): Promise<JsonRequestResult> {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin)
    return { error: Response.json({ error: 'Origen no permitido.' }, { status: 403 }) };
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return { error: Response.json({ error: 'Se requiere JSON.' }, { status: 415 }) };
  const reader = request.body?.getReader();
  if (!reader) return { error: Response.json({ error: 'Solicitud vacía.' }, { status: 400 }) };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 8192) {
      await reader.cancel();
      return { error: Response.json({ error: 'Solicitud demasiado grande.' }, { status: 413 }) };
    }
    chunks.push(value);
  }
  let data: unknown;
  try {
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return { error: Response.json({ error: 'JSON inválido.' }, { status: 400 }) };
  }
  if (data && typeof data === 'object' && 'website' in data && data.website)
    return { error: Response.json({ error: 'Solicitud no válida.' }, { status: 400 }) };
  return { data };
}
