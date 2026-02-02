import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameService } from '../../../api/services/games/games';
import { GameInfo } from '../../../types/gameInfo';

export const loadGameById = createAsyncThunk<GameInfo, string>(
    'gamePage/loadById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await GameService.getGameById(id);
            return data;
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    }
);
