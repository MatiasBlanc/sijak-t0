import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijak-t0.vercel.app';
  return ['es', 'en'].map((lang) => ({
    url: `${base}/${lang}`,
    changeFrequency: 'monthly',
    priority: lang === 'es' ? 1 : 0.9,
    alternates: { languages: { en: `${base}/en`, es: `${base}/es`, 'x-default': `${base}/es` } },
  }));
}
