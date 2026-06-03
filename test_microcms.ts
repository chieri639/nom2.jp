import { getSakeDetail, getBreweries, getSakes, getBreweryByOldId } from './src/lib/microcms';

async function main() {
  try {
    console.log("nihonshu L-kRK2w7:");
    try {
      const s = await getSakeDetail("L-kRK2w7");
      console.log(s ? `Found: ${s.id}` : "Not found");
    } catch(e) { console.log("Error:", e.message); }

    console.log("nihonshu l-krk2w7:");
    try {
      const s = await getSakeDetail("l-krk2w7");
      console.log(s ? `Found: ${s.id}` : "Not found");
    } catch(e) { console.log("Error:", e.message); }

    console.log("brewery kikumasamune:");
    const b1 = await getBreweryByOldId("kikumasamune");
    console.log(b1 ? `Found by oldId: ${b1.id} (oldId: ${b1.oldId})` : "Not found by oldId");

    const res = await getBreweries({ filters: `oldId[equals]kikumasamune` });
    console.log("Raw query res count:", res.contents?.length);
  } catch (err) {
    console.error(err);
  }
}
main();
