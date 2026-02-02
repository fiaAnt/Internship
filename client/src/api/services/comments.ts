import { fetchApi } from '../../api/fetchApi';
import { Comment } from 'types/comment';

export const CommentService = {
    getByGameId(gameId: string) {
        return fetchApi<Comment[]>(`/comment/${gameId}`);
    },
    create(payload: {
        gameId: string;
        text: string;
        auth0Id: string;
        userName: string;
        userAvatar?: string;
    }) {
        return fetchApi<Comment>('/comment', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
    delete(commentId: string, auth0Id: string) {
        return fetchApi(`/comment/${commentId}/${auth0Id}`, {
            method: 'DELETE',
        });
    },
};
