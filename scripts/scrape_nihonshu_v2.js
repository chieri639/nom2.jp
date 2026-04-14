const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting Sake Scraper v2 (With Read More clicking)...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // We scrape from /nihonshu as requested
    const targetUrl = 'https://nom2.jp/nihonshu';
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    
    // Auto-scroll and Read More click loop
    console.log('Scrolling and clicking Read More buttons...');
    
    let lastItemCount = 0;
    let unchangedCount = 0;
    
    while (unchangedCount < 10) { // 10 attempts of waiting ~2s each
        // Scroll down
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 1000));
        
        // Find and click buttons
        const buttons = await page.$$('button, div');
        let clicked = false;
        for (const btn of buttons) {
            try {
                const text = await page.evaluate(el => el.innerText ? el.innerText.toLowerCase() : '', btn);
                if ((text.includes('もっとみる') || 
                     text.includes('もっと見る') || 
                     text.includes('readmore') || 
                     text.includes('read more') ||
                     text.includes('load more') ||
                     text.includes('loadmore')) && 
                     text.length < 20) {
                    
                    // Use Puppeteer's native click which simulates a real mouse event!
                    await btn.click();
                    clicked = true;
                }
            } catch (e) {
                // Ignore stale elements
            }
        }
        
        if (clicked) {
            console.log('Clicked Load More! Waiting for new items...');
            await new Promise(r => setTimeout(r, 3000)); // give it time to load and render
        }

        const currentItemCount = await page.evaluate(() => {
            return document.querySelectorAll('a[href*="/nihonshu/"]').length;
        });
        
        if (currentItemCount === lastItemCount) {
            unchangedCount++;
        } else {
            console.log(`Item count increased: ${lastItemCount} -> ${currentItemCount}`);
            unchangedCount = 0;
            lastItemCount = currentItemCount;
        }
    }

    console.log('Extracting detail URLs...');
    const listUrls = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return Array.from(new Set(
            links.map(a => a.href)
            // Filter out internal links that match nihonshu items.
            // On /search usually items might link to /nihonshu/...
            .filter(href => href.includes('/nihonshu/') && href.length > 'https://nom2.jp/nihonshu/'.length)
        ));
    });

    console.log(`Found ${listUrls.length} detailed URLs.`);
    
    const results = [];
    
    for (let i = 0; i < listUrls.length; i++) {
        const url = listUrls[i];
        console.log(`Scraping [${i + 1}/${listUrls.length}] ${url}`);
        const idMatch = url.match(/\/nihonshu\/([^/]+)/);
        const id = idMatch ? idMatch[1] : `unknown_${i}`;

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            
            const detail = await page.evaluate(() => {
                const text = document.body.innerText;
                const html = document.body.innerHTML;
                
                // Extract image via regex (looking for standard STUDIO images)
                const imgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?]+\.(jpg|png|webp|jpeg)/i);
                const imageUrl = imgMatch ? imgMatch[0] : "";
                
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                
                const priceLineIndex = lines.findIndex(l => l.includes('¥') || l.includes('税込'));
                const priceRaw = priceLineIndex !== -1 ? lines[priceLineIndex] : "";
                const priceText = priceRaw.replace(/[^0-9]/g, '');
                const price = !!priceText ? parseInt(priceText, 10) : 0;
                
                let name = "Unknown Title";
                let brewery = "Unknown Brewery";
                
                if (priceLineIndex > 1) {
                    name = lines[priceLineIndex - 1];
                    brewery = lines[priceLineIndex - 2];
                }
                
                let description = "";
                if (priceLineIndex !== -1 && lines.length > priceLineIndex + 1) {
                    description = lines.slice(priceLineIndex + 1)
                        .join('\n')
                        .split('購入する')[0] 
                        .split('HOME')[0]
                        .replace(/MENU\s*MENU LIST[\s\S]*/g, '')
                        .trim();
                }

                return { name, brewery, price, imageUrl, description };
            });

            results.push({
                id,
                name: detail.name,
                brewery: detail.brewery,
                price: detail.price,
                image: detail.imageUrl,
                description: detail.description,
                category: "nihonshu"
            });
        } catch (e) {
            console.error(`Failed to scrape ${url}: ${e.message}`);
        }
    }

    fs.writeFileSync('./src/data/extracted_sake2.json', JSON.stringify(results, null, 2), 'utf8');
    console.log(`Successfully saved ${results.length} records to src/data/extracted_sake2.json`);

    await browser.close();
})();
