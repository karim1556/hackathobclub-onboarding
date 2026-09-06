import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Manrope, Syne } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-brand-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hc-build-win.cream911.chatgpt.site'),
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
        className={`${manrope.variable} ${syne.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
