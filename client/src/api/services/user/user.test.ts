import { UserService } from './user';
import { fetchApi } from '../../fetchApi';
import '@testing-library/jest-dom';


jest.mock('../../fetchApi');

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch user data successfully', async () => {
        const mockUser = { name: 'Alice', email: 'alice@example.com', sub: 'auth0|123' };
        (fetchApi as jest.Mock).mockResolvedValue(mockUser);

        const result = await UserService.getUser();

        expect(fetchApi).toHaveBeenCalledWith('/user');
        expect(result).toEqual(mockUser);
    });

    it('should throw if fetch fails', async () => {
        (fetchApi as jest.Mock).mockRejectedValue(new Error('Network error'));

        await expect(UserService.getUser()).rejects.toThrow('Network error');
    });
});
