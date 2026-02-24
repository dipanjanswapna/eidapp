import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Footer } from '@/components/footer';

const siteUrl = 'https://eidvibe.vercel.app';
const title = 'EidVibe - Your Ultimate Eid Companion';
const description = 'Celebrate Eid with EidVibe! Create anonymous NGL-style messages, calculate Salami, spin the lucky wheel for fun, find Iftar spots, and send beautiful Eid cards. All your Eid fun in one place.';
const keywords = [
    'Eid', 'EidVibe', 'Salami Calculator', 'Eid Card', 'Anonymous Messages', 'NGL', 'Iftar Spots', 'Ramadan', 'Eid Mubarak', 'সালামি ক্যালকুলেটর', 'ঈদ কার্ড', 'গোপন চিঠি', 'ইফতার স্পট'
];
const ogImageUrl = 'https://images.unsplash.com/photo-1619525492451-a36543b3425f?w=1200&q=80';


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords,
  creator: 'Prangon',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImageUrl],
    creator: '@dipanjanswapna',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
