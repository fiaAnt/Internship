import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameService } from '../../../api/services/games';
import { GameInfo } from '../../../types/gameInfo';

export const loadGameById = createAsyncThunk<
    GameInfo,
    string
>('gamePage/loadById', async (id) => {
    const { data } = await GameService.getGameById(id);
    return data;
});