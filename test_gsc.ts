import { getArticleDetail } from './src/lib/microcms';

async function checkArticle(id: string) {
  try {
    const s = await getArticleDetail(id);
    console.log(`[Article] ${id}: Found ${s.id}`);
  } catch(e) {
    console.log(`[Article] ${id}: Error - ${e.message}`);
  }
}

async function main() {
  await checkArticle("l2IY5GPA");
  await checkArticle("l2iy5gpa");
  await checkArticle("U0IlvQ4G");
  await checkArticle("u0ilvq4g");
  await checkArticle("eG9e1cjp");
  await checkArticle("eg9e1cjp");
}
main();
