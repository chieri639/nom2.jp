'use client';

import { useEffect, useState } from 'react';
import SakeSimilarPage from './SakeSimilarPage';

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div className="sake-reco-main-container" style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif' }}>
            {/* Header */}
            <header style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                borderBottom: '1px solid #eee',
                position: 'sticky',
                top: 0,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                zIndex: 50,
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ fontWeight: 800, letterSpacing: 1, fontSize: 18 }}>nom × nom</div>
                    <nav style={{ display: 'flex', gap: 15, fontSize: 13 }}>
                        <a href="/" style={{ color: '#666', textDecoration: 'none' }}> AI診断</a>
                        <a href="/similar" style={{ color: '#111', fontWeight: 700, textDecoration: 'none' }}>似た酒を探す</a>
                    </nav>
                </div>
                <a
                    href="https://nom2.jp"
                    style={{
                        fontSize: 12,
                        color: '#666',
                        textDecoration: 'none',
                        border: '1px solid #ddd',
                        padding: '6px 14px',
                        borderRadius: 999,
                        background: '#fff'
                    }}
                >
                    nom2.jpへ戻る
                </a>
            </header>

            {/* Main */}
            <main style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '12px 16px 80px' : '40px 24px 100px', boxSizing: 'border-box' }}>
                <div style={{ padding: '24px 0 16px' }}>
                    <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, lineHeight: 1.2, color: '#111', margin: 0 }}>
                        似た日本酒AI
                    </h2>
                    <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>
                        お気に入りの銘柄から、新しい出会いを見つけましょう。
                    </p>
                </div>

                <section style={{
                    background: '#0b0b0b',
                    borderRadius: 24,
                    padding: isMobile ? '18px 14px' : 24,
                    boxShadow: '0 18px 50px rgba(0,0,0,0.22)',
                    boxSizing: 'border-box',
                }}>
                    <SakeSimilarPage />
                </section>
            </main>

            <footer style={{ background: '#f9f9f9', padding: '40px 20px', textAlign: 'center', fontSize: 12, color: '#999', borderTop: '1px solid #eee' }}>
                &copy; 2026 nom2.jp
            </footer>
        </div>
    );
}
