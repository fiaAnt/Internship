import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './features/games/games.slice'
import gameInfoReducer from './features/gameInfo/gameInfo.slice'
import filtersDataReducer from './features/filtersData/filterData.slice'
import userReducer from './features/user/user.slice'


export const store = configureStore({
    reducer: {
        games: gamesReducer,
        game: gameInfoReducer,
        filtersData: filtersDataReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch