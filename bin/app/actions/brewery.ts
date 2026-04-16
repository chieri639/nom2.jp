'use server';

import { getBreweries, BREWERY } from '@/lib/microcms';

const REGION_MAP: Record<string, string[]> = {
  '北海道': ['北海道'],
  '東北': ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '近畿': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州・沖縄': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
};

export async function fetchBreweriesAction({
  q = '',
  region = 'すべて',
  offset = 0,
  limit = 20,
}: {
  q?: string;
  region?: string;
  offset?: number;
  limit?: number;
}) {
  const queries: any = {
    limit,
    offset,
    // orders: '-createdAt', // 最新順
  };

  if (q) {
    queries.q = q;
  }

  // フィルタの構築
  const filters: string[] = [];

  if (region !== 'すべて' && REGION_MAP[region]) {
    const prefs = REGION_MAP[region];
    // prefecture[equals]A[or]prefecture[equals]B...
    const prefFilter = prefs.map(pref => `prefecture[equals]${pref}`).join('[or]');
    filters.push(`(${prefFilter})`);
  }

  if (filters.length > 0) {
    queries.filters = filters.join('[and]');
  }

  try {
    const result = await getBreweries(queries);
    return {
      success: true,
      data: result.contents,
      totalCount: result.totalCount,
      hasMore: offset + limit < result.totalCount,
    };
  } catch (error) {
    console.error('Fetch breweries error:', error);
    
    // 【フォールバック】API取得失敗時にモックデータを返し、UIの確認を可能にする
    if (offset === 0) {
      const mockData: BREWERY[] = Array.from({ length: 8 }).map((_, i) => ({
        id: `mock-${i}`,
        name: `【サンプル】酒蔵サンプル ${i + 1}`,
        content: "これは読み込みテスト用のサンプルテキストです。ネットワークエラー等の理由で microCMS からデータを取得できなかった場合に表示されています。",
        imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&q=80&w=800",
        prefecture: i % 2 === 0 ? "北海道" : "青森県",
        address: "サンプル県サンプル市サンプル町 1-2-3",
        oldId: `old-${i}`
      }));

      return {
        success: true,
        data: mockData,
        totalCount: 100,
        hasMore: true,
        isMock: true
      };
    }

    return {
      success: false,
      data: [],
      totalCount: 0,
      hasMore: false,
      error: 'データの取得に失敗しました',
    };
  }
}
