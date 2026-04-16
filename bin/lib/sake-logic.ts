// 日本酒のキーワード抽出と類似度計算ロジック

export const SAKE_KEYWORDS = {
  TASTE: ['フルーティー', 'フルーティ', '辛口', '甘口', '旨味', '旨み', 'コク', 'キレ', '酸味', 'フレッシュ', '芳醇', '淡麗'],
  STYLE: ['純米大吟醸', '純米吟醸', '純米', '大吟醸', '吟醸', '本醸造', '生酒', '原酒', 'にごり'],
  SCENE: ['食中酒', 'プレゼント', 'ギフト', '贈り物', '初心者', 'モダン', 'クラシック', 'ペアリング'],
  TEMP: ['冷やし', '常温', 'ぬる燗', '熱燗', 'お燗']
};

export type SakeData = {
  id: string;
  name: string;
  brewery: string;
  brand?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  purchaseUrl?: string;
  prefecture?: string;
  oldId?: string;
};

/**
 * テキストからキーワードを抽出する
 */
export function extractKeywords(text: string): string[] {
  if (!text) return [];
  const found: string[] = [];
  const allKeywords = Object.values(SAKE_KEYWORDS).flat();
  
  for (const kw of allKeywords) {
    if (text.includes(kw)) {
      found.push(kw);
    }
  }
  return [...new Set(found)];
}

/**
 * 2つのお酒の類似度を計算する
 */
export function calculateSimilarity(base: SakeData, target: SakeData) {
  const baseText = `${base.name} ${base.description || ''}`;
  const targetText = `${target.name} ${target.description || ''}`;
  
  const baseKeywords = extractKeywords(baseText);
  const targetKeywords = extractKeywords(targetText);
  
  const matches = baseKeywords.filter(kw => targetKeywords.includes(kw));
  
  // マッチした単語の種類によって重み付け
  let score = 0;
  const matchDetails: string[] = [];
  
  for (const kw of matches) {
    if (SAKE_KEYWORDS.TASTE.includes(kw)) {
      score += 2;
      matchDetails.push(`味わいが「${kw}」`);
    } else if (SAKE_KEYWORDS.STYLE.includes(kw)) {
      score += 1.5;
      matchDetails.push(`スタイルが「${kw}」`);
    } else if (SAKE_KEYWORDS.SCENE.includes(kw)) {
      score += 1.2;
      matchDetails.push(`「${kw}」に向いている`);
    } else {
      score += 1;
      matchDetails.push(kw);
    }
  }

  // 酒蔵や都道府県の一致も加点（もしデータがあれば）
  if (base.prefecture && base.prefecture === target.prefecture) {
    score += 1;
    matchDetails.push(`同じ${base.prefecture}のお酒`);
  }

  return {
    score,
    similarPoints: matchDetails.slice(0, 3)
  };
}

/**
 * 回答キーワード（ユーザー入力）に基づいてお酒をスコアリングする
 */
export function scoreByKeywords(keywords: string[], sake: SakeData) {
  if (keywords.length === 0) return 0;
  
  const sakeText = `${sake.name} ${sake.description || ''}`;
  let score = 0;
  
  for (const kw of keywords) {
    // ユーザー回答のキーワードが説明文に含まれているか
    if (sakeText.includes(kw)) {
      score += 2;
    }
    
    // カテゴリごとの類義語対応（例：「フルーティ」と「フルーティー」）
    if (kw === 'フルーティ' && sakeText.includes('フルーティー')) score += 1.5;
    if (kw === '甘口' && sakeText.includes('旨口')) score += 1;
  }
  
  return score;
}
