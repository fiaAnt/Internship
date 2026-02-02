import reducer, { logout, setUser, UserState } from './user.slice';
import { loadUser } from './user.thunks';
import '@testing-library/jest-dom';


describe('userSlice reducer', () => {
    const initialState: UserState = {
        user: null,
        isAuthenticated: false,
        loading: false,
    };

    it('should handle logout', () => {
        const state = reducer(
            { ...initialState, user: { name: 'Alice', email: 'a@a.com', sub: '1' }, isAuthenticated: true },
            logout()
        );
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
    });

    it('should handle setUser', () => {
        const user = { name: 'Bob', email: 'b@b.com', sub: '2' };
        const state = reducer(initialState, setUser(user));
        expect(state.user).toEqual(user);
        expect(state.isAuthenticated).toBe(true);
    });

    it('should handle loadUser.pending', () => {
        const action = { type: loadUser.pending.type };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(true);
    });

    it('should handle loadUser.fulfilled', () => {
        const payload = { user: { name: 'Alice', sub: '123', email: 'a@a.com' }, isAuthenticated: true };
        const state = reducer(initialState, { type: loadUser.fulfilled.type, payload });
        expect(state.loading).toBe(false);
        expect(state.user).toEqual(payload.user);
        expect(state.isAuthenticated).toBe(true);
    });

    it('should handle loadUser.rejected', () => {
        const action = { type: loadUser.rejected.type };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
    });
});
