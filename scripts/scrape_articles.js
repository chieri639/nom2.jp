const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting Article Scraper (Full Detail Extraction)...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('https://nom2.jp/article', { waitUntil: 'networkidle2' });
    
    // Auto-scroll loop
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    console.log('Extracting detail URLs...');
    const listUrls = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return Array.from(new Set(
            links.map(a => a.href)
            .filter(href => href.includes('/article/') && href.length > 'https://nom2.jp/article/'.length)
        ));
    });

    console.log(`Found ${listUrls.length} detailed URLs.`);
    
    const results = [];
    
    for (let i = 0; i < listUrls.length; i++) {
        const url = listUrls[i];
        console.log(`Scraping [${i + 1}/${listUrls.length}] ${url}`);
        const idMatch = url.match(/\/article\/([^/]+)/);
        const id = idMatch ? idMatch[1] : `unknown_${i}`;

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            
            const detail = await page.evaluate(() => {
                const text = document.body.innerText;
                const html = document.body.innerHTML;
                
                // Main image
                const imgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?]+\.(jpg|png|webp|jpeg)/i);
                const imageUrl = imgMatch ? imgMatch[0] : "";
                
                // Articles usually have the Title as the first large text element, or at least before "HOME"
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                
                let title = "Unknown Title";
                let category = "Article";
                let content = "";
                
                // Let's filter out standard headers
                const contentLines = lines.filter(l => !l.includes('MENU LIST') && !l.includes('HOME') && !l.includes('FOLLOW US'));
                
                if (contentLines.length > 0) {
                    title = contentLines[0]; // Title is usually the top
                }
                if (contentLines.length > 1) {
                    category = contentLines[1].length < 20 ? contentLines[1] : "Article"; // Category is short
                }
                
                if (contentLines.length > 2) {
                    content = contentLines.slice(2).join('\n');
                    // clean up bottom footer cruft
                    content = content.split('関連記事')[0].split('この記事をシェアする')[0].trim();
                }

                return { title, category, content, imageUrl };
            });

            results.push({
                id,
                title: detail.title,
                category: detail.category,
                content: detail.content,
                image: detail.imageUrl
            });
        } catch (e) {
            console.error(`Failed to scrape ${url}: ${e.message}`);
        }
    }

    // Save
    fs.writeFileSync('./src/data/extracted_articles.json', JSON.stringify(results, null, 2), 'utf8');
    console.log(`Successfully saved ${results.length} records to src/data/extracted_articles.json`);

    await browser.close();
})();
