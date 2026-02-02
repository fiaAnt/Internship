import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../../../api/services/user/user';

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async (_, { rejectWithValue }) => {
        try {
            const data = await UserService.getUser();
            return data;
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            return rejectWithValue(message);
        }
    }
);

