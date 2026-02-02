import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentService } from '../../../api/services/comments';

export const loadComments = createAsyncThunk(
    'comments/load',
    async (gameId: string) => {
        return await CommentService.getByGameId(gameId);
    }
);

export const createComment = createAsyncThunk(
    'comments/create',
    async (payload: {
        gameId: string;
        text: string;
        auth0Id: string;
        authorName: string;
        authorAvatar: string;
    }) => {
        return await CommentService.create(payload);
    }
);