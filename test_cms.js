const https = require('https');

const options = {
  hostname: 'nom2.microcms.io',
  port: 443,
  path: '/api/v1/article?limit=5',
  method: 'GET',
  headers: {
    'X-MICROCMS-API-KEY': '9jTt1rBZrk5OfQ9QL2MdwxjgAGDOq1qUAvMA'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("Total articles:", json.totalCount);
    console.log("Top 3 articles:");
    json.contents.slice(0, 3).forEach(c => console.log("- ID:", c.id, "| Title:", c.title));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
