import { NextResponse } from 'next/server';
import { scrapeAllEvents } from '@/lib/event-scraper';
import { searchGoogleEvents } from '@/lib/google-search-events';
import { getArticles, writeArticleEvent, ARTICLE } from '@/lib/microcms';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // セキュリティチェック (Vercel Cron実行ヘッダー、またはローカル検証用のクエリパラメータ)
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const bypass = url.searchParams.get('bypass') === 'true';

  if (process.env.NODE_ENV === 'production' && !bypass && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting Sake Event Scraping batch job (Article integration)...');

    // 1. 各ソースからデータを並行取得
    const [rssEvents, googleEvents] = await Promise.all([
      scrapeAllEvents(),
      searchGoogleEvents()
    ]);

    const combinedEvents = [...rssEvents, ...googleEvents];
    console.log(`Fetched ${rssEvents.length} RSS events, ${googleEvents.length} Google Search events.`);

    // 2. 既存の保存データ(categoryがeventのもの)を取得（重複更新の確認用）
    const existingRes = await getArticles({
      filters: 'category[equals]event',
      limit: 100
    });
    const existingEvents: ARTICLE[] = existingRes.contents || [];
    console.log(`Existing DB event count: ${existingEvents.length}`);

    // 重複チェック用マップ
    // キー: タイトルからスペース・記号を取り除いた前方15文字 + 開催日
    const normalizeKey = (title: string, date: string) => {
      const cleanTitle = title.replace(/[\s\s　\[\]【】()（）!-]/g, '').slice(0, 15);
      return `${cleanTitle}-${date || 'no-date'}`;
    };

    const dbMap = new Map<string, ARTICLE>();
    existingEvents.forEach(e => {
      dbMap.set(normalizeKey(e.title, e.eventDate || ''), e);
    });

    let newCount = 0;
    let updateCount = 0;

    // 3. データを1件ずつ判定して microCMS へ書き込み
    for (const event of combinedEvents) {
      // 開催日がない、またはタイトルが空のものはスキップ
      if (!event.title || !event.date) continue;

      const key = normalizeKey(event.title, event.date);
      const existing = dbMap.get(key);

      const payload = {
        title: event.title,
        category: 'event',
        content: event.description || '', // 通常記事の本文としてディスクリプションを設定
        imageUrl: event.imageUrl || existing?.imageUrl || '',
        oldId: existing?.oldId || `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        // イベント用カスタムメタデータ
        eventDate: event.date,
        eventDateLabel: event.dateLabel,
        eventLocation: event.location || existing?.eventLocation || '',
        eventUrl: event.eventUrl,
        eventSource: event.source,
        eventOrganizer: event.organizer || existing?.eventOrganizer || '',
      };

      try {
        if (existing) {
          // すでに存在する場合は内容を更新
          await writeArticleEvent({
            ...payload,
            id: existing.id
          });
          updateCount++;
        } else {
          // 新規登録
          await writeArticleEvent(payload);
          newCount++;
        }
        // microCMSのAPIレート制限を考慮し、微小ウェイトを置く
        await new Promise(resolve => setTimeout(resolve, 150));
      } catch (err) {
        console.error(`Failed to write event to article "${event.title}":`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scraping completed. Added ${newCount} new events, updated ${updateCount} events inside Articles.`
    });
  } catch (err: any) {
    console.error('Cron Event Scraping Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
