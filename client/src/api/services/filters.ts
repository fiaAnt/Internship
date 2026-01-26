import { api } from '../axios';

export const FiltersService = {
    getPlatforms() {
        return api.get('/platforms');
    },
    getGenres() {
        return api.get(`/genres`);
    },
};