import { GameService } from './games';
import { fetchApi } from '../../../api/fetchApi';
import { Game } from '../../../types/game';
import { GameInfo } from '../../../types/gameInfo';

jest.mock('@api/fetchApi');

const mockFetchApi = fetchApi as jest.MockedFunction<typeof fetchApi>;

describe('GameService', () => {
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

    const mockGameInfo: GameInfo = {
        id: 1,
        name: 'Game 1',
        summary: 'Test summary',
        storyline: 'Test storyline',
        cover: { url: 'cover-url' },
        screenshots: [{ url: 'screenshot1.jpg' }, { url: 'screenshot2.jpg' }],
        videos: [{ video_id: 'abc123' }],
        rating: 4.5,
        first_release_date: 1672531200,
        updated_at: 1672531200,
        game_modes: [{ name: 'Single-player' }, { name: 'Multiplayer' }],
        genres: [{ id: 1, name: 'Action' }, { id: 4, name: 'Fighting' }],
        platforms: [{ id: 6, name: 'PC' }, { id: 48, name: 'PS5' }],
        themes: [{ id: 1, name: 'Action' }, { id: 17, name: 'Fantasy' }],
        player_perspectives: [{ id: 1, name: 'First person' }],
        involved_companies: [{
            company: { name: 'Game Studios Inc.' }
        }],
        similar_games: [{ id: 2, name: 'Game 2' }],
        websites: [{ url: 'https://game1.com', category: 1 }],
        franchises: [{ name: 'Game Franchise' }],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getGames', () => {
        it('should fetch games with params', async () => {
            const params = {
                search: 'test',
                page: 2,
                limit: 20,
            };

            mockFetchApi.mockResolvedValue(mockGames);

            const result = await GameService.getGames(params);

            expect(mockFetchApi).toHaveBeenCalledWith('/games', {
                method: 'POST',
                body: JSON.stringify({ params }),
            });
            expect(result).toEqual(mockGames);
            expect(typeof result[0].id).toBe('number');
        });

        it('should fetch games with default params', async () => {
            mockFetchApi.mockResolvedValue(mockGames);

            const result = await GameService.getGames();

            expect(mockFetchApi).toHaveBeenCalledWith('/games', {
                method: 'POST',
                body: JSON.stringify({ params: {} }),
            });
            expect(result).toEqual(mockGames);
        });

        it('should handle empty response', async () => {
            mockFetchApi.mockResolvedValue([]);

            const result = await GameService.getGames({ search: 'nonexistent' });

            expect(mockFetchApi).toHaveBeenCalled();
            expect(result).toEqual([]);
        });

        it('should propagate errors', async () => {
            const error = new Error('API Error');
            mockFetchApi.mockRejectedValue(error);

            await expect(GameService.getGames()).rejects.toThrow('API Error');
        });
    });

    describe('getGameById', () => {
        it('should fetch a single game by ID', async () => {
            const gameId = '1';
            mockFetchApi.mockResolvedValue(mockGameInfo);

            const result = await GameService.getGameById(gameId);

            expect(mockFetchApi).toHaveBeenCalledWith(`/game/${gameId}`);
            expect(result).toEqual(mockGameInfo);
            expect(typeof result.id).toBe('number');
            expect(result.genres).toBeDefined();
            expect(result.platforms).toBeDefined();
            expect(result.screenshots).toBeDefined();
        });

        it('should handle game with partial data', async () => {
            const partialGameInfo: GameInfo = {
                id: 3,
                name: 'Partial Game',
                rating: 3.5,
            };

            mockFetchApi.mockResolvedValue(partialGameInfo);

            const result = await GameService.getGameById('3');

            expect(result).toEqual(partialGameInfo);
            expect(result.genres).toBeUndefined();
            expect(result.platforms).toBeUndefined();
        });

        it('should handle invalid game ID', async () => {
            const gameId = 'invalid-id';
            const error = new Error('Game not found');
            mockFetchApi.mockRejectedValue(error);

            await expect(GameService.getGameById(gameId)).rejects.toThrow('Game not found');
            expect(mockFetchApi).toHaveBeenCalledWith(`/game/${gameId}`);
        });
    });

    describe('getGamesByIds', () => {
        it('should fetch multiple games by IDs', async () => {
            const gameIds = [1, 2];
            mockFetchApi.mockResolvedValue(mockGames);

            const result = await GameService.getGamesByIds(gameIds);

            expect(mockFetchApi).toHaveBeenCalledWith('/game/by-ids', {
                method: 'POST',
                body: JSON.stringify({ ids: gameIds }),
            });
            expect(result).toEqual(mockGames);
            expect(typeof result[0].id).toBe('number');
        });

        it('should handle empty IDs array', async () => {
            const gameIds: number[] = [];
            mockFetchApi.mockResolvedValue([]);

            const result = await GameService.getGamesByIds(gameIds);

            expect(mockFetchApi).toHaveBeenCalledWith('/game/by-ids', {
                method: 'POST',
                body: JSON.stringify({ ids: [] }),
            });
            expect(result).toEqual([]);
        });

        it('should handle partial match (some IDs not found)', async () => {
            const gameIds = [1, 999, 2];
            const partialGames = [mockGames[0], mockGames[1]];
            mockFetchApi.mockResolvedValue(partialGames);

            const result = await GameService.getGamesByIds(gameIds);

            expect(mockFetchApi).toHaveBeenCalled();
            expect(result).toEqual(partialGames);
            expect(result.length).toBe(2);
        });

        it('should handle errors when fetching by IDs', async () => {
            const gameIds = [1, 2];
            const error = new Error('Failed to fetch games');
            mockFetchApi.mockRejectedValue(error);

            await expect(GameService.getGamesByIds(gameIds)).rejects.toThrow('Failed to fetch games');
            expect(mockFetchApi).toHaveBeenCalled();
        });

        it('should handle mixed Game and GameInfo types in response', async () => {
            const gameIds = [1, 2];
            const mixedResponse = [
                { ...mockGames[0], summary: 'Some summary' },
                mockGames[1]
            ];

            mockFetchApi.mockResolvedValue(mixedResponse);

            const result = await GameService.getGamesByIds(gameIds);

            expect(result).toEqual(mixedResponse);
            expect(result[0].summary).toBeDefined();
        });
    });

    describe('method calls validation', () => {
        it('should stringify request bodies correctly', async () => {
            mockFetchApi.mockResolvedValue(mockGames);

            const params = { search: 'test', page: 1 };
            await GameService.getGames(params);

            const call = mockFetchApi.mock.calls[0];
            expect(call[1]?.body).toBe(JSON.stringify({ params }));

            const gameIds = [1, 2];
            await GameService.getGamesByIds(gameIds);

            const secondCall = mockFetchApi.mock.calls[1];
            expect(secondCall[1]?.body).toBe(JSON.stringify({ ids: gameIds }));
        });

        it('should handle large arrays of IDs', async () => {
            const largeGameIds = Array.from({ length: 100 }, (_, i) => i + 1);
            const largeResponse = Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                name: `Game ${i + 1}`,
                rating: 4.0,
            }));

            mockFetchApi.mockResolvedValue(largeResponse);

            const result = await GameService.getGamesByIds(largeGameIds);

            expect(mockFetchApi).toHaveBeenCalledWith('/game/by-ids', {
                method: 'POST',
                body: JSON.stringify({ ids: largeGameIds }),
            });
            expect(result.length).toBe(100);
        });
    });
});