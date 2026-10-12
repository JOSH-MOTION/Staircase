import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Providers from '../components/Providers';
import FirebaseAnalytics from '../components/FirebaseAnalytics';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://staircase.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const viewport: Viewport = {
  themeColor: '#fd8839',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'STAIRCASE | Irresistible Taste',
    template: '%s | STAIRCASE',
  },
  description:
    'STAIRCASE serves irresistible tastes in Ghana. Enjoy handcrafted main dishes, fluffy pancakes, gourmet ice cream, strawberry treats & signature cocktails.',
  keywords: [
    'STAIRCASE',
    'Staircase restaurant Ghana',
    'Ghana food',
    'jollof rice Ghana',
    'banku and tilapia',
    'fluffy pancakes',
    'ice cream Ghana',
    'Ghana desserts',
    'cocktails Ghana',
    'strawberry treats',
  ],

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'STAIRCASE',
    title: 'STAIRCASE | Irresistible Taste',
    description:
      'Handcrafted main dishes, fluffy pancakes, gourmet ice cream & signature cocktails. Experience irresistible taste at STAIRCASE, Ghana.',
    images: [
      {
        url: OG_IMAGE,
        width: 1376,
        height: 768,
        alt: 'STAIRCASE – Irresistible Taste: Ice cream, pancakes, jollof rice and cocktails',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_GH',
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: 'summary_large_image',
    title: 'STAIRCASE | Irresistible Taste',
    description:
      'Handcrafted main dishes, fluffy pancakes, gourmet ice cream & signature cocktails in Ghana.',
    images: [
      {
        url: OG_IMAGE,
        width: 1376,
        height: 768,
        alt: 'STAIRCASE – Irresistible Taste: Ice cream, pancakes, jollof rice and cocktails',
      },
    ],
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },

  /* ── Robots / Indexing ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Canonical ── */
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'STAIRCASE',
  image: OG_IMAGE,
  description:
    'STAIRCASE serves irresistible tastes in Ghana. Enjoy handcrafted main dishes, fluffy pancakes, gourmet ice cream, strawberry treats & signature cocktails.',
  servesCuisine: ['Ghanaian', 'Desserts', 'Cocktails'],
  telephone: '+233549920071',
  email: 'itscouragej@gmail.com',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nana Adoma Hostel, Engineering Gate & New Site, Opposite Evandy Hostel',
    addressLocality: 'Kumasi',
    addressCountry: 'GH',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '23:00',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <FirebaseAnalytics />
      </body>
    </html>
  );
}

