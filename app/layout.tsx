import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hc-build-win.mossy-rat-0653.chatgpt.site'),
  title: 'Hackathon Club — Learn. Build. Win.',
  description:
    'Master coding, build real projects, join hands-on workshops, and compete to win with Hackathon Club.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Hackathon Club — Learn. Build. Win.',
    description:
      'Hands-on workshops, team challenges, college games, and hackathon prep for curious builders.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Hackathon Club — Learn. Build. Win.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hackathon Club — Learn. Build. Win.',
    description:
      'Hands-on workshops, team challenges, college games, and hackathon prep for curious builders.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#07100f',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
