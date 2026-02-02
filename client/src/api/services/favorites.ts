import { fetchApi } from '../fetchApi';

export interface Favorite {
    _id: string;
    auth0Id: string;
    gameId: string;
}

export const FavoritesService = {
    getByUser(auth0Id: string) {
        return fetchApi<Favorite[]>(`/favorites/${auth0Id}`);
    },

    add(payload: { auth0Id: string; gameId: string }) {
        return fetchApi<Favorite>('/favorites', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },

    remove(payload: { auth0Id: string; gameId: string }) {
        return fetchApi('/favorites', {
            method: 'DELETE',
            body: JSON.stringify(payload),
        });
    },
};
