const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        console.log('Navigating to nom2.jp/nihonshu...');
        await page.goto('https://nom2.jp/nihonshu', { waitUntil: 'networkidle2' });
        
        console.log('Extracting body...');
        const bodyText = await page.evaluate(() => {
            return document.body.innerText.substring(0, 1000);
        });
        
        console.log("BODY START:\n" + bodyText + "\nBODY END");
        
        await browser.close();
    } catch (e) {
        console.error('Error during scraping:', e);
    }
})();
