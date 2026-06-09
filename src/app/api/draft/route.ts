import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

/**
 * microCMS 画面プレビュー用エンドポイント
 *
 * microCMS の「画面プレビュー」ボタンから呼ばれ、
 * Next.js の Draft Mode を有効化したうえで記事詳細ページへリダイレクトします。
 *
 * 想定 URL:
 *   /api/draft?secret=<SECRET>&id=<CONTENT_ID>&draftKey=<DRAFT_KEY>&contentType=article
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const id = searchParams.get('id');
  const draftKey = searchParams.get('draftKey');
  const contentType = searchParams.get('contentType') || 'article';

  // ---------- バリデーション ----------

  // secret が未設定 or 一致しない場合は拒否
  const expectedSecret = process.env.DRAFT_MODE_SECRET;
  if (!expectedSecret) {
    return new Response(
      'DRAFT_MODE_SECRET 環境変数が設定されていません。Vercel の環境変数に DRAFT_MODE_SECRET を追加してください。',
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return new Response('Invalid secret', { status: 401 });
  }

  if (!id) {
    return new Response('id パラメータが必要です', { status: 400 });
  }

  if (!draftKey) {
    return new Response('draftKey パラメータが必要です', { status: 400 });
  }

  // ---------- Draft Mode 有効化 ----------
  const draft = await draftMode();
  draft.enable();

  // ---------- コンテンツタイプに応じたリダイレクト先 ----------
  const pathMap: Record<string, string> = {
    article: `/article/${id}`,
    sake: `/nihonshu/${id}`,
    brewery: `/brewery/${id}`,
    brand: `/brand/${id}`,
    shop: `/shop/${id}`,
  };

  const basePath = pathMap[contentType] || `/article/${id}`;
  redirect(`${basePath}?draftKey=${draftKey}`);
}
