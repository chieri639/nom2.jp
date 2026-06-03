import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー・免責事項',
  description:
    'nomnom（のむのむ）nom2.jpのプライバシーポリシー、免責事項、Cookie・アフィリエイト・著作権に関する方針をご説明します。',
  alternates: {
    canonical: 'https://nom2.jp/privacy',
  },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2 style={{
      fontSize: '22px',
      fontWeight: 700,
      marginBottom: '20px',
      color: '#1a1a1a',
      borderLeft: '4px solid #bfa758',
      paddingLeft: '14px',
      lineHeight: 1.4,
    }}>
      {title}
    </h2>
    <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.9 }}>
      {children}
    </div>
  </section>
);

export default function PrivacyPage() {
  const siteName = 'nomnom（のむのむ） / nom2.jp';
  const updatedAt = '2026年5月6日';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

      {/* ページタイトル */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>
          プライバシーポリシー・免責事項
        </h1>
        <p style={{ fontSize: '13px', color: '#888' }}>最終更新日：{updatedAt}</p>
      </div>

      <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.9, marginBottom: '48px' }}>
        {siteName}（以下「当サイト」）は、ユーザーの個人情報の保護および適正な管理を重要な責務と考えております。以下のプライバシーポリシーおよび免責事項をご確認の上、当サイトをご利用ください。
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '48px' }} />

      {/* 1. 個人情報の利用目的 */}
      <Section title="1. 個人情報の利用目的">
        <p style={{ marginBottom: '12px' }}>
          当サイトでは、お問い合わせの際にお名前・メールアドレス等の個人情報をお伺いする場合があります。収集した個人情報は、以下の目的に限り利用します。
        </p>
        <ul style={{ paddingLeft: '24px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>お問い合わせへの回答・対応のため</li>
          <li style={{ marginBottom: '8px' }}>サービスに関する重要なお知らせのため</li>
          <li style={{ marginBottom: '8px' }}>当サイトのサービス改善・統計分析のため</li>
        </ul>
        <p style={{ marginTop: '16px' }}>
          収集した個人情報は、法令に基づく場合を除き、ユーザーの同意なく第三者に開示・提供することはありません。
        </p>
      </Section>

      {/* 2. Cookie・アクセス解析 */}
      <Section title="2. Cookie・アクセス解析ツールについて">
        <p style={{ marginBottom: '16px' }}>
          当サイトでは、利便性の向上やアクセス状況の把握を目的として、以下のツールを使用しています。
        </p>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#1a1a1a' }}>Google Analytics</strong>
          <p style={{ margin: 0 }}>
            当サイトは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。Google Analyticsはデータ収集のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。<br />
            この機能はCookieを無効にすることで収集を拒否できます。詳細は
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#bfa758' }}>Googleのプライバシーポリシー</a>をご確認ください。
          </p>
        </div>

        <p>
          Cookieとは、ウェブサイトがお客様のコンピュータに送信する小さなデータファイルです。ブラウザの設定でCookieを無効にすることも可能ですが、当サイトの一部機能が正常に動作しなくなる場合があります。
        </p>
      </Section>

      {/* 3. アフィリエイト広告 */}
      <Section title="3. 広告配信（アフィリエイト）について">
        <p style={{ marginBottom: '16px' }}>
          当サイトは、第三者配信の広告サービスおよびアフィリエイトプログラムに参加しています。
        </p>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#1a1a1a' }}>楽天アフィリエイト</strong>
          <p style={{ margin: 0 }}>
            当サイトには楽天市場の商品リンクが含まれており、リンクを経由してご購入いただいた場合、当サイトに成果報酬が発生することがあります。掲載している商品情報・価格は記事公開時点のものであり、実際の情報は各販売ページでご確認ください。
          </p>
        </div>
        <p>
          アフィリエイト広告はユーザーの行動情報に基づいて配信される場合があります。関心に合わせた広告配信を停止したい場合は、各広告サービスが提供するオプトアウト機能をご利用ください。
        </p>
      </Section>

      {/* 4. 免責事項 */}
      <Section title="4. 免責事項">
        <p style={{ marginBottom: '12px' }}>
          当サイトに掲載されている情報の正確性・完全性・有用性については万全を期しておりますが、その内容を保証するものではありません。当サイトの情報に基づいてお客様が行った行動・判断により生じたいかなる損害についても、当サイトは責任を負いかねます。
        </p>
        <ul style={{ paddingLeft: '24px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>掲載情報（商品の価格・在庫・スペック等）は変更される場合があり、最新情報はリンク先の各サービスサイトでご確認ください。</li>
          <li style={{ marginBottom: '8px' }}>当サイトからリンクしている外部サイトのコンテンツ・サービスについて、当サイトは管理・保証する立場にありません。外部サイトでのトラブルや損害について、当サイトは一切の責任を負いません。</li>
          <li style={{ marginBottom: '8px' }}>日本酒・アルコール飲料に関する情報は、20歳以上の方を対象としています。未成年者の飲酒を勧奨するものではありません。</li>
        </ul>
      </Section>

      {/* 5. 著作権 */}
      <Section title="5. 著作権について">
        <p style={{ marginBottom: '12px' }}>
          当サイトに掲載されているテキスト・画像・ロゴ・デザイン等のコンテンツの著作権は、特別な記載がない限り当サイト（{siteName}）に帰属します。
        </p>
        <p style={{ marginBottom: '12px' }}>
          私的利用の範囲を超えた無断転載・複製・改変・商業利用は、著作権法により禁止されています。引用を行う場合は、出典（サイト名・URL）を明記した上で適切な範囲内でのみ行ってください。
        </p>
        <p>
          なお、楽天市場等の外部サービスから引用している商品画像・説明文等の著作権は、各権利者に帰属します。
        </p>
      </Section>

      {/* 6. ポリシーの変更 */}
      <Section title="6. プライバシーポリシーの変更について">
        <p>
          当サイトは、必要に応じて本プライバシーポリシーを予告なく変更することがあります。変更後のポリシーは本ページに掲載した時点で効力を生じるものとします。定期的に本ページをご確認されることをお勧めします。
        </p>
      </Section>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '32px' }} />

      {/* お問い合わせ先 */}
      <div style={{ textAlign: 'center', padding: '32px', background: '#f8f9fa', borderRadius: '12px' }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          プライバシーポリシーに関するお問い合わせ
        </p>
        <p style={{ fontSize: '14px', color: '#444' }}>
          サイト名：{siteName}<br />
          Instagram：
          <a href="https://instagram.com/nihonshu.nomnom" target="_blank" rel="noopener noreferrer" style={{ color: '#bfa758' }}>
            @nihonshu.nomnom
          </a>
        </p>
      </div>

    </div>
  );
}
