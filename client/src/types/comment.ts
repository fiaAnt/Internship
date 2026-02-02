
export interface Comment {
    _id: string;
    gameId: string;
    text: string;
    auth0Id: string;
    userName: string;
    userAvatar?: string;
    createdAt: string;
    updatedAt?: string;
}