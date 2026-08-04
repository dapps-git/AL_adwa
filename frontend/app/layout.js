import { Cormorant_Garamond, Jost } from 'next/font/google';
import ImageProtection from './components/ImageProtection';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://aladhwastudio.com'),
  title: {
    default: 'AL ADHWA Studio | Photography, Videography & Teleprompter – Sharjah, UAE',
    template: '%s | AL ADHWA Studio',
  },
  description: 'Al Adhwa Studio (Est. 2014) in Muwailah, Sharjah — UAE premier studio for indoor photography, outdoor shoots, commercial videography, broadcast teleprompter services, custom gift printing, and document services.',
  keywords: [
    'AL ADHWA Studio',
    'Photography Studio Sharjah',
    'Teleprompter Rental UAE',
    'Videography Sharjah',
    'Passport Photo Sharjah',
    'Emirates ID Photo',
    'Gift Printing UAE',
    'Najeeb Abdul Noor Teleprompter',
  ],
  authors: [{ name: 'AL ADHWA Studio' }],
  creator: 'AL ADHWA Studio',
  icons: {
    icon: '/img/logo.webp',
    shortcut: '/img/logo.webp',
    apple: '/img/logo.webp',
  },
  openGraph: {
    title: 'AL ADHWA Studio | Photography, Videography & Teleprompter – Sharjah, UAE',
    description: 'Premier studio for photography, videography, broadcast teleprompters, and custom gift printing in Sharjah & Dubai, UAE.',
    url: 'https://aladhwastudio.com',
    siteName: 'AL ADHWA Studio',
    images: [
      {
        url: '/img/hero.webp',
        width: 1200,
        height: 630,
        alt: 'AL ADHWA Studio Facility',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL ADHWA Studio | Photography & Media Services',
    description: 'Photography, Videography & Teleprompter leadership in UAE.',
    images: ['/img/studio.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AL ADHWA Studio',
  image: 'https://aladhwastudio.com/img/logo.webp',
  telephone: '+971-6-5586870',
  email: 'info@aladhwastudio.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Muwailah',
    addressLocality: 'Sharjah',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.3188,
    longitude: 55.4542,
  },
  url: 'https://aladhwastudio.com',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body>
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}
