import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import { getServerSideSitemap } from 'next-sitemap';

import getAnimeSitemap from '@/services/api/sitemap/getAnimeSitemap';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const anime = await getAnimeSitemap();

    return getServerSideSitemap(
        anime.map((res) => ({
            loc: 'https://hikka.io/anime/' + res.slug,
            lastmod: format(
                toDate(res.updated_at * 1000),
                "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
            ),
            changefreq: 'weekly',
            priority: 1,
        })),
    );
}
