const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function jsToCSV(data, fields) {
    if (data.length === 0) return '';
    const header = fields.join(',') + '\n';
    const rows = data.map(item => {
        return fields.map(field => {
            let val = item[field] === undefined ? '' : String(item[field]);
            if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                val = `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        }).join(',');
    }).join('\n');
    return header + rows;
}

async function scrapeHtmlForFiles() {
    console.log("Starting safe HTML extraction...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    const categories = [
        { file: 'extracted_shops.json', type: 'shop', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_brands.json', type: 'brand', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_breweries.json', type: 'brewery', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_articles.json', type: 'article', fields: ['id', 'title', 'category', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_sake.json', type: 'sake', fields: ['id', 'name', 'brewery', 'price', 'description', 'imageUrl', 'oldId'] }
    ];

    for (const cat of categories) {
        const filePath = path.join(__dirname, '..', 'src', 'data', cat.file);
        if (!fs.existsSync(filePath)) continue;

        console.log(`\n--- Processing ${cat.type} ---`);
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const outData = [];

        // Reduce range if you want to test quickly, otherwise process all
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const url = item.url || `https://nom2.jp/${cat.type === 'sake' ? 'nihonshu' : cat.type}/${item.id}`;
            if (url.includes('/search') || url.includes('/category')) continue;

            console.log(`[${i+1}/${data.length}] Scraping HTML safely: ${url}`);
            
            let htmlContent = '';
            try {
                // Wait for network idle to ensure JS framework loads and hydrates elements
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
                // Extra sleep to ensure Studio.design finishes mounting components
                await new Promise(r => setTimeout(r, 2000));
                
                htmlContent = await page.evaluate(() => {
                    // Remove scripts to avoid breaking React when dangerouslySetInnerHTML is used
                    document.querySelectorAll('script, noscript').forEach(n => n.remove());
                    
                    // No dangerous DOM deletion here - just grab the rendered content!
                    // Studio usually mounts inside <div id="app">.
                    let container = document.getElementById('app') || document.body;
                    return container.innerHTML;
                });
                
                // Clean up excessive whitespace safely
                htmlContent = htmlContent.replace(/\s{2,}/g, ' ').replace(/\n/g, ' ').trim();
            } catch (e) {
                console.log(`  Failed to fetch HTML for ${url}: ${e.message}`);
                htmlContent = item.content || item.description || '';
            }

            const row = {
                id: item.id || `${cat.type}-${Math.random().toString(36).substring(2, 10)}`,
                oldId: item.id || '',
                imageUrl: item.image || item.imageUrl || '',
            };

            // Map fields based on schema
            if (cat.type === 'sake') {
                row.name = item.name || '';
                row.brewery = item.brewery || '';
                row.price = item.price || 0;
                row.description = htmlContent;
            } else if (cat.type === 'article') {
                row.title = item.title || item.name || '';
                row.category = item.category || 'nihonshu';
                row.content = htmlContent;
            } else {
                row.name = item.name || '';
                row.content = htmlContent;
            }

            outData.push(row);
        }

        const csvPath = path.join(__dirname, '..', 'src', 'data', `import_${cat.type}.csv`);
        fs.writeFileSync(csvPath, jsToCSV(outData, cat.fields), 'utf8');
        console.log(`Saved ${outData.length} records to ${csvPath}`);
    }

    await browser.close();
    console.log('\nAll categories finished scraping HTML!');
}

scrapeHtmlForFiles().catch(console.error);
