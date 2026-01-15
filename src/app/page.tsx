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
                <div style={{
                    maxWidth: 1080,
                    margin: '0 auto',
                    padding: '0 16px',
                }}>
                    <div style={{
                        height: 260,
                        borderRadius: 16,
                        overflow: 'hidden',
                        margin: '18px 0',
                        background: 'linear-gradient(135deg, #111, #333)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: 18,
                        color: '#fff'
                    }}>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>
                                AIが好みを分析！おすすめ日本酒を提案
                            </div>
                            <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
                                チャットに答えるだけで、nom2.jp推薦の日本酒が見つかります
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article body */}
            <main style={{ maxWidth: 860, margin: '0 auto', padding: '22px 16px 60px' }}>
                <h1 style={{ fontSize: 28, margin: '10px 0 6px', fontWeight: 800, letterSpacing: 0.2 }}>
                    nom2.jp AIを使って自分にぴったりの日本酒を見つける機能を実装しました！
                </h1>

                <div style={{ fontSize: 12, color: '#666', marginBottom: 18 }}>
                    2026/01/15 18:00
                </div>

                <p style={{ fontSize: 15, lineHeight: 1.9, color: '#333', marginBottom: 18 }}>
                    以下のチャットにご自身の好みを入力していくと、nom2.jpおすすめの日本酒リストが出てきます！
                    （データ更新中のため、件数は増えていきます）
                </p>

                {/* AI Tool Section */}
                <section style={{
                    marginTop: 18,
                    background: '#0b0b0b',
                    borderRadius: 18,
                    padding: 18,
                    boxShadow: '0 14px 40px rgba(0,0,0,0.18)',
                }}>
                    <SakeRecoPage />
                </section>

                {/* Optional: after section */}
                <div style={{ marginTop: 18, fontSize: 12, color: '#777', lineHeight: 1.7 }}>
                    ※ 楽天アフィリエイトリンクを利用しています。掲載情報は更新される場合があります。
                </div>
            </main>

            <footer style={{ background: '#f9f9f9', padding: '40px 20px', textAlign: 'center', fontSize: 12, color: '#999', borderTop: '1px solid #eee' }}>
                &copy; 2026 nom2.jp
            </footer>
        </div>
    );
}
