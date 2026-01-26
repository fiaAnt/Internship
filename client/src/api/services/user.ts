import { api } from '../axios';

export const UserService = {
    getUser() {
        return api.get('/user', { withCredentials: true });
    }
};