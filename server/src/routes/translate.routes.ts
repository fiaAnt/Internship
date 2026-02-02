import { Router } from 'express';
import { translateFields } from '../services/translate.service.ts';

const router = Router();

router.post('/cards/games', async (req, res) => {
    try {
        console.log('[Translate Route] Translating games cards');
        const { games, lang } = req.body;

        if (!games || !Array.isArray(games)) {
            return res.status(400).json({ error: 'Games array is required' });
        }

        const targetLang = lang === 'ru' ? 'Russian' : 'English';
        console.log(`[Translate Route] Translating ${games.length} games to ${targetLang}`);

        const translated = await Promise.all(
            games.map((game: any) =>
                translateFields(game, ['name', 'genres', 'platforms'], targetLang)
            )
        );

        console.log(`[Translate Route] Successfully translated ${translated.length} games`);
        res.json(translated);
    } catch (err) {
        console.error('[Translate Route] Error:', err);
        res.status(500).json({
            error: 'Translation failed',
            details: err.message
        });
    }
});

// Новый маршрут для перевода одной игры
router.post('/single', async (req, res) => {
    try {
        const { game, lang } = req.body;
        const targetLang = lang === 'ru' ? 'Russian' : 'English';

        const translated = await translateFields(
            game,
            ['name', 'summary', 'genres', 'platforms', 'themes'],
            targetLang
        );

        res.json(translated);
    } catch (err) {
        console.error('[Translate Route Single] Error:', err);
        res.status(500).json({ error: 'Translation failed' });
    }
});

export default router;