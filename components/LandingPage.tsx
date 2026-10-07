import { Coaches } from '@/components/landing/Coaches';
import { Concept } from '@/components/landing/Concept';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { IndustrialDesign } from '@/components/landing/IndustrialDesign';
import { Sports } from '@/components/landing/Sports';
import { System } from '@/components/landing/System';
import { Waitlist } from '@/components/landing/Waitlist';
import type { Copy, Lang } from '@/lib/copy';

/** Compone la landing. El HTML estático no arrastra el JavaScript de las islas interactivas. */
export default function LandingPage({ lang, copy }: { lang: Lang; copy: Copy }) {
  return (
    <>
      <Header
        lang={lang}
        nav={copy.nav}
        join={copy.join}
        menuOpen={copy.tech.menuOpen}
        menuClose={copy.tech.menuClose}
        topLabel={copy.tech.top}
      />
      <main id="main">
        <Hero copy={copy} />
        <Concept
          title={copy.conceptTitle}
          modular={copy.tech.modular}
          core={copy.tech.core}
          same={copy.tech.same}
          mountsLabel={copy.tech.mounts}
          sensorLabel={copy.sensorLabel}
          mounts={copy.mounts}
        />
        <IndustrialDesign lang={lang} />
        <HowItWorks copy={copy} />
        <Sports copy={copy} />
        <System copy={copy} />
        <Coaches lang={lang} copy={copy} />
        <Waitlist
          lang={lang}
          copy={{
            waitTitle: copy.waitTitle,
            waitBody: copy.waitBody,
            footerTag: copy.footerTag,
            name: copy.name,
            email: copy.email,
            country: copy.country,
            sport: copy.sport,
            role: copy.role,
            roles: copy.roles,
            sports: copy.sports,
            count: copy.count,
            select: copy.select,
            submit: copy.submit,
            sending: copy.sending,
            success: copy.success,
            successBody: copy.successBody,
            privacyNote: copy.privacyNote,
            privacy: copy.privacy,
            errors: copy.errors,
            early: copy.tech.early,
          }}
        />
      </main>
      <Footer lang={lang} copy={copy} />
    </>
  );
}
