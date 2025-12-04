import {
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE
} from './types'
import axios from 'axios'

interface Todo {
    id: number
    title: string
    completed: boolean

}

const addTodoStarted = () => ({
    type: ADD_TODO_STARTED
})

const addTodoSuccess = (todo: Todo) => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        id: `${todo.id}-${Date.now()}`,
        text: todo.title,
        status: todo.completed,
    }
})

const addTodoFailure = (error: string) => ({
    type: ADD_TODO_FAILURE,
    payload: error
})

export const addTodoAsync = (text: string) => {
    return (dispatch: any) => {
        dispatch(addTodoStarted())

        axios
            .post('https://jsonplaceholder.typicode.com/todos', {
                title: text,
                completed: false,

            })
            .then((res) => {
                dispatch(addTodoSuccess(res.data))
            })
            .catch((err) => {
                dispatch(addTodoFailure(err.message))
            })
    }
}