import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './features/games/games.slice'
import gameInfoReducer from './features/gameInfo/gameInfo.slice'
import filtersDataReducer from './features/filtersData/filtersData.slice'
import userReducer from './features/user/user.slice'
import commentReducer from './features/comments/comments.slice'
import favoritesReducer from './features/favorites/favorites.slice'


export const store = configureStore({
    reducer: {
        games: gamesReducer,
        game: gameInfoReducer,
        filtersData: filtersDataReducer,
        user: userReducer,
        comment: commentReducer,
        favorites: favoritesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch