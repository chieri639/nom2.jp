import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '【プロ直伝】和食と日本酒ペアリングの極意・四季の「旬」と「テロワール」を味わう｜nom × nom',
    description: '和食×日本酒ペアリングの最終回。日本の美でもある春夏秋冬の「旬の食材」と、その土地ならではの「地酒（テロワール）」を合わせる、究極に粋なペアリング術を解説します。',
    openGraph: {
        title: '【プロ直伝】和食と日本酒ペアリングの極意・四季の「旬」と「テロワール」を味わう',
        description: '和食×日本酒ペアリングの最終回。日本の美でもある四季の「旬」と「テロワール（地産地消）」を合わせる、究極に粋なペアリング術を解説します。',
        url: 'https://ai.nom2.jp/article/washoku-sake-pairing-part-3',
        siteName: '日本酒AI - nom × nom',
        images: [
            {
                url: '/images/washoku_pairing_hero_3.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'ja_JP',
        type: 'article',
    },
};

export default function WashokuPairingPart3Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
