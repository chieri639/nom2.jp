import { getArticles, getSakes } from '@/lib/microcms';
import HomeClient from './HomeClient';

export const revalidate = 0;

export default async function Nom2jpClassicPage() {
    let articles: any[] = [];
    let sakes: any[] = [];
    
    try {
        // Fetch latest 3 articles
        const resArticles = await getArticles({ limit: 3 });
        articles = resArticles.contents || [];
    } catch (e) {
        console.warn('microCMS (article) missing or error:', e);
    }

    try {
        // Fetch popular or selected sakes
        const resSakes = await getSakes({ limit: 3 });
        sakes = resSakes.contents || [];
    } catch (e) {
        console.warn('microCMS (sake) missing or error:', e);
    }

    return <HomeClient articles={articles} sakes={sakes} />;
}
