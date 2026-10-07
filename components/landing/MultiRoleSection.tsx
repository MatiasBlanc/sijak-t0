'use client';

import { getImageProps } from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { product } from '@/lib/product';
import { media } from '@/lib/media';
import { ROLE_IMAGE_SIZES, type LocalizedRole, type MultiRoleCopy, type RoleId } from '@/lib/roles';
import { trackEvent } from '@/lib/analytics';
import type { Lang } from '@/lib/copy';
import { RoleHero } from './multi-role/RoleHero';
import { RolePreviewRail } from './multi-role/RolePreviewRail';
import { RoleTabs } from './multi-role/RoleTabs';

interface MultiRoleSectionProps {
  lang: Lang;
  copy: MultiRoleCopy;
  roles: LocalizedRole[];
}

/** Selector de montajes: una imagen de contexto, cinco roles, una sola pieza de hardware. */
export function MultiRoleSection({ lang, copy, roles }: MultiRoleSectionProps) {
  const [activeRole, setActiveRole] = useState<RoleId>('ankle');
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const role = roles.find((item) => item.id === activeRole) ?? roles[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        // Se anticipan variantes optimizadas solo cuando esta sección se acerca al viewport.
        for (const item of roles) {
          if (item.id === 'ankle') continue;
          const { props } = getImageProps({
            src: item.image,
            alt: item.alt,
            fill: true,
            sizes: ROLE_IMAGE_SIZES,
            quality: 75,
          });
          const preload = new window.Image();
          preload.sizes = ROLE_IMAGE_SIZES;
          if (props.srcSet) preload.srcset = props.srcSet;
          preload.src = props.src;
        }
        observer.disconnect();
      },
      { rootMargin: '120px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [roles]);

  function selectRole(id: RoleId) {
    if (id === activeRole) return;
    setActiveRole(id);
    trackEvent({ name: 'role_view', properties: { role: id, locale: lang } });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % roles.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + roles.length) % roles.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = roles.length - 1;
        break;
      case 'Enter':
      case ' ':
        selectRole(roles[index].id);
        return;
      default:
        return;
    }
    event.preventDefault();
    selectRole(roles[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="roles"
      ref={sectionRef}
      aria-labelledby="roles-title"
      className="bg-background py-20 text-foreground md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-2 md:items-end md:gap-12">
          <h2 id="roles-title" className="font-heading text-4xl leading-tight md:text-6xl">
            {copy.heading[0]}
            <br />
            {copy.heading[1]}
          </h2>
          <div className="max-w-sm md:ml-auto">
            <p className="text-lg text-foreground">{copy.lead}</p>
            <p className="mt-3 text-base leading-relaxed text-muted">{copy.body}</p>
          </div>
        </div>
        <div className="border border-border bg-surface">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 font-technical text-xs tracking-wide text-muted md:px-8">
            <span className="text-foreground">
              {product.brand} / {product.name}
            </span>
            <span>{copy.hardware} — 01</span>
          </div>
          <div className="grid lg:grid-cols-5">
            <div className="min-w-0 lg:col-span-3">
              <div
                id="role-panel"
                role="tabpanel"
                aria-labelledby={`role-tab-${role.id}`}
                tabIndex={0}
                className="outline-none"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                    transition={{ duration: shouldReduceMotion ? 0.12 : 0.36 }}
                  >
                    <RoleHero
                      role={role}
                      copy={copy}
                      illustration={media.roleMediaKind === 'illustration'}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <RolePreviewRail
              roles={roles}
              activeRole={activeRole}
              label={copy.previewsLabel}
              onSelect={selectRole}
            />
          </div>
        </div>
        <RoleTabs
          roles={roles}
          activeRole={activeRole}
          label={copy.tabsLabel}
          onSelect={selectRole}
          onKeyDown={onTabKeyDown}
          tabRefs={tabRefs}
        />
      </div>
    </section>
  );
}
