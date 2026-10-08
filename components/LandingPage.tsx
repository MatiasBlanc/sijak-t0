import { Coaches } from '@/components/landing/Coaches';
import { MultiRoleSection } from '@/components/landing/MultiRoleSection';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { Progress } from '@/components/landing/Progress';
import { System } from '@/components/landing/System';
import { Waitlist } from '@/components/landing/Waitlist';
import type { Copy, Lang } from '@/lib/copy';
import { getMultiRoleContent } from '@/lib/role-copy';

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
        <ProblemSection lang={lang} />
        <HowItWorks copy={copy} />
        <Progress lang={lang} />
        <Coaches lang={lang} />
        <MultiRoleSection lang={lang} {...getMultiRoleContent(lang)} />
        <System copy={copy} />
        <Waitlist
          lang={lang}
          copy={{
            waitTitle: copy.waitTitle,
            waitBody: copy.waitBody,
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
