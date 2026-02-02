import { configureStore } from '@reduxjs/toolkit';
import gamesReducer, { applyFilters, resetGames } from './games.slice';
import { loadGames } from './games.thunks';
import { Game } from '../../../types/game';



describe('games slice', () => {
    const initialState = {
        games: [],
        loading: false,
        hasMore: true,
        page: 1,
        limit: 12,
        filters: {
            search: '',
            genreId: null,
            platformId: null,
            year: '',
        },
    };

    const mockGames: Game[] = [
        {
            id: 1,
            name: 'Game 1',
            cover: { url: 'url1' },
            rating: 4.5,
            first_release_date: 1672531200,
            genres: [{ id: 1, name: 'Action' }],
            platforms: [{ id: 6, name: 'PC' }],
        },
        {
            id: 2,
            name: 'Game 2',
            cover: { url: 'url2' },
            rating: 4.7,
            first_release_date: 1675209600,
            genres: [{ id: 2, name: 'RPG' }],
            platforms: [{ id: 48, name: 'PS5' }],
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return initial state', () => {
        expect(gamesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('reducers', () => {
        it('should handle applyFilters', () => {
            const newFilters = {
                search: 'test',
                genreId: 1,
                platformId: 6,
                year: '2023',
            };

            const state = gamesReducer(
                {
                    ...initialState,
                    games: mockGames,
                    page: 3,
                    hasMore: false
                },
                applyFilters(newFilters)
            );

            expect(state.filters).toEqual({
                ...initialState.filters,
                ...newFilters,
            });
            expect(state.games).toEqual([]);
            expect(state.page).toBe(1);
            expect(state.hasMore).toBe(true);
        });

        it('should handle applyFilters with partial filters', () => {
            const partialFilters = {
                search: 'partial',
                year: '2022',
            };

            const state = gamesReducer(
                initialState,
                applyFilters(partialFilters)
            );

            expect(state.filters).toEqual({
                ...initialState.filters,
                ...partialFilters,
            });
            expect(state.games).toEqual([]);
            expect(state.page).toBe(1);
        });

        it('should handle resetGames', () => {
            const stateWithData = {
                ...initialState,
                games: mockGames,
                page: 5,
                hasMore: false,
            };

            const state = gamesReducer(stateWithData, resetGames());

            expect(state.games).toEqual([]);
            expect(state.page).toBe(1);
            expect(state.hasMore).toBe(true);
        });
    });

    describe('extraReducers', () => {
        it('should handle loadGames.pending', () => {
            const action = { type: loadGames.pending.type };
            const state = gamesReducer(initialState, action);

            expect(state.loading).toBe(true);
        });

        it('should handle loadGames.fulfilled with new games', () => {
            const action = {
                type: loadGames.fulfilled.type,
                payload: mockGames,
            };

            const state = gamesReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.games).toEqual(mockGames);
            expect(state.page).toBe(2);
            expect(state.hasMore).toBe(false);
        });

        it('should handle loadGames.fulfilled with full page of games', () => {
            const fullPageGames = Array.from({ length: 12 }, (_, i) => ({
                id: i + 1,
                name: `Game ${i + 1}`,
                cover: { url: `url${i + 1}` },
                rating: 4.5,
                first_release_date: 1672531200 + i * 86400,
                genres: [{ id: 1, name: 'Action' }],
                platforms: [{ id: 6, name: 'PC' }],
            }));

            const action = {
                type: loadGames.fulfilled.type,
                payload: fullPageGames,
            };

            const state = gamesReducer(initialState, action);

            expect(state.games).toEqual(fullPageGames);
            expect(state.page).toBe(2);
            expect(state.hasMore).toBe(true);
        });

        it('should handle loadGames.fulfilled with existing games (append)', () => {
            const existingGames = [mockGames[0]];
            const newGames = [mockGames[1]];

            const stateWithExistingGames = {
                ...initialState,
                games: existingGames,
                page: 2,
            };

            const action = {
                type: loadGames.fulfilled.type,
                payload: newGames,
            };

            const state = gamesReducer(stateWithExistingGames, action);

            expect(state.games).toEqual([...existingGames, ...newGames]);
            expect(state.page).toBe(3);
        });

        it('should handle loadGames.rejected', () => {
            const pendingState = { ...initialState, loading: true };
            const action = { type: loadGames.rejected.type };
            const state = gamesReducer(pendingState, action);

            expect(state.loading).toBe(false);
        });
    });

    describe('integration with store', () => {
        it('should update state correctly when using store', () => {
            const store = configureStore({
                reducer: {
                    games: gamesReducer,
                },
            });

            store.dispatch(applyFilters({ search: 'test' }));
            expect(store.getState().games.filters.search).toBe('test');
            expect(store.getState().games.page).toBe(1);

            store.dispatch(resetGames());
            expect(store.getState().games.games).toEqual([]);
            expect(store.getState().games.hasMore).toBe(true);
        });
    });
});