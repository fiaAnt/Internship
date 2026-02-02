import { Game } from './game';

export interface Filters {
    search: string;
    genreId: number | null;
    platformId: number | null;
    year: string;
}

export interface GamesExplorerState {
    games: Game[];
    loading: boolean;
    offset: number;
    hasMore: boolean;
    filters: Filters;
}

export type GamesExplorerAction =
    | { type: 'LOAD_START' }
    | { type: 'LOAD_SUCCESS'; payload: Game[] }
    | { type: 'RESET' }
    | { type: 'NO_MORE' }
    | { type: 'SET_FILTERS'; payload: Partial<Filters> };

export interface UseGamesExplorerResult {
    games: Game[];
    loading: boolean;
    hasMore: boolean;
    loadGames: () => void;
    applyFilters: (filters: Partial<Filters>) => void;
}
