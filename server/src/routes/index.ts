import { Router } from 'express';
import igdbRoutes from './igdb.routes.ts';
import userRoutes from './user.routes.ts';
import gameRouter from './game.routes.ts';

const router = Router();

router.use('/', igdbRoutes);
router.use('/', userRoutes);
router.use('/game', gameRouter);

export default router;