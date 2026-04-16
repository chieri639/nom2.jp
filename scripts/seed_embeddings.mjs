import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from the project directory
dotenv.config({ path: '/Users/chieri.ishizaki.54/Documents/日本酒AI/.env.local' });

const MICROCMS_SERVICE_ID = process.env.X_MICROCMS_SERVICE_ID || 'nom2';
const MICROCMS_API_KEY = process.env.X_MICROCMS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!MICROCMS_API_KEY || !OPENAI_API_KEY) {
    console.error("Missing API keys in .env.local");
    process.exit(1);
}

const EMBEDDINGS_FILE = '/Users/chieri.ishizaki.54/Documents/日本酒AI/src/data/sake-embeddings.json';

async function fetchAllSakes() {
    let allSakes = [];
    let offset = 0;
    const limit = 100;

    console.log("Fetching sakes from microCMS...");
    while (true) {
        const url = `https://${MICROCMS_SERVICE_ID}.microcms.io/api/v1/sake?limit=${limit}&offset=${offset}`;
        const res = await fetch(url, {
            headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY }
        });
        const data = await res.json();
        allSakes = allSakes.concat(data.contents);
        if (allSakes.length >= data.totalCount) break;
        offset += limit;
    }
    console.log(`Fetched ${allSakes.length} sakes.`);
    return allSakes;
}

async function getEmbedding(text) {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            input: text.replace(/\n/g, ' '),
            model: 'text-embedding-3-small'
        })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.data[0].embedding;
}

async function run() {
    try {
        const sakes = await fetchAllSakes();
        const embeddings = [];

        console.log("Generating embeddings...");
        for (let i = 0; i < sakes.length; i++) {
            const sake = sakes[i];
            const textToEmbed = `${sake.name} ${sake.brewery} ${sake.description || ''}`;
            
            console.log(`[${i + 1}/${sakes.length}] Embedding: ${sake.name}`);
            const vector = await getEmbedding(textToEmbed);
            
            embeddings.push({
                id: sake.id,
                name: sake.name,
                brewery: sake.brewery,
                brand: sake.brand,
                imageUrl: sake.imageUrl,
                purchaseUrl: sake.purchaseUrl,
                price: sake.price,
                description: sake.description,
                vector: vector
            });

            // Rate limit check / throttle
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Ensure directory exists
        const dir = path.dirname(EMBEDDINGS_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(embeddings, null, 2));
        console.log(`Success! Saved ${embeddings.length} embeddings to ${EMBEDDINGS_FILE}`);
    } catch (err) {
        console.error("Error during seeding:", err);
    }
}

run();
