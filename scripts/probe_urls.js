const puppeteer = require('puppeteer');

(async () => {
    const urlsToProbe = [
        'https://nom2.jp/brewery',
        'https://nom2.jp/brewery/brand',
        'https://nom2.jp/search',
        'https://nom2.jp/shop/search'
    ];

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    for (const url of urlsToProbe) {
        console.log(`\nProbing ${url}...`);
        try {
            await page.goto(url, { waitUntil: 'networkidle2' });
            
            // Vigorous infinite scroll
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
                        // Stop if we hit the bottom and it doesn't change for ~3 seconds
                        if (noChangeCount >= 30) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });

            // Extract all detailed links
            const listUrls = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a'));
                return Array.from(new Set(
                    links.map(a => a.href)
                    .filter(href => href.startsWith('https://nom2.jp/') && href !== window.location.href)
                ));
            });
            
            // Group by path to understand structure
            const paths = listUrls.map(u => u.split('nom2.jp')[1].split('/')[1]).filter(p => !!p);
            const pathCounts = paths.reduce((acc, p) => {
                acc[p] = (acc[p] || 0) + 1;
                return acc;
            }, {});
            
            console.log(`Found ${listUrls.length} total specific links.`);
            console.log('Path distribution:', pathCounts);
        } catch (e) {
            console.error(`Error on ${url}:`, e);
        }
    }
    
    await browser.close();
})();
