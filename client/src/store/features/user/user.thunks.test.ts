import { loadUser } from './user.thunks';
import configureStore from 'redux-mock-store';
import { UserService } from '../../../api/services/user/user';
import { thunk } from 'redux-thunk';
import { Middleware } from 'redux';

jest.mock('../../../api/services/user/user');

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

describe('user thunks', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('dispatches correct actions on successful loadUser', async () => {
        (UserService.getUser as jest.Mock).mockResolvedValue({
            name: 'Alice',
            email: 'alice@example.com',
            sub: 'auth0|123'
        });

        const store = mockStore({
            user: {
                user: null,
                loading: false,
                isAuthenticated: false
            }
        });

        await store.dispatch<any>(loadUser());

        const actions = store.getActions();
        expect(actions[0].type).toBe('user/loadUser/pending');
        expect(actions[1].type).toBe('user/loadUser/fulfilled');
        expect(actions[1].payload).toEqual({
            name: 'Alice',
            email: 'alice@example.com',
            sub: 'auth0|123'
        });
    });

    it('dispatches rejected action on failure', async () => {
        (UserService.getUser as jest.Mock).mockRejectedValue(new Error('Network error'));

        const store = mockStore({
            user: {
                user: null,
                loading: false,
                isAuthenticated: false
            }
        });
        await store.dispatch<any>(loadUser());

        const actions = store.getActions();
        expect(actions[0].type).toBe('user/loadUser/pending');
        expect(actions[1].type).toBe('user/loadUser/rejected');
    });
});