import { createSlice } from '@reduxjs/toolkit';
import { GamePageState } from './gameInfo.types';
import { loadGameById } from './gameInfo.thunks';


const initialState: GamePageState = {
    game: null,
    loading: false,
    error: false,
};

export const gamePageSlice = createSlice({
    name: 'gamePage',
    initialState,
    reducers: {
        resetGame(state) {
            state.game = null;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGameById.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loadGameById.fulfilled, (state, action) => {
                state.game = action.payload;
                state.loading = false;
            })
            .addCase(loadGameById.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { resetGame } = gamePageSlice.actions;
export default gamePageSlice.reducer;