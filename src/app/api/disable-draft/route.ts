import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Draft Mode 解除エンドポイント
 *
 * プレビュー確認後に通常表示に戻すために使用します。
 * アクセスするだけで Draft Mode Cookie が削除され、トップページへリダイレクトします。
 *
 * 使用例: https://stg.nom2.jp/api/disable-draft
 */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect('/');
}
