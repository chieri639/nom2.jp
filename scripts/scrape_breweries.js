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
    console.log('Starting Brewery & Brand Scraper...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Scrape Breweries
    const breweryUrls = await scrapeList(page, 'https://nom2.jp/brewery', '/brewery/');
    const breweryResults = [];
    
    for (let i = 0; i < breweryUrls.length; i++) {
        const url = breweryUrls[i];
        if (url.includes('/brand')) continue; // Skip brand links found on brewery page
        console.log(`Scraping Brewery [${i + 1}/${breweryUrls.length}] ${url}`);
        
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            
            const detail = await page.evaluate(() => {
                const text = document.body.innerText;
                const html = document.body.innerHTML;
                
                // Extract main image
                const imgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?]+\.(jpg|png|webp|jpeg)/i);
                const imageUrl = imgMatch ? imgMatch[0] : "";
                
                // Extract Info
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                const contentLines = lines.filter(l => !l.includes('MENU LIST') && !l.includes('HOME') && !l.includes('FOLLOW US'));
                
                // Typical studio structure: Name is at the top
                const name = contentLines.length > 0 ? contentLines[0] : "Unknown";
                
                return { name, content: contentLines.join('\n'), imageUrl };
            });

            breweryResults.push({
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
    
    fs.writeFileSync('./src/data/extracted_breweries.json', JSON.stringify(breweryResults, null, 2), 'utf8');
    console.log(`Saved ${breweryResults.length} breweries.`);

    // Scrape Brands
    const brandUrls = await scrapeList(page, 'https://nom2.jp/brewery/brand', '/brewery/brand/');
    const brandResults = [];
    
    for (let i = 0; i < brandUrls.length; i++) {
        const url = brandUrls[i];
        console.log(`Scraping Brand [${i + 1}/${brandUrls.length}] ${url}`);
        
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

            brandResults.push({
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
    
    fs.writeFileSync('./src/data/extracted_brands.json', JSON.stringify(brandResults, null, 2), 'utf8');
    console.log(`Saved ${brandResults.length} brands.`);

    await browser.close();
})();
