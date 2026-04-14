const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting Sake Scraper (Full Detail Extraction)...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('https://nom2.jp/nihonshu', { waitUntil: 'networkidle2' });
    
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
                // We'll just grab the first large STUDIO image we find
                const imgMatch = html.match(/https:\/\/storage\.googleapis\.com\/studio-design-asset-files\/[^"'\s\?]+\.(jpg|png|webp|jpeg)/i);
                const imageUrl = imgMatch ? imgMatch[0] : "";
                
                // For structure, typically on detail page: 
                // There's a big title, a brewery, a price. We can get it from text heuristically.
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                
                // Finding Price
                const priceLineIndex = lines.findIndex(l => l.includes('¥') || l.includes('税込'));
                const priceRaw = priceLineIndex !== -1 ? lines[priceLineIndex] : "";
                const priceText = priceRaw.replace(/[^0-9]/g, '');
                const price = !!priceText ? parseInt(priceText, 10) : 0;
                
                // Titles and breweries are often at the top. Let's look around the price.
                // Usually: Brewery -> Title -> Price OR Title -> Brewery -> Price
                let name = "Unknown Title";
                let brewery = "Unknown Brewery";
                
                if (priceLineIndex > 1) {
                    name = lines[priceLineIndex - 1]; // Line right before price
                    brewery = lines[priceLineIndex - 2]; // Line before that
                }
                
                // Description is likely everything after price until standard footer text
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

    // Save
    fs.writeFileSync('./src/data/extracted_sake.json', JSON.stringify(results, null, 2), 'utf8');
    console.log(`Successfully saved ${results.length} records to src/data/extracted_sake.json`);

    await browser.close();
})();
