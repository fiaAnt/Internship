import { Router } from 'express';
import { igdbFetch } from '../services/igdb.service.ts';
import { z, ZodError } from 'zod';

const router = Router();

const gameIdSchema = z.object({
    id: z.string().regex(/^\d+$/),
});

const idsSchema = z.object({
    ids: z.array(z.string().regex(/^\d+$/)),
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = gameIdSchema.parse(req.params);
        const gameId = Number(id);

        const query = `
      fields 
        id,
        name,
        summary,
        storyline,
        cover.url,
        screenshots.url,
        videos.video_id,
        rating,
        first_release_date,
        updated_at,
        game_modes.name,
        genres.id,
        genres.name,
        platforms.id,
        platforms.name,
        themes.id,
        themes.name,
        player_perspectives.id,
        player_perspectives.name,
        involved_companies.company.name,
        age_ratings.rating,
        age_ratings.category,
        similar_games.id,
        similar_games.name,
        alternative_names.name,
        websites.url,
        websites.category,
        franchises.name;
      where id = ${gameId};
    `;

        const data = await igdbFetch('games', query);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(data[0]);
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

router.post('/by-ids', async (req, res) => {
    try {
        const { ids } = idsSchema.parse(req.body);

        if (ids.length === 0) return res.json([]);

        const numericIds = ids.map(Number);

        const query = `
      fields
        id,
        name,
        cover.url,
        rating,
        first_release_date,
        genres.id,
        genres.name;
      where id = (${numericIds.join(',')});
    `;

        const data = await igdbFetch('games', query);
        res.json(data);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid request body', details: err.issues });
        }
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});


export default router;
