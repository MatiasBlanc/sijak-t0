import Image from 'next/image';
import { ROLE_IMAGE_SIZES, type LocalizedRole, type MultiRoleCopy } from '@/lib/roles';
import { RoleMetrics } from './RoleMetrics';

interface RoleHeroProps {
  role: LocalizedRole;
  copy: MultiRoleCopy;
  illustration: boolean;
}

/** Muestra un montaje contextual sin construir el producto con estilos. */
export function RoleHero({ role, copy, illustration }: RoleHeroProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-1">
      <div className="relative aspect-square overflow-hidden bg-surface-elevated md:aspect-auto md:min-h-full lg:aspect-square">
        <Image
          src={role.image}
          alt={role.alt}
          fill
          sizes={ROLE_IMAGE_SIZES}
          loading="lazy"
          className="object-cover"
          style={{ objectPosition: role.objectPosition }}
        />
        {illustration && (
          <span className="absolute bottom-4 left-5 bg-background px-2 py-1 font-technical text-xs tracking-wide text-muted md:left-8">
            {copy.illustration}
          </span>
        )}
      </div>
      <div className="relative flex flex-col justify-end gap-4 border-t border-border p-6 md:border-l md:border-t-0 md:p-8 lg:border-l-0 lg:border-t">
        <span
          aria-hidden="true"
          className="absolute right-6 top-2 font-heading text-8xl text-muted lg:right-8"
        >
          {role.number}
        </span>
        <span className="relative font-technical text-xs tracking-wide text-muted">
          {role.number} / {role.title}
        </span>
        <div className="relative">
          <h3 className="font-heading text-4xl md:text-5xl">{role.title}</h3>
          <p className="mt-1 font-technical text-xs tracking-wide text-signal">{role.subtitle}</p>
        </div>
        <p className="relative max-w-md text-sm leading-relaxed text-muted">{role.description}</p>
        <RoleMetrics metrics={role.metrics} />
        <p className="relative mt-2 flex items-center gap-3 font-technical text-xs tracking-wide text-muted">
          <span aria-hidden="true" className="size-2 shrink-0 bg-signal" />
          {copy.caption[0]} {copy.caption[1]}
        </p>
      </div>
    </div>
  );
}
