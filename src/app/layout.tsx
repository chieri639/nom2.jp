import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter, Noto_Serif_JP } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const notoSerifJP = Noto_Serif_JP({ 
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nom2.jp'),
  title: 'nom × nom - 日本酒メディアポータル',
  description: 'AIによる診断や和食とのペアリングなど、日本酒の新しい楽しみ方を提案するメディアポータルです。',
  openGraph: {
    title: 'nom × nom - 日本酒メディアポータル',
    description: 'AIによる診断や和食とのペアリングなど、日本酒の新しい楽しみ方を提案するメディアポータルです。',
    url: 'https://nom2.jp',
    siteName: 'nom × nom',
    images: [
      {
        url: '/images/logo_v2.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KRD526KNEV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KRD526KNEV');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${notoSerifJP.variable} font-sans`}>{children}</body>
    </html>
  )
}
