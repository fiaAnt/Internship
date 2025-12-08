import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    AddTodoSuccessAction,
    AddTodoFailureAction
} from './types';

export interface Note {
    id: string;
    text: string;
    status: boolean;
}

interface NotesState {
    items: Note[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    items: [],
    loading: false,
    error: null
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        deleteNote: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(note => note.id !== action.payload);
        },
        toggleNote: (state, action: PayloadAction<string>) => {
            const note = state.items.find(note => note.id === action.payload);
            if (note) {
                note.status = !note.status;
            }
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ADD_TODO_STARTED, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ADD_TODO_SUCCESS, (state, action: AddTodoSuccessAction) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(ADD_TODO_FAILURE, (state, action: AddTodoFailureAction) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { deleteNote, toggleNote, clearError } = notesSlice.actions;
export default notesSlice.reducer;