import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DelayedScripts from '@/components/common/DelayedScripts'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'], // ウェイトを 400 と 700 に限定
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
  preload: false, // タイトル用フォントのプリロードを無効化して初期通信を軽量化
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
      </head>
      <body className="antialiased font-sans bg-[#F9F8F6] min-h-screen flex flex-col pt-[60px] md:pt-[68px]">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        
        {/* サードパーティスクリプト（ユーザインタラクション後に遅延ロード） */}
        <DelayedScripts />
        
      </body>
    </html>
  )
}
