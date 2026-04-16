const API_KEY = '9jTt1rBZrk5OfQ9QL2MdwxjgAGDOq1qUAvMA';
const BASE_URL = 'https://nom2.microcms.io/api/v1';

async function testFetch() {
  const params = new URLSearchParams();
  params.set('limit', '20');
  params.set('orders', '-createdAt');
  
  const url = `${BASE_URL}/brewery?${params.toString()}`;
  console.log('Fetching:', url);
  
  try {
    const res = await fetch(url, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY },
      cache: 'no-store',
    });
    console.log('Status:', res.status);
    console.log('OK:', res.ok);
    const data = await res.json();
    console.log('Total Count:', data.totalCount);
    if (data.contents && data.contents.length > 0) {
      console.log('First Item Name:', data.contents[0].name);
    } else {
      console.log('No contents found.');
    }
  } catch (err) {
    console.error('Fetch failed with error:', err);
  }
}

testFetch();
