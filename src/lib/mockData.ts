export type Sake = {
    id: number;
    name: string;
    brewery: string;
    matchScore: number;
    flavor: string;
    price: string;
    description: string;
    aiReason: string;
    tags: string[];
    affiliateUrl: string;
};

export const MOCK_SAKES: Sake[] = [
    {
        id: 1,
        name: "獺祭 純米大吟醸 磨き二割三分",
        brewery: "旭酒造 (山口県)",
        matchScore: 98,
        flavor: "フルーティー / やや甘口",
        price: "¥5,500",
        description: "華やかな香りと、蜂蜜のようなきれいな甘み。飲み込んだ後の余韻は長く、純米大吟醸ならではの繊細さを極めた逸品です。",
        aiReason: "「フルーティー」で「飲みやすい」お酒をお探しのあなたに最適。初心者から通まで唸らせる完成度です。",
        tags: ["フルーティー", "大吟醸", "プレゼント", "初心者向け"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/獺祭+磨き二割三分"
    },
    {
        id: 2,
        name: "久保田 萬寿",
        brewery: "朝日酒造 (新潟県)",
        matchScore: 95,
        flavor: "淡麗 / 辛口",
        price: "¥4,000",
        description: "柔らかく、ふっくらとした味わい。冷やしても常温でも楽しめる、万能な食中酒として圧倒的な人気を誇ります。",
        aiReason: "「辛口」かつ「食事に合う」という条件に完璧にマッチ。特に刺身や寿司との相性が抜群です。",
        tags: ["辛口", "食中酒", "有名銘柄", "淡麗"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/久保田+萬寿"
    },
    {
        id: 3,
        name: "新政 No.6 X-type",
        brewery: "新政酒造 (秋田県)",
        matchScore: 92,
        flavor: "生酛 / 酸味あり",
        price: "¥3,800",
        description: "伝統的な生酛造りでありながら、モダンで洗練された味わい。白ワインのような心地よい酸味が特徴です。",
        aiReason: "「酸味」や「新しい味わい」を求めるならこれ。日本酒の常識を覆すようなフレッシュな体験ができます。",
        tags: ["モダン", "酸味", "個性的", "入手困難"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/新政+No.6+X-type"
    },
    {
        id: 4,
        name: "十四代 本丸 秘伝玉返し",
        brewery: "高木酒造 (山形県)",
        matchScore: 97,
        flavor: "フルーティー / 芳醇旨口",
        price: "¥30,000~",
        description: "入手困難な日本酒の代名詞。立ち香は華やかで、含むと上品な甘みと旨みが口いっぱいに広がります。",
        aiReason: "特別なお祝いや、最高峰の日本酒体験を求めるなら間違いなくこれ。圧倒的な満足感が得られます。",
        tags: ["プレミア", "芳醇", "有名銘柄", "ギフト"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/十四代+本丸"
    },
    {
        id: 5,
        name: "鳳凰美田 完熟もも",
        brewery: "小林酒造 (栃木県)",
        matchScore: 89,
        flavor: "リキュール / 超甘口",
        price: "¥1,650",
        description: "桃をそのまま食べているかのようなジューシーで濃厚な味わい。日本酒ベースのリキュールで、デザート感覚で楽しめます。",
        aiReason: "日本酒が苦手な方や、甘いお酒が好きな方へ。とろりとした食感が病みつきになります。",
        tags: ["甘口", "リキュール", "果実酒", "デザート"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/鳳凰美田+完熟もも"
    },
    {
        id: 6,
        name: "醸し人九平次 純米大吟醸 山田錦",
        brewery: "萬乗醸造 (愛知県)",
        matchScore: 91,
        flavor: "モダン / 酸味と旨み",
        price: "¥2,200",
        description: "ワイングラスで楽しむために生まれたような日本酒。エレガントな酸味と米の旨みのバランスが絶妙です。",
        aiReason: "和食だけでなく、フレンチやイタリアンとも合わせたい一本。新しい日本酒のスタイルを感じられます。",
        tags: ["モダン", "ワイングラス", "食中酒", "おしゃれ"],
        affiliateUrl: "https://search.rakuten.co.jp/search/mall/醸し人九平次+山田錦"
    }
];
