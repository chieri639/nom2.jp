export const metadata = {
  title: '5 Best Sake Izakayas in Tokyo (Part 2) | nom × nom',
  description: 'Part 2 of our curated guide to Tokyo\'s finest Japanese sake spots, featuring Food & Sake Pairing, Cost-Effective options, and Professional Guidance for foreign tourists.',
};

export default function TokyoSakeIzakayaGuidePart2Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ backgroundColor: '#faf9f5', minHeight: '100vh', color: '#333' }}>
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
