import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '【プロ直伝】和食と日本酒ペアリングの真髄・だしの旨味と温度の魔法｜nom × nom',
    description: '和食の要である「だしの旨味」と、日本酒特有の「お燗」による温度変化。この2つの要素を掛け合わせることで生まれる、爆発的な旨味の相乗効果についてプロが圧倒的にわかりやすく解説します。',
    openGraph: {
        title: '【プロ直伝】和食と日本酒ペアリングの真髄・だしの旨味と温度の魔法',
        description: '和食の要である「だしの旨味」と、日本酒特有の「お燗」による温度変化。爆発的な相乗効果の理論についてプロがわかりやすく解説します。',
        url: 'https://ai.nom2.jp/article/washoku-sake-pairing-part-2',
        siteName: '日本酒AI - nom × nom',
        images: [
            {
                url: '/images/washoku_pairing_hero_2.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'ja_JP',
        type: 'article',
    },
};

export default function WashokuPairingPart2Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
