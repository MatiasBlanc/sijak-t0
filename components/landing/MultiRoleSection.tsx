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
import { Section, SectionHeader } from '@/components/ui/LandingLayout';

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
    <Section id="roles" sectionRef={sectionRef} labelledBy="roles-title">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <SectionHeader id="roles-title">
            {copy.heading[0]}<br />{copy.heading[1]}
          </SectionHeader>
          <p className="max-w-sm text-base leading-relaxed text-muted md:ml-auto md:text-lg">
            {copy.lead}<br />{copy.body}
          </p>
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
                className="relative outline-none"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, position: 'absolute' }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
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
    </Section>
  );
}
