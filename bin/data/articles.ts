export interface Article {
  title: string;
  summary: string;
  path: string;
  image: string;
  category: string;
  tagColor: string;
}

export const articles: Article[] = [
  {
    title: "【2026年最新】北海道の日本酒マップ！全14酒蔵を徹底紹介",
    summary: "かつての辛口一辺倒から、全国随一のプレミアム産地へと進化した北海道。道内の代表的な全14酒蔵の特徴をプロが徹底解説。",
    path: "/article/japan/hokkaido",
    image: "/images/hokkaido_sake_hero.png",
    category: "Regional Guide",
    tagColor: "#3498db"
  },
  {
    title: "【2026年最新】青森県の日本酒マップ！田酒・豊盃など代表銘柄",
    summary: "日本酒の「東の横綱」青森県。津軽・南部地方を代表する名酒蔵の特徴とお土産におすすめの銘柄を徹底解説します。",
    path: "/article/japan/aomori",
    image: "/images/aomori_sake_hero.png",
    category: "Regional Guide",
    tagColor: "#3498db"
  },
  {
    title: "おりがらみ日本酒とは？にごり酒との違いを徹底解説",
    summary: "おりがらみの魅力から、にごり酒との明確な違い、一番美味しい飲み方までを日本酒のプロが徹底解説します。",
    path: "/article/origarami-sake-guide",
    image: "/images/origarami_sake_hero_2.png",
    category: "Sake Guide",
    tagColor: "#e67e22"
  },
  {
    title: "和食と日本酒ペアリングの基本（同調と補完）",
    summary: "ユネスコ無形文化遺産の和食をもっと美味しく。お刺身や天ぷらに合わせる日本酒選びの基本「2つの方程式」をプロが解説します。",
    path: "/article/washoku-sake-pairing-part-1",
    image: "/images/washoku_pairing_hero_1.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  },
  {
    title: "和食ペアリングの真髄（だしの旨味と温度）",
    summary: "和食の要である「だしの旨味」と、日本酒特有の「お燗（温度変化）」がもたらす爆発的な旨味の相乗効果について解説します。",
    path: "/article/washoku-sake-pairing-part-2",
    image: "/images/washoku_pairing_hero_2.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  },
  {
    title: "四季の「旬」と「テロワール」を味わう（応用編）",
    summary: "春夏秋冬の旬の和食と季節の日本酒。そして「海の幸には海の酒」といった地産地消のテロワールの世界をご紹介します。",
    path: "/article/washoku-sake-pairing-part-3",
    image: "/images/washoku_pairing_hero_3.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  }
];
