import { Note } from './notesReducer';

export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export interface AddTodoStartedAction {
    type: typeof ADD_TODO_STARTED;
}
export interface AddTodoSuccessAction {
    type: typeof ADD_TODO_SUCCESS;
    payload: Note;
}
export interface AddTodoFailureAction {
    type: typeof ADD_TODO_FAILURE;
    payload: string;
}
export type TodoActionTypes =
    | AddTodoStartedAction
    | AddTodoSuccessAction
    | AddTodoFailureAction;