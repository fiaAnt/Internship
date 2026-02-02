import { useEffect, useReducer } from 'react';
import {
    GamesExplorerState,
    GamesExplorerAction,
    Filters,
    UseGamesExplorerResult,
} from 'types/gamesExplorer';
import { Game } from '../types/game.ts';

const initialState: GamesExplorerState = {
    games: [],
    loading: false,
    offset: 0,
    hasMore: true,
    filters: {
        search: '',
        genreId: null,
        platformId: null,
        year: '',
    },
};

const reducer = (
    state: GamesExplorerState,
    action: GamesExplorerAction
): GamesExplorerState => {
    switch (action.type) {
        case 'LOAD_START':
            return { ...state, loading: true };
        case 'LOAD_SUCCESS': {
            const ids = new Set(state.games.map((g) => g.id));
            const uniqueGames = action.payload.filter((g) => !ids.has(g.id));
            return {
                ...state,
                games: [...state.games, ...uniqueGames],
                offset: state.offset + uniqueGames.length,
                loading: false,
            };
        }
        case 'RESET':
            return { ...initialState, filters: state.filters };
        case 'NO_MORE':
            return { ...state, loading: false, hasMore: false };
        case 'SET_FILTERS':
            return { ...state, filters: { ...state.filters, ...action.payload } };
        default:
            return state;
    }
};

export const useGamesExplorer = (
    endpoint = '/api/games'
): UseGamesExplorerResult => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loadGames = async () => {
        if (state.loading || !state.hasMore) return;

        dispatch({ type: 'LOAD_START' });

        const isComingSoon = endpoint === '/api/coming-soon';

        const url = isComingSoon
            ? `${process.env.REACT_APP_CLIENT_URL}${endpoint}?offset=${state.offset}`
            : `${process.env.REACT_APP_CLIENT_URL}${endpoint}`;

        const res = await fetch(url, {
            method: isComingSoon ? 'GET' : 'POST',
            headers: isComingSoon
                ? undefined
                : { 'Content-Type': 'application/json' },
            body: isComingSoon
                ? undefined
                : JSON.stringify({
                    search: state.filters.search,
                    genreId: state.filters.genreId,
                    platformId: state.filters.platformId,
                    year: state.filters.year,
                    limit: 12,
                    offset: state.offset,
                }),
        });

        const data: Game[] = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            dispatch({ type: 'NO_MORE' });
        } else {
            dispatch({ type: 'LOAD_SUCCESS', payload: data });
        }
    };

    const applyFilters = (filters: Partial<Filters>) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch({ type: 'SET_FILTERS', payload: filters });
        dispatch({ type: 'RESET' });
    };

    useEffect(() => {
        loadGames();
    }, [state.filters, endpoint]);

    return {
        games: state.games,
        loading: state.loading,
        hasMore: state.hasMore,
        loadGames,
        applyFilters,
    };
};
