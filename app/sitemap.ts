import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://staircase.vercel.app';

const ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/menu', priority: 0.9 },
  { path: '/services', priority: 0.7 },
  { path: '/pricing', priority: 0.7 },
  { path: '/testimonials', priority: 0.6 },
  { path: '/faq', priority: 0.6 },
  { path: '/contact', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
