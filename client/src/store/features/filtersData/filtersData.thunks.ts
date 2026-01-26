import { createAsyncThunk } from '@reduxjs/toolkit';
import { FiltersService } from '@api/services/filters'


export const loadFiltersData = createAsyncThunk(
    'filtersData/load',
    async () => {

        const [genres, platforms] = await Promise.all([FiltersService.getGenres(), FiltersService.getPlatforms()])

        return {
            genres: genres.data,
            platforms: platforms.data
        };
    }
);
