import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '【2026年版】北海道の日本酒マップ！全14酒蔵の特徴を徹底解説 | nom × nom',
    description: '北海道にある全ての代表的な酒蔵14ヶ所の特徴やおすすめ銘柄を完全ガイド。「上川大雪」「男山」「国稀」「千歳鶴」など、旅行やお土産に絶対外さない銘酒をプロが厳選紹介します。',
    openGraph: {
        title: '【2026年最新】北海道の日本酒マップ！全14酒蔵の特徴を徹底解説',
        description: '北海道旅行やお土産探しに必見。北海道内の全14酒蔵（上川大雪・男山・高砂・国稀など）の特徴と代表銘柄をどこよりも詳しくガイドします。',
        images: ['/images/hokkaido_sake_hero.png'],
    },
};

export default function HokkaidoSakeGuideLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
