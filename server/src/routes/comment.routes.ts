import express from 'express';
import Comment from '../models/Comment.ts';
import { z, ZodError } from 'zod';

const router = express.Router();

const createCommentSchema = z.object({
    gameId: z.string().min(1, { message: 'gameId is required' }),
    text: z.string().min(1, { message: 'text is required' }),
    auth0Id: z.string().min(1, { message: 'auth0Id is required' }),
    userName: z.string().min(1, { message: 'auth0Id is required' }),
    userAvatar: z.string().optional(),
})

router.get('/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        console.log(`Fetching comments for game: ${gameId}`);

        const comments = await Comment.find({ gameId }).sort({ createdAt: -1 });
        console.log(`Found ${comments.length} comments`);

        if (comments.length > 0) {
            console.log('Sample comment structure:', {
                _id: comments[0]._id,
                userName: comments[0].userName,
                userAvatar: comments[0].userAvatar,
                fields: Object.keys(comments[0].toObject())
            });
        }

        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Не удалось загрузить комментарии' });
    }
});

router.post('/', async (req, res) => {
    try {

        const validatedData = createCommentSchema.parse(req.body)

        const commentData = {
            ...validatedData,
            userAvatar: validatedData.userAvatar || '',
            createdAt: new Date(),
        };
        const comment = await Comment.create(commentData);
        res.status(201).json(comment);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                details: err.errors,
            });
        }
        res.status(500).json({
            error: 'Не удалось создать комментарий',
            details: err instanceof Error ? err.message : String(err),
        });
    }
});

router.delete('/:id/:auth0Id', async (req, res) => {
    try {
        const { id, auth0Id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ error: 'Комментарий не найден' });
        }

        if (comment.auth0Id !== auth0Id) {
            return res.status(403).json({ error: 'Нет прав на удаление' });
        }

        await Comment.findByIdAndDelete(id);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка удаления комментария' });
    }
});


export default router;