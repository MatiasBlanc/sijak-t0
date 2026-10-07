import Image from 'next/image';
import type { LocalizedRole, RoleId } from '@/lib/roles';

interface RolePreviewRailProps {
  roles: LocalizedRole[];
  activeRole: RoleId;
  label: string;
  onSelect: (id: RoleId) => void;
}

/** En escritorio muestra el resto de montajes; en móvil prevalece la imagen activa. */
export function RolePreviewRail({ roles, activeRole, label, onSelect }: RolePreviewRailProps) {
  return (
    <div
      aria-label={label}
      className="hidden gap-px border-t border-border bg-border p-px md:grid md:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:border-l lg:border-t-0"
    >
      {roles
        .filter((role) => role.id !== activeRole)
        .map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelect(role.id)}
            aria-label={`${role.number} / ${role.title} — ${role.subtitle}`}
            className="group relative flex min-h-36 overflow-hidden bg-surface text-left text-foreground transition-colors hover:bg-surface-elevated hover:text-signal focus-visible:z-10 lg:min-h-0"
          >
            <Image
              src={role.image}
              alt={role.alt}
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              loading="lazy"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
              style={{ objectPosition: role.objectPosition }}
            />
            <span className="absolute inset-0 bg-background/10" aria-hidden="true" />
            <span className="relative mt-auto flex w-full items-end justify-between gap-2 p-4 font-technical text-xs tracking-wide lg:p-5">
              <span>
                <span className="block text-muted">
                  {role.number} / {role.title}
                </span>
                <strong className="mt-1 block font-heading text-lg font-normal">
                  {role.subtitle}
                </strong>
              </span>
              <span
                aria-hidden="true"
                className="text-lg transition-transform group-hover:translate-x-1 group-hover:text-signal"
              >
                ↗
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute right-4 top-4 size-2 bg-signal opacity-0 transition-opacity group-hover:opacity-100"
            />
          </button>
        ))}
    </div>
  );
}
