import express from 'express';
import mongoose from 'mongoose';
import Favorites from '../models/Favorites.ts';
import { z, ZodError } from 'zod';

const router = express.Router();

const favoriteSchema = z.object({
    auth0Id: z.string(),
    gameId: z.string(),
});

router.get('/:auth0Id', async (req, res) => {
    try {
        const favorites = await Favorites.find({
            auth0Id: req.params.auth0Id,
        });

        res.json(favorites);
    } catch (err: unknown) {
        console.error('Failed to load favorites:', err);
        res.status(500).json({ message: 'Failed to load favorites' });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = favoriteSchema.parse(req.body);
        const favorite = await Favorites.create(data);
        res.json(favorite);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json(err.errors);
        }

        if (err instanceof mongoose.Error && err.name === 'MongoError') {
            const mongoError = err as mongoose.Error & { code?: number };
            if (mongoError.code === 11000) {
                return res.status(409).json({ message: 'Already in favorites' });
            }
        }

        console.error('Failed to add favorite:', err);
        res.status(500).json({ message: 'Failed to add favorite' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const data = favoriteSchema.parse(req.body);
        await Favorites.deleteOne(data);
        res.json({ success: true });
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json(err.errors);
        }

        console.error('Failed to remove favorite:', err);
        res.status(500).json({ message: 'Failed to remove favorite' });
    }
});

export default router;