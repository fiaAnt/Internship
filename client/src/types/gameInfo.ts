export interface GameInfo {
    id: number;
    name: string;
    summary?: string;
    storyline?: string;
    cover?: { url: string };
    screenshots?: { url: string }[];
    videos?: { video_id: string }[];
    rating?: number;
    first_release_date?: number;
    updated_at?: number;
    game_modes?: { name: string }[];
    genres?: { id: number; name: string }[];
    platforms?: { id: number; name: string }[];
    themes?: { id: number; name: string }[];
    player_perspectives?: { id: number; name: string }[];
    involved_companies?: {
        company: { name: string };
    }[];
    similar_games?: { id: number; name: string }[];
    websites?: { url: string; category?: number }[];
    franchises?: { name: string }[];
}
