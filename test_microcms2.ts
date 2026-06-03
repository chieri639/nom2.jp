import { getArticleDetail } from './src/lib/microcms';

async function main() {
  try {
    console.log("article zBn9CcDu:");
    try {
      const s = await getArticleDetail("zBn9CcDu");
      console.log(s ? `Found: ${s.id}` : "Not found");
    } catch(e) { console.log("Error uppercase:", e.message); }

    console.log("article zbn9ccdu:");
    try {
      const s = await getArticleDetail("zbn9ccdu");
      console.log(s ? `Found: ${s.id}` : "Not found");
    } catch(e) { console.log("Error lowercase:", e.message); }

  } catch (err) {
    console.error(err);
  }
}
main();
