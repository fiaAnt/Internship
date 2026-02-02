import { createAsyncThunk } from '@reduxjs/toolkit';
import { Game } from 'types/game';
import { GameService } from '@api/services/games/games';
import { RootState } from 'store/store';

export const loadGames = createAsyncThunk<
    Game[],
    void,
    { state: RootState }
>(
    'games/load',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { page, filters } = getState().games;
            const data = await GameService.getGames({ ...filters, page });
            return data;
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { loading, hasMore } = getState().games;
            return !loading && hasMore;
        },
    }
);

export const loadGamesByIds = createAsyncThunk<
    Game[],
    string[],
    { state: RootState }
>(
    'games/loadByIds',
    async (ids, { rejectWithValue }) => {
        try {
            const games = await GameService.getGamesByIds(ids);
            return games;
        }
        catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    }
);


