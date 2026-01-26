import { Game } from 'types/game';
import { api } from '../axios';
import { GameInfo } from 'types/gameInfo';



export const GameService = {
    getGames(params = {}) {
        return api.post<Game>('/games', { params });
    },
    getGameById(id: string) {
        return api.get<GameInfo>(`/game/${id}`);
    },
};