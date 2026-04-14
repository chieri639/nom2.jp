process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const https = require('https');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchHtml(res.headers.location).then(resolve).catch(reject);
            }
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => resolve(body));
        }).on('error', reject);
    });
}

function cleanTitle(title) {
    if (!title) return '';
    return title.replace(/【nom[ 　]*×[ 　]*nom】/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

async function updateFile(filePath, isSake = false) {
    console.log(`Processing ${filePath}...`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const batchSize = 10;
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        await Promise.all(batch.map(async (item) => {
            try {
                // Determine URL
                let targetUrl = item.url;
                if (!targetUrl && item.id) {
                    if (filePath.includes('sake')) targetUrl = `https://nom2.jp/nihonshu/${item.id}`;
                    // add other fallbacks if needed
                }
                
                const html = await fetchHtml(targetUrl);
                
                // Extract real title
                const titleMatch = html.match(/<title>(.*?)<\/title>/);
                if (titleMatch && titleMatch[1]) {
                    // For sake, the name was completely wrong. For articles, it might be fine, but let's refresh them all securely!
                    item.name = cleanTitle(titleMatch[1]);
                    if (filePath.includes('article') && item.title) {
                        item.title = cleanTitle(titleMatch[1]);
                    }
                }

                // Extract real image (prioritize studio-cms-assets)
                const cmsImgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-cms-assets\/[^"'\s\?\>]+(\.jpg|\.png|\.webp|\.jpeg)/i);
                if (cmsImgMatch) {
                    item.image = cmsImgMatch[0];
                } else {
                    // fallback to any image that is not the site logo
                    const anyImgMatches = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?\>]+(\.jpg|\.png|\.webp|\.jpeg)/gi) || [];
                    const filtered = anyImgMatches.filter(u => !u.includes('889affa7'));
                    if (filtered.length > 0) {
                        item.image = filtered[0];
                    } else if (item.image && item.image.includes('889affa7')) {
                        item.image = ''; // clearer to have empty than wrong logo
                    }
                }
            } catch (e) {
                console.log(`Failed fetching ${item.url}: ${e.message}`);
            }
        }));
        console.log(`  Processed ${Math.min(i + batchSize, data.length)} / ${data.length}`);
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Done updating ${filePath}`);
}

async function run() {
    await updateFile('src/data/extracted_sake.json');
    
    // Now regenerate CSVs
    console.log('\nNow regenerating CSVs...');
    require('./generate_csvs.js'); // Assuming it's in the same directory, but let's run it natively
}

run();
