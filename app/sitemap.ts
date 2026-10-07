import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijak-t0.vercel.app';
  return ['en', 'es'].map((lang) => ({
    url: `${base}/${lang}`,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages: { en: `${base}/en`, es: `${base}/es` } },
  }));
}
