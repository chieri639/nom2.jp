import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '【プロ直伝】和食と日本酒のペアリングの基本・相性を抜群にする2つの方程式｜nom × nom',
    description: 'なぜ和食と日本酒はこれほどまでに合うのか？その秘密は「同調」と「補完」にありました。お刺身や天ぷらなど、いつもの和食をもっと美味しく楽しむための初心者にわかりやすいペアリングの基本をプロが解説します。',
    openGraph: {
        title: '【プロ直伝】和食と日本酒のペアリングの基本・相性を抜群にする2つの方程式',
        description: 'なぜ和食と日本酒はこれほどまでに合うのか？その秘密は「同調」と「補完」にありました。いつもの和食をもっと美味しく楽しむための初心者にわかりやすいペアリングの基本をプロが解説します。',
        url: 'https://ai.nom2.jp/article/washoku-sake-pairing-part-1',
        siteName: '日本酒AI - nom × nom',
        images: [
            {
                url: '/images/washoku_pairing_hero_1.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'ja_JP',
        type: 'article',
    },
};

export default function WashokuPairingPart1Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
