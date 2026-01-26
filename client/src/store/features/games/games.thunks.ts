import { createAsyncThunk } from '@reduxjs/toolkit';
import { Game } from 'types/game';
import { GameService } from '../../../api/services/games';
import { RootState } from 'store/store';

export const loadGames = createAsyncThunk<
    Game[],
    void,
    { state: RootState }
>('games/load', async (_, { getState }) => {
    const { page, filters } = getState().games;

    const { data } = await GameService.getGames({
        ...filters,
        page,
    })

    return data;
},
    {
        condition: (_, { getState }) => {
            const { loading, hasMore } = getState().games;
            return !loading && hasMore;
        }
    },

);