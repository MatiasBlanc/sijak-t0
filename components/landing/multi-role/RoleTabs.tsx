import type { KeyboardEvent, RefObject } from 'react';
import type { LocalizedRole, RoleId } from '@/lib/roles';

interface RoleTabsProps {
  roles: LocalizedRole[];
  activeRole: RoleId;
  label: string;
  onSelect: (id: RoleId) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  tabRefs: RefObject<(HTMLButtonElement | null)[]>;
}

/** Pestañas con foco itinerante, selección manual y desplazamiento horizontal en móvil. */
export function RoleTabs({
  roles,
  activeRole,
  label,
  onSelect,
  onKeyDown,
  tabRefs,
}: RoleTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="mt-4 flex snap-x overflow-x-auto border border-border md:grid md:grid-cols-5"
    >
      {roles.map((role, index) => (
        <button
          key={role.id}
          id={`role-tab-${role.id}`}
          ref={(node) => {
            tabRefs.current[index] = node;
          }}
          type="button"
          role="tab"
          aria-selected={role.id === activeRole}
          aria-controls="role-panel"
          tabIndex={role.id === activeRole ? 0 : -1}
          onClick={() => onSelect(role.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
          className={`relative flex min-h-20 min-w-28 snap-start flex-col justify-center border-r border-border px-4 py-4 text-left transition-colors last:border-r-0 md:min-w-0 ${role.id === activeRole ? 'bg-signal/5 text-signal' : 'text-foreground hover:bg-surface hover:text-signal'}`}
        >
          <span
            className="absolute inset-x-0 top-0 h-0.5 bg-signal"
            aria-hidden="true"
            hidden={role.id !== activeRole}
          />
          <span className="font-technical text-xs text-muted">{role.number}</span>
          <span className="mt-1 font-heading text-base">{role.title}</span>
          <span className="font-technical text-xs text-muted">{role.subtitle}</span>
        </button>
      ))}
    </div>
  );
}
