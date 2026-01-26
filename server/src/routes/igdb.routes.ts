import { Router } from 'express';
import { igdbFetch } from '../services/igdb.service.ts';
import { buildIGDBQuery } from '../services/buildIGDBQuery.ts';

const router = Router();

router.get('/genres', async (_req, res) => {
    const data = await igdbFetch(
        'genres',
        'fields id, name; sort name asc; limit 300;'
    );
    res.json(data);
});

router.get('/platforms', async (_req, res) => {
    const data = await igdbFetch(
        'platforms',
        'fields id, name; sort name asc; limit 300;'
    );
    res.json(data);
});

router.get('/coming-soon', async (req, res) => {
    try {
        const offset = Number(req.query.offset ?? 0);
        const limit = 12;

        const now = Math.floor(Date.now() / 1000);
        const sixMonthsLater = now + 60 * 60 * 24 * 180;

        const query = `
      fields 
        id,
        name,
        cover.url,
        first_release_date,
        genres.id,
        genres.name;
      where 
        first_release_date > ${now}
        & first_release_date < ${sixMonthsLater}
        & cover != null;
      sort first_release_date asc;
      limit ${limit};
      offset ${offset};
    `;

        const data = await igdbFetch('games', query);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});



router.post('/games', async (req, res) => {
    try {
        const query = buildIGDBQuery(req.body);
        const data = await igdbFetch('games', query);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});

export default router;
