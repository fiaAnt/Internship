import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoritesService } from '../../../api/services/favorites';
import { RootState } from '../../store';

export const loadFavorites = createAsyncThunk(
    'favorites/load',
    async (auth0Id: string, { rejectWithValue }) => {
        try {
            return await FavoritesService.getByUser(auth0Id);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    }
);

export const toggleFavorite = createAsyncThunk(
    'favorites/toggle',
    async (
        { auth0Id, gameId }: { auth0Id: string; gameId: string },
        { getState, rejectWithValue }
    ) => {
        try {
            const state = getState() as RootState;
            const exists = state.favorites.gameIds.includes(gameId);

            if (exists) {
                await FavoritesService.remove({ auth0Id, gameId });
                return { gameId, action: 'removed' };
            } else {
                await FavoritesService.add({ auth0Id, gameId });
                return { gameId, action: 'selected' };
            }
        }
        catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    }
);
