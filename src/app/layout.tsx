import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
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
  // アクセシビリティのためズーム制限を解除
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <head>
        {/* フォントは next/font で管理されるため link タグは削除 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KRD526KNEV"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KRD526KNEV');
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
