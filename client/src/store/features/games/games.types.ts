import { Game } from "types/game";



export interface Filters {
    search: string;
    genreId: number | null;
    platformId: number | null;
    year: string;
}

export interface GamesState {
    games: Game[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    filters: Filters;
}