import type { Lang } from './copy';
import type { RoleId } from './roles';

export interface RoleViewEvent {
  name: 'role_view';
  properties: { role: RoleId; locale: Lang };
}

/**
 * Publica una señal local, sin proveedor, cookies ni datos personales.
 * @param event - Evento tipado que un adaptador autorizado puede consumir.
 * @returns Nada; no envía solicitudes de red.
 */
export function trackEvent(event: RoleViewEvent): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<RoleViewEvent>('sijak:analytics', { detail: event }));
  }
}
