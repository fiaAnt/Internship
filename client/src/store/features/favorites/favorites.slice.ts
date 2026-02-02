import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavorites, toggleFavorite } from './favorites.thunks';
import { Favorite } from '../../../api/services/favorites';

interface FavoritesState {
    gameIds: string[];
    loading: boolean;
}

const initialState: FavoritesState = {
    gameIds: [],
    loading: false,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleLocalFavorite(state, action: PayloadAction<string>) {
            const id = action.payload;

            if (state.gameIds.includes(id)) {
                state.gameIds = state.gameIds.filter((g) => g !== id);
            } else {
                state.gameIds.push(id);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                loadFavorites.fulfilled,
                (state, action: PayloadAction<Favorite[]>) => {
                    state.gameIds = action.payload.map((f) => f.gameId);
                    state.loading = false;
                }
            )
            .addCase(loadFavorites.rejected, (state) => {
                state.loading = false;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const { gameId, action: type } = action.payload;

                if (type === 'selected') {
                    state.gameIds.push(gameId);
                } else {
                    state.gameIds = state.gameIds.filter((g) => g !== gameId);
                }
            });
    },
});

export const { toggleLocalFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
