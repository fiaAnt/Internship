import { fetchApi } from '../../fetchApi';

export const UserService = {
    getUser() {
        return fetchApi('/user');
    },
};
