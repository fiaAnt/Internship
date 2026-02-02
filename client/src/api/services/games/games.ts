import { fetchApi } from '@api/fetchApi';
import { Game } from 'types/game';
import { GameInfo } from 'types/gameInfo';

export const GameService = {
    getGames(params: Record<string, unknown> = {}) {
        return fetchApi<Game[]>('/games', {
            method: 'POST',
            body: JSON.stringify({ params }),
        });
    },

    getGameById(id: string) {
        return fetchApi<GameInfo>(`/game/${id}`);
    },
    getGamesByIds(ids: string[]) {
        return fetchApi<Game[]>('/game/by-ids', {
            method: 'POST',
            body: JSON.stringify({ ids }),
        });
    },
};
