const fs = require('fs');
const path = require('path');

const filesToClean = [
    'import_shop.csv',
    'import_brand.csv',
    'import_brewery.csv',
    'import_article.csv',
    'import_sake.csv'
];

console.log("Fixing Content IDs to be strictly lowercase...");

for (const file of filesToClean) {
    const filePath = path.join(__dirname, '..', 'src', 'data', file);
    if (!fs.existsSync(filePath)) continue;

    console.log(`Checking ${file}...`);
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    
    let changed = 0;
    // Process each line. We only want to lowercase the FIRST column (id) before the first comma.
    for (let i = 1; i < lines.length; i++) { // Skip header at i=0
        if (!lines[i]) continue;
        
        // Find the first comma
        const firstComma = lines[i].indexOf(',');
        if (firstComma > 0) {
            const id = lines[i].substring(0, firstComma);
            const lowerId = id.toLowerCase();
            if (id !== lowerId) {
                lines[i] = lowerId + lines[i].substring(firstComma);
                changed++;
            }
        }
    }

    if (changed > 0) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log(`  -> Fixed ${changed} IDs in ${file}!`);
    } else {
        console.log(`  -> All IDs are already lowercase.`);
    }
}

console.log("\nDone! All IDs are now lowercase. Please upload them again.");
