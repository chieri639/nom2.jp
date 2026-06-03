import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: 'nomnom（のむのむ）の特定商取引法に基づく表記ページです。販売業者、所在地、支払方法、酒類販売管理者標識などの法定情報を掲載しています。',
  alternates: {
    canonical: 'https://nom2.jp/tokusho',
  },
};

export default function TokushoPage() {
  // 特定商取引法に基づく表記のデータ
  const items = [
    { label: '販売業者', value: '（会社名または屋号を記入）' },
    { label: '代表責任者', value: '（代表者または責任者の氏名を記入）' },
    { label: '所在地', value: '〒000-0000 （住所を記入）' },
    { label: '電話番号', value: '（電話番号を記入）' },
    { label: 'メールアドレス', value: '（メールアドレスを記入）' },
    { label: '販売価格', value: '各商品紹介ページに表示している価格に基づきます。' },
    { label: '商品代金以外の必要料金', value: '消費税、配送料、各種決済の手数料（振込手数料、コンビニ決済手数料等）。' },
    { label: '支払方法', value: 'クレジットカード決済 / 銀行振込 / コンビニ決済' },
    { label: '支払時期', value: 'クレジットカード：ご利用のカード会社の引落日にて決済。銀行振込・コンビニ決済：ご注文後、指定の期日までにお支払いください。' },
    { label: '商品の引渡時期', value: 'ご注文またはご入金確認後、通常3〜7営業日以内に発送いたします。（予約商品・産地直送品等は各商品ページに記載の納期となります）' },
    { label: '返品・交換・キャンセル等', value: '食品・飲料という商品の特性上、お客様都合による返品・交換・キャンセルはお受けできません。届いた商品に破損・汚損や品違い等の初期不良があった場合は、商品到着後3日以内にお問い合わせフォームまたはメールにてご連絡ください。良品と交換、または返金対応をさせていただきます。' },
  ];

  return (
    <div className="bg-[#F9F8F6] min-h-screen py-16 px-4 md:px-6 font-sans text-[#333]">
      <div className="max-w-3xl mx-auto">
        
        {/* ヘッダー */}
        <header className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest border-b border-[#8B7D6B] pb-4 inline-block">
            特定商取引法に基づく表記
          </h1>
        </header>

        {/* 表セクション */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-12">
          <table className="w-full text-sm leading-relaxed border-collapse">
            <tbody className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <tr key={index} className="flex flex-col md:table-row">
                  <th className="w-full md:w-1/3 py-4 md:py-6 px-6 text-left bg-[#FDFDFD] md:bg-gray-50/30 text-[#8B7D6B] md:text-gray-400 font-bold tracking-wider text-xs border-b md:border-b-0 border-gray-100">
                    {item.label}
                  </th>
                  <td className="w-full md:w-2/3 py-5 md:py-6 px-6 font-medium text-gray-700 whitespace-pre-wrap break-words">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 酒類販売管理者標識 */}
        <div className="bg-white rounded-lg border-2 border-[#8B7D6B]/20 p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-center font-serif font-bold text-[#8B7D6B] text-lg mb-6 tracking-widest">
            酒類販売管理者標識
          </h2>
          <div className="border-t border-b border-gray-100 divide-y divide-gray-100 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between py-4 text-sm">
              <span className="text-[#8B7D6B] sm:text-gray-400 font-bold mb-1 sm:mb-0">販売場の名称及び所在地</span>
              <span className="text-gray-700 sm:text-right font-medium">（店舗名・住所を記入）</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-4 text-sm">
              <span className="text-[#8B7D6B] sm:text-gray-400 font-bold mb-1 sm:mb-0">酒類販売管理者の氏名</span>
              <span className="text-gray-700 sm:text-right font-medium">（氏名を記入）</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-4 text-sm">
              <span className="text-[#8B7D6B] sm:text-gray-400 font-bold mb-1 sm:mb-0">酒類販売管理研修受講年月日</span>
              <span className="text-gray-700 sm:text-right font-medium">202X年X月X日</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-4 text-sm">
              <span className="text-[#8B7D6B] sm:text-gray-400 font-bold mb-1 sm:mb-0">次回研修受講期限</span>
              <span className="text-gray-700 sm:text-right font-medium">202X年X月X日</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-4 text-sm">
              <span className="text-[#8B7D6B] sm:text-gray-400 font-bold mb-1 sm:mb-0">研修実施団体名</span>
              <span className="text-gray-700 sm:text-right font-medium">（研修実施団体名を記入）</span>
            </div>
          </div>
          <div className="pt-2 text-center">
            <p className="text-xs text-gray-400 leading-loose">
              20歳未満の飲酒は法律で禁止されています。<br />
              当社は20歳未満の方への酒類の販売はいたしません。
            </p>
          </div>
        </div>

        {/* 20歳未満の飲酒防止に関する表示（フッター前の明確な警告） */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-[11px] text-gray-400 tracking-wider leading-relaxed">
            【酒類販売管理者標識に基づく表示】<br />
            妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります。<br />
            飲酒運転は法律で禁止されています。お酒は適量を守って楽しく飲みましょう。
          </p>
        </div>

      </div>
    </div>
  );
}
