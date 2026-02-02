import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'types/comment';
import { loadComments, createComment } from './comments.thunks';

interface CommentsState {
    items: Comment[];
    loading: boolean;
}

const initialState: CommentsState = {
    items: [],
    loading: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(loadComments.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default commentsSlice.reducer;