const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('https://nom2.jp/nihonshu', { waitUntil: 'networkidle2' });
    
    // Auto-scroll and Read More click loop
    console.log('Scrolling and clicking Read More buttons...');
    
    // We will do it from Puppeteer context to be able to use page.click() if needed, but page.evaluate is fine.
    const result = await page.evaluate(async () => {
        return new Promise((resolve) => {
            let lastItemCount = 0;
            let unchangedCount = 0;
            
            const timer = setInterval(() => {
                window.scrollBy(0, document.body.scrollHeight);
                
                // Find all buttons that say "Load more" or similar
                const buttons = Array.from(document.querySelectorAll('button, a'));
                const readMoreBtns = buttons.filter(el => {
                    const text = el.innerText ? el.innerText.toLowerCase() : '';
                    return (text.includes('もっとみる') || 
                            text.includes('もっと見る') || 
                            text.includes('readmore') || 
                            text.includes('read more') ||
                            text.includes('load more') ||
                            text.includes('loadmore')) && 
                            el.clientHeight > 0;
                });
                
                readMoreBtns.forEach(btn => {
                    try {
                        btn.click();
                    } catch(e) {}
                });

                const currentItemCount = document.querySelectorAll('a[href*="/nihonshu/"]').length;
                if (currentItemCount === lastItemCount) {
                    unchangedCount++;
                } else {
                    unchangedCount = 0;
                    lastItemCount = currentItemCount;
                    console.log('Item count increased to: ' + currentItemCount);
                }
                
                // Stop after 50 cycles (5 seconds) of no new items
                if (unchangedCount >= 50) {
                    clearInterval(timer);
                    resolve(lastItemCount);
                }
            }, 100);
        });
    });
    
    console.log('Finished scrolling. Total items found:', result);
    
    const listUrls = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return Array.from(new Set(
            links.map(a => a.href)
            .filter(href => href.includes('/nihonshu/') && href.length > 'https://nom2.jp/nihonshu/'.length)
        ));
    });
    
    console.log('Total extracted URLs:', listUrls.length);

    await browser.close();
})();
