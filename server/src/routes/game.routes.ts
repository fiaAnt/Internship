import { Router } from 'express';
import { igdbFetch } from '../services/igdb.service.ts';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const gameId = Number(req.params.id);
        if (isNaN(gameId)) {
            return res.status(400).json({ error: 'Invalid game ID' });
        }

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
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'IGDB fetch failed' });
    }
});

export default router;
