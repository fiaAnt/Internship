import { Router } from 'express';
import { igdbFetch } from '../services/igdb.service.ts';
import { buildIGDBQuery } from '../services/buildIGDBQuery.ts';
import { z, ZodError } from 'zod';

const router = Router();

const offsetQuerySchema = z.object({
    offset: z.string().regex(/^\d+$/).optional(),
});

const limitQuerySchema = z.object({
    limit: z.string().regex(/^\d+$/).optional(),
});

router.get('/genres', async (req, res) => {
    try {
        const { limit } = limitQuerySchema.parse(req.query);
        const limitNumber = limit ? Number(limit) : 300;

        const data = await igdbFetch(
            'genres',
            `fields id, name; sort name asc; limit ${limitNumber};`
        );
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res
                .status(400)
                .json({ error: 'Invalid query params', details: err.issues });
        }
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});

router.get('/platforms', async (req, res) => {
    try {
        const { limit } = limitQuerySchema.parse(req.query);
        const limitNumber = limit ? Number(limit) : 300;

        const data = await igdbFetch(
            'platforms',
            `fields id, name; sort name asc; limit ${limitNumber};`
        );
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res
                .status(400)
                .json({ error: 'Invalid query params', details: err.issues });
        }
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});

router.get('/coming-soon', async (req, res) => {
    try {
        console.log('Request query:', req.query);
        const { offset } = offsetQuerySchema.parse(req.query);
        const offsetNumber = offset ? Number(offset) : 0;
        console.log('Offset number:', offsetNumber);
        const LIMIT = 12;
        const SECONDS_IN_DAY = 60 * 60 * 24;
        const SIX_MONTHS_IN_DAYS = 180;

        const now = Math.floor(Date.now() / 1000);
        const sixMonthsLater = now + SECONDS_IN_DAY * SIX_MONTHS_IN_DAYS;

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
        & cover != null
        & genres != null;
      sort first_release_date asc;
      limit ${LIMIT};
      offset ${offsetNumber};
    `;
        console.log('IGDB Query:', query);
        const data = await igdbFetch('games', query);
        console.log('Response data length:', data?.length);
        res.json(data);
    } catch (err: unknown) {
        console.error('Full error:', err);
        if (err instanceof ZodError) {
            return res
                .status(400)
                .json({ error: 'Invalid query params', details: err.issues });
        }
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
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: 'Invalid request body',
                details: err.format(),
            });
        }
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});




export default router;
