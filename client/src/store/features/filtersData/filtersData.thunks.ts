import { createAsyncThunk } from '@reduxjs/toolkit';
import { FiltersService } from '@api/services/filters';

export const loadFiltersData = createAsyncThunk(
    'filtersData/load',
    async (_, { rejectWithValue }) => {
        try {
            const [genres, platforms] = await Promise.all([
                FiltersService.getGenres(),
                FiltersService.getPlatforms(),
            ]);

            return { genres, platforms };
        } catch (error: unknown) {
            console.error('THUNK ERROR:', error);

            const errorMessage = error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : 'Unknown error occurred';

            return rejectWithValue(errorMessage);

        }
    }
);


