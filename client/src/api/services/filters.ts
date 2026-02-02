import { fetchApi } from '@api/fetchApi';
import { IGDBItem } from 'types/igdb';

export const FiltersService = {
    getPlatforms(): Promise<IGDBItem[]> {
        return fetchApi<IGDBItem[]>('/platforms');
    },

    getGenres(): Promise<IGDBItem[]> {
        return fetchApi<IGDBItem[]>('/genres');
    },
};
