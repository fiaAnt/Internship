import { Router } from 'express';
import igdbRoutes from './igdb.routes.ts';
import userRoutes from './user.routes.ts';
import gameRouter from './game.routes.ts';
import commentRouter from './comment.routes.ts';
import favoritesRouter from './favorites.routes.ts';
import translateRouter from './translate.routes.ts';

const router = Router();

router.use('/', igdbRoutes);
router.use('/', userRoutes);
router.use('/game', gameRouter);
router.use('/comment', commentRouter);
router.use('/favorites', favoritesRouter);
router.use('/translate', translateRouter);

export default router;