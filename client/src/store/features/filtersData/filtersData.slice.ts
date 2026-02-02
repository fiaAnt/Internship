import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGDBItem } from 'types/igdb';
import { loadFiltersData } from './filtersData.thunks';

interface FiltersDataState {
    genres: IGDBItem[];
    platforms: IGDBItem[];
    loading: boolean;
}

const initialState: FiltersDataState = {
    genres: [],
    platforms: [],
    loading: false,
};

const filtersDataSlice = createSlice({
    name: 'filtersData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFiltersData.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                loadFiltersData.fulfilled,
                (state, action: PayloadAction<{ genres: IGDBItem[]; platforms: IGDBItem[] }>) => {
                    state.genres = action.payload.genres;
                    state.platforms = action.payload.platforms;
                    state.loading = false;
                }
            )
            .addCase(loadFiltersData.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default filtersDataSlice.reducer;