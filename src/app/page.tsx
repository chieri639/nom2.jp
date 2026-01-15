import SakeRecoPage from './sake-reco/SakeRecoPage';

export default function Home() {
    return (
        <div style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif' }}>
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
            }}>
                <div style={{ fontWeight: 800, letterSpacing: 1 }}>nom × nom</div>
                <button style={{
                    border: '1px solid #ddd',
                    background: '#fff',
                    borderRadius: 999,
                    padding: '8px 12px',
                    fontSize: 12,
                    cursor: 'pointer'
                }}>
                    MENU
                </button>
            </header>

            {/* Hero */}
            <section style={{ background: '#000' }}>
                <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px' }}>
                    <div style={{
                        height: 220,
                        borderRadius: 16,
                        overflow: 'hidden',
                        margin: '18px 0',
                        background: 'linear-gradient(135deg, #111, #333)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: 18,
                        color: '#fff'
                    }}>
                        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.15 }}>
                            AIがおすすめ日本酒を提案
                        </div>
                    </div>
                </div>
            </section>

            {/* AI only */}
            <main style={{ maxWidth: 980, margin: '0 auto', padding: '18px 16px 60px' }}>
                <section style={{
                    background: '#0b0b0b',
                    borderRadius: 18,
                    padding: 14,
                    boxShadow: '0 14px 40px rgba(0,0,0,0.18)',
                }}>
                    <SakeRecoPage />
                </section>
            </main>

            <footer style={{ background: '#f9f9f9', padding: '40px 20px', textAlign: 'center', fontSize: 12, color: '#999', borderTop: '1px solid #eee' }}>
                &copy; 2026 nom2.jp
            </footer>
        </div>
    );
}
