require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');

const SERVICE_ID = process.env.X_MICROCMS_SERVICE_ID;
const API_KEY = process.env.X_MICROCMS_API_KEY;

if (!SERVICE_ID || !API_KEY) {
    console.error('Error: X_MICROCMS_SERVICE_ID or X_MICROCMS_API_KEY is not defined in .env.local');
    process.exit(1);
}

const BASE_URL = `https://${SERVICE_ID}.microcms.io/api/v1`;

async function postData(endpoint, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-MICROCMS-API-KEY': API_KEY,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to POST to ${endpoint}: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
}

async function importDataset(filePath, endpoint, transformFn) {
    console.log(`\nImporting ${filePath} to /${endpoint} ...`);
    const fullPath = path.resolve(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return;
    }

    const unparsed = fs.readFileSync(fullPath, 'utf8');
    const items = JSON.parse(unparsed);
    console.log(`Found ${items.length} items to import.`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const payload = transformFn(item);
        
        try {
            await postData(endpoint, payload);
            successCount++;
            process.stdout.write(`\rProgress: ${successCount + errorCount}/${items.length} (Success: ${successCount}, Error: ${errorCount})`);
        } catch (e) {
            console.error(`\nError importing item ${i} (${item.id || item.name || item.title}):`, e);
            errorCount++;
        }
        
        // Wait 100ms between requests to avoid rate limits
        await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(`\nDone for ${endpoint}. Success: ${successCount}, Error: ${errorCount}`);
}

(async () => {
    console.log('Starting microCMS Import...');

    // 1. Sake
    await importDataset('src/data/extracted_sake.json', 'sake', (item) => ({
        name: item.name || '',
        brewery: item.brewery || '',
        price: item.price || 0,
        description: item.description || '',
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));

    // 2. Articles
    await importDataset('src/data/extracted_articles.json', 'article', (item) => ({
        title: item.title || '',
        category: item.category || '',
        content: item.content || '',
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));

    // 3. Breweries
    await importDataset('src/data/extracted_breweries.json', 'brewery', (item) => ({
        name: item.name || '',
        content: item.content || '',
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));

    // 4. Brands
    await importDataset('src/data/extracted_brands.json', 'brand', (item) => ({
        name: item.name || '',
        content: item.content || '',
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));

    // 5. Shops
    await importDataset('src/data/extracted_shops.json', 'shop', (item) => ({
        name: item.name || '',
        content: item.content || '',
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));

    console.log('\nAll imports completed!');
})();
