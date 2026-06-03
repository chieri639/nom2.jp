import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'nomnom（のむのむ）nom2.jpへのお問い合わせページです。企業・酒蔵・メディア関係者様はメールで、読者の皆様はInstagram DMでお気軽にご連絡ください。',
  alternates: {
    canonical: 'https://nom2.jp/contact',
  },
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

      {/* ページタイトル */}
      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#1a1a1a' }}>
          お問い合わせ
        </h1>
        <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8 }}>
          nom2.jp（のむのむ）をご覧いただきありがとうございます。<br />
          ご用件に合わせて、以下の窓口よりお気軽にご連絡ください。
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* 企業・酒蔵向け */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#2c3e50', borderLeft: '4px solid #bfa758', paddingLeft: '12px' }}>
            🏢 企業・酒蔵・メディア関係者様
          </h2>
          <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '24px' }}>
            PR案件、広告掲載、取材依頼、その他ビジネスに関する協業のご相談については、以下のメールアドレスまでご連絡ください。内容を確認の上、担当者よりご返信させていただきます。
          </p>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '8px' }}>メールアドレス</span>
            <a
              href="mailto:nom2.nihonshu@gmail.com"
              style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}
            >
              nom2.nihonshu@gmail.com
            </a>
          </div>
        </div>

        {/* 読者向け */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#2c3e50', borderLeft: '4px solid #bfa758', paddingLeft: '12px' }}>
            🥂 読者の皆様
          </h2>
          <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '24px' }}>
            「記事の感想」「おすすめの日本酒を教えてほしい！」「今度行く居酒屋の相談にのって！」など、カジュアルなご質問やご相談は、InstagramのDMにて大歓迎です！お気軽にメッセージをお送りください。
          </p>
          <div style={{ textAlign: 'center' }}>
            <a
              href="https://instagram.com/nihonshu.nomnom"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#1a1a1d', color: '#fff', padding: '14px 32px', borderRadius: '30px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}
            >
              InstagramでDMを送る →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
