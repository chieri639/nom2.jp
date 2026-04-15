export async function fetchRakutenSakes(keyword: string) {
  const appId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID;
  const affiliateId = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID;
  if (!appId) return [];

  const params = new URLSearchParams({
    format: 'json',
    keyword: `${keyword} 日本酒`,
    applicationId: appId,
    affiliateId: affiliateId || '',
    hits: '3',
    imageFlag: '1'
  });

  try {
    const res = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${params.toString()}`);
    if (!res.ok) throw new Error('Rakuten API fetch failed');
    const data = await res.json();
    return data.Items.map((item: any) => ({
      id: item.Item.itemCode,
      name: item.Item.itemName,
      price: item.Item.itemPrice,
      imageUrl: item.Item.mediumImageUrls[0]?.imageUrl?.replace('?_ex=128x128', ''),
      affiliateUrl: item.Item.affiliateUrl,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
