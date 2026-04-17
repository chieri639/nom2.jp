const { getShops } = require('./src/lib/microcms');

async function test() {
  try {
    const res = await getShops({ limit: 1 });
    console.log(JSON.stringify(res.contents[0], null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
