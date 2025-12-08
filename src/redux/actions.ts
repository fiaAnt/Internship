import { Dispatch } from 'redux';
import {
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    TodoActionTypes,
    AddTodoStartedAction,
    AddTodoSuccessAction,
    AddTodoFailureAction
} from './types';
import axios from 'axios';
import { Note } from './notesReducer';

interface TodoResponse {
    id: number;
    title: string;
    completed: boolean;
}
const addTodoStarted = (): AddTodoStartedAction => ({
    type: ADD_TODO_STARTED
});

const addTodoSuccess = (todo: TodoResponse): AddTodoSuccessAction => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        id: `${todo.id}-${Date.now()}`,
        text: todo.title,
        status: todo.completed,
    }
});

const addTodoFailure = (error: string): AddTodoFailureAction => ({
    type: ADD_TODO_FAILURE,
    payload: error
});

export const addTodoAsync = (text: string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        dispatch(addTodoStarted());

        axios
            .post<TodoResponse>('https://jsonplaceholder.typicode.com/todos', {
                title: text,
                completed: false,
            })
            .then((res) => {
                dispatch(addTodoSuccess(res.data));
            })
            .catch((err) => {
                dispatch(addTodoFailure(err.message));
            });
    };
};