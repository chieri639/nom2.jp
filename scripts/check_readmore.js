const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('https://nom2.jp/nihonshu', { waitUntil: 'networkidle2' });
    
    // Scroll to bottom
    await page.evaluate(async () => {
        window.scrollBy(0, document.body.scrollHeight);
    });
    
    // Wait for a bit
    await new Promise(r => setTimeout(r, 2000));
    
    // Look for anything that might be a button at the bottom
    const buttons = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('a, button, div'));
        return els.map(e => ({
            tag: e.tagName,
            class: e.className,
            text: e.innerText ? e.innerText.trim() : '',
            id: e.id,
            height: e.clientHeight,
            width: e.clientWidth
        }))
        .filter(b => b.text && b.text.length > 0 && b.text.length < 15 && b.height > 10 && b.width > 20)
        .slice(-20); // Get the last 20 elements that have short text (likely bottom of page)
    });
    
    console.log('Possible buttons near bottom:', buttons);
    
    await page.screenshot({ path: 'scripts/readmore_screenshot.png', fullPage: true });

    await browser.close();
})();
