import { media } from './media';
import { productClaims, type ProductClaim } from './product';

export type RoleId = 'ankle' | 'wrist' | 'paddle' | 'shield' | 'body';
export type RoleUse =
  | 'reaction'
  | 'execution'
  | 'recovery'
  | 'stimulus'
  | 'impactDetection'
  | 'responseTiming'
  | 'timing'
  | 'consistency'
  | 'movement';

export interface RoleDefinition {
  id: RoleId;
  number: string;
  image: string;
  objectPosition: string;
  metrics: readonly { label: RoleUse; claim?: ProductClaim }[];
}

export interface LocalizedRole extends Omit<RoleDefinition, 'metrics'> {
  title: string;
  subtitle: string;
  alt: string;
  description: string;
  metrics: string[];
}

export interface MultiRoleCopy {
  heading: string[];
  lead: string;
  body: string;
  hardware: string;
  caption: string[];
  tabsLabel: string;
  previewsLabel: string;
  illustration: string;
  imageError: string;
}

export const roles: readonly RoleDefinition[] = [
  {
    id: 'ankle',
    number: '01',
    image: media.roles.ankle,
    objectPosition: '52% 60%',
    metrics: [
      { label: 'reaction', claim: 'reaction' },
      { label: 'execution', claim: 'execution' },
      { label: 'recovery', claim: 'recovery' },
    ],
  },
  {
    id: 'wrist',
    number: '02',
    image: media.roles.wrist,
    objectPosition: '50% 48%',
    metrics: [
      { label: 'reaction', claim: 'reaction' },
      { label: 'execution', claim: 'execution' },
      { label: 'recovery', claim: 'recovery' },
    ],
  },
  {
    id: 'paddle',
    number: '03',
    image: media.roles.paddle,
    objectPosition: '50% 62%',
    metrics: [
      { label: 'stimulus' },
      { label: 'impactDetection', claim: 'impactDetection' },
      { label: 'responseTiming', claim: 'totalResponse' },
    ],
  },
  {
    id: 'shield',
    number: '04',
    image: media.roles.shield,
    objectPosition: '52% 50%',
    metrics: [
      { label: 'impactDetection', claim: 'impactDetection' },
      { label: 'timing', claim: 'totalResponse' },
      { label: 'consistency', claim: 'consistency' },
    ],
  },
  {
    id: 'body',
    number: '05',
    image: media.roles.body,
    objectPosition: '56% 52%',
    metrics: [
      { label: 'movement' },
      { label: 'timing', claim: 'totalResponse' },
      { label: 'consistency', claim: 'consistency' },
    ],
  },
];

// El mismo tamaño responsive se utiliza al renderizar y precargar: no se descarga el original.
export const ROLE_IMAGE_SIZES =
  '(max-width: 680px) calc(100vw - 42px), (max-width: 1100px) 55vw, 34vw';

/**
 * Filtra usos que dependan de capacidades aún no habilitadas.
 * @param role - Configuración del montaje.
 * @param claims - Capacidades autorizadas del producto.
 * @returns Etiquetas de uso que pueden mostrarse sin afirmaciones no autorizadas.
 */
export function getEnabledRoleUses(role: RoleDefinition, claims = productClaims): RoleUse[] {
  return role.metrics.filter(({ claim }) => !claim || claims[claim]).map(({ label }) => label);
}
