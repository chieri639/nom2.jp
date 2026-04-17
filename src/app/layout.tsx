import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'


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
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
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
      <body className="antialiased">{children}</body>
    </html>
  )
}
