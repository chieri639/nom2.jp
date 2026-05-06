import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'nomnom（のむのむ）とは？ | 日本酒専門メディアのコンセプト',
  description:
    '「日本酒は難しい」を「日本酒は面白い」へ。唎酒師・ワインコーディネーター資格を持つプロが運営する日本酒専門メディア nomnom（のむのむ）のコンセプトと運営者情報をご紹介します。',
  alternates: {
    canonical: 'https://nom2.jp/about',
  },
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

      {/* ヒーローセクション */}
      <section style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', color: '#1a1a1a', lineHeight: 1.3 }}>
          日本酒をもっと自由に、もっと楽しく。<br />
          <span style={{ color: '#bfa758' }}>nomnom（のむのむ）</span>へようこそ
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444', maxWidth: '600px', margin: '0 auto' }}>
          「日本酒は難しい」を「日本酒は面白い」へ。<br />
          nom2.jp（のむのむ）は、伝統的な日本酒の魅力を現代の感性で紐解く、日本酒専門メディアです。
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

      {/* なぜ「のむのむ」なのか */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: '16px' }}>
          なぜ「のむのむ（nomnom）」なのか？
        </h2>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', lineHeight: 1.8 }}>
          <p style={{ fontSize: '17px', marginBottom: '24px', color: '#444' }}>
            私たちのサイト名<strong>「nomnom（のむのむ）」</strong>には、2つの想いが込められています。
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '20px' }}>
              <strong style={{ fontSize: '18px', color: '#1a1a1a' }}>1. 「飲む × 飲む」の相乗効果</strong><br />
              <span style={{ fontSize: '16px', color: '#555' }}>一人で飲む楽しみと、誰かと飲む喜び。美味しい酒と、美味しい料理。それらが重なり合った時の幸せな時間を「nom × nom（nom2）」と表現しました。</span>
            </li>
            <li>
              <strong style={{ fontSize: '18px', color: '#1a1a1a' }}>2. 世界に誇る「おいしい」のリズム</strong><br />
              <span style={{ fontSize: '16px', color: '#555' }}>英語圏で「おいしい！」を意味するスラング「nom nom」。日本が誇る日本酒（SAKE）が、世界の共通言語として愛される未来を目指しています。</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3つのこと */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: '16px' }}>
          nom2.jpが大切にしている3つのこと
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏅</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>プロ目線での確かな選球眼</h3>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6 }}>唎酒師（ききさけし）およびワインコーディネーターの資格を持つプロの視点で、本当に美味しい銘柄やお店を厳選してご紹介します。</p>
          </div>
          <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📐</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>多角的な魅力の発信</h3>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6 }}>酒米の違い、居酒屋の選び方、和食とのペアリング理論など、一つの視点にとらわれず、様々な角度から日本酒の奥深さを記事にします。</p>
          </div>
          <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🤝</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>リアルな体験の提供</h3>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6 }}>オンラインの記事にとどまらず、実際に集まって乾杯できるオフラインイベントも開催。五感で楽しむ濃厚な日本酒体験をお届けします。</p>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px dotted #ccc', margin: '60px 0' }} />

      {/* 運営者について */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: '16px' }}>
          運営者について
        </h2>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e9ecef', display: 'flex', flexWrap: 'wrap' as const, gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: '280px', lineHeight: 1.8 }}>
            <p style={{ fontSize: '16px', color: '#444', marginBottom: '20px' }}>
              酒どころ・新潟県で生まれ育ち、現在は東京を拠点に活動。本業では大手IT企業（東証プライム上場）の新規サービス部でPdM（プロダクトマネージャー）を務める傍ら、美味しいものを愛する探求心からグルメインフルエンサーとしても活動しています。
            </p>
            <p style={{ fontSize: '16px', color: '#444', marginBottom: '20px' }}>
              唎酒師とワインコーディネーターの資格を活かし、ITの力と食の知見を掛け合わせて立ち上げたのが、この「nom2.jp」です。
            </p>
            <div style={{ padding: '16px', background: '#fefcfb', borderLeft: '4px solid #bfa758', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
              <strong style={{ color: '#1a1a1a', display: 'block', marginBottom: '8px' }}>🚀 最終的な夢</strong>
              <p style={{ fontSize: '15px', margin: 0, color: '#555', lineHeight: 1.6 }}>
                ただのメディア運営で終わるつもりはありません。いつか<strong>「オリジナルの日本酒ブランド」を立ち上げ、国内はもちろん、海外のテーブルにも私たちの日本酒を届けること</strong>が最大の夢です。
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px', marginTop: '24px' }}>
              <a
                href="https://instagram.com/doyaspot"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8f9fa', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', fontSize: '14px', border: '1px solid #ddd' }}
              >
                🍽️ グルメ垢（@doyaspot）
              </a>
              <a
                href="https://instagram.com/nihonshu.nomnom"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8f9fa', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', fontSize: '14px', border: '1px solid #ddd' }}
              >
                🍶 nom2垢（@nihonshu.nomnom）
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section style={{ marginTop: '80px', padding: '40px', background: '#1a1a1d', color: '#fff', borderRadius: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: '#e6c27a' }}>日本酒の最新トレンドを、あなたの手元に。</h2>
        <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '32px', opacity: 0.9 }}>
          私たち<strong>nomnom（のむのむ）</strong>は、これからも日本酒の未来を面白くする情報を発信し続けます。<br />
          もし、また日本酒のことで知りたくなったら、ぜひ検索してください。
        </p>
        <div style={{ background: '#fff', padding: '12px 24px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '12px', color: '#1a1a1d', fontWeight: 700 }}>
          <span style={{ fontSize: '18px' }}>🔍</span>
          <span style={{ fontSize: '20px', letterSpacing: '0.05em' }}>「のむのむ 日本酒」</span>
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>で検索！</span>
        </div>
        <div style={{ marginTop: '32px' }}>
          <Link
            href="/article"
            style={{ display: 'inline-block', background: '#bfa758', color: '#fff', padding: '14px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}
          >
            記事一覧を見る →
          </Link>
        </div>
      </section>

    </div>
  );
}
