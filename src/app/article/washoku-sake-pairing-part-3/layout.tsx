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
    return (
        <div style={{ backgroundColor: '#faf9f5', minHeight: '100vh', color: '#111' }}>
            <header style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #eaeaea',
                position: 'sticky',
                top: 0,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                zIndex: 50,
            }}>
                <a href="https://nom2.jp/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://storage.googleapis.com/studio-design-asset-files/projects/YPqrD0nkW5/s-782x198_v-fs_webp_889affa7-11ce-4094-9e79-217640c394e8_small.webp" alt="nom × nom" style={{ height: 24, width: 'auto' }} />
                </a>
            </header>
            <main>
                {children}
            </main>
            <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #eaeaea', padding: '60px 40px', textAlign: 'center', color: '#666' }}>
                <div style={{ marginBottom: 24 }}>
                    <a href="https://nom2.jp/" style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <img src="https://storage.googleapis.com/studio-design-asset-files/projects/YPqrD0nkW5/s-782x198_v-fs_webp_889affa7-11ce-4094-9e79-217640c394e8_small.webp" alt="nom × nom" style={{ height: 24, width: 'auto' }} />
                    </a>
                </div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: 13 }}>© 2026 nom × nom. All rights reserved.</p>
            </footer>
        </div>
    );
}
