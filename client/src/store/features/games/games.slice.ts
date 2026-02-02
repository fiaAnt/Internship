import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamesState, Filters } from './games.types';
import { loadGames } from './games.thunks';

const initialState: GamesState = {
    games: [],
    loading: false,
    hasMore: true,
    page: 1,
    limit: 12,
    filters: {
        search: '',
        genreId: null,
        platformId: null,
        year: '',
    },
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        applyFilters(state, action: PayloadAction<Partial<Filters>>) {
            state.filters = { ...state.filters, ...action.payload };
            state.games = [];
            state.page = 1;
            state.hasMore = true;
        },
        resetGames(state) {
            state.games = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGames.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadGames.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.length < state.limit) {
                    state.hasMore = false;
                }

                state.games.push(...action.payload);
                state.page += 1;
            })
            .addCase(loadGames.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { applyFilters, resetGames } = gamesSlice.actions;
export default gamesSlice.reducer;