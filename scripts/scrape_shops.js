const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeList(page, listUrl, pathPrefix) {
    console.log(`Extracting URLs from ${listUrl}`);
    await page.goto(listUrl, { waitUntil: 'networkidle2' });
    
    // Vigorous scroll to load all pagination
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let lastHeight = 0;
            let noChangeCount = 0;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, 500);
                totalHeight += 500;
                if (scrollHeight === lastHeight) {
                    noChangeCount++;
                } else {
                    noChangeCount = 0;
                    lastHeight = scrollHeight;
                }
                if (noChangeCount >= 20) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    const urls = await page.evaluate((prefix) => {
        const links = Array.from(document.querySelectorAll('a'));
        return Array.from(new Set(
            links.map(a => a.href)
            .filter(href => href.includes(prefix) && href.length > `https://nom2.jp${prefix}`.length)
        ));
    }, pathPrefix);
    
    console.log(`Found ${urls.length} urls for ${pathPrefix}`);
    return urls;
}

(async () => {
    console.log('Starting Shop Scraper...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    const shopUrls = await scrapeList(page, 'https://nom2.jp/shop/search', '/shop/');
    const shopResults = [];
    
    for (let i = 0; i < shopUrls.length; i++) {
        const url = shopUrls[i];
        if (url === 'https://nom2.jp/shop/search') continue;
        console.log(`Scraping Shop [${i + 1}/${shopUrls.length}] ${url}`);
        
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            
            const detail = await page.evaluate(() => {
                const text = document.body.innerText;
                const html = document.body.innerHTML;
                
                const imgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?]+\.(jpg|png|webp|jpeg)/i);
                const imageUrl = imgMatch ? imgMatch[0] : "";
                
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                const contentLines = lines.filter(l => !l.includes('MENU LIST') && !l.includes('HOME') && !l.includes('FOLLOW US'));
                
                const name = contentLines.length > 0 ? contentLines[0] : "Unknown";
                
                return { name, content: contentLines.join('\n'), imageUrl };
            });

            shopResults.push({
                url,
                id: url.split('/').pop(),
                name: detail.name,
                content: detail.content,
                image: detail.imageUrl
            });
        } catch (e) {
            console.error(`Failed to scrape ${url}: ${e.message}`);
        }
    }
    
    fs.writeFileSync('./src/data/extracted_shops.json', JSON.stringify(shopResults, null, 2), 'utf8');
    console.log(`Saved ${shopResults.length} shops.`);

    await browser.close();
})();
