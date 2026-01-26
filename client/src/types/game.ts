interface Genre {
    id: number;
    name: string;
}

interface Platform {
    id: number;
    name: string;
}

interface Cover {
    url: string;
}

interface Game {
    id: number;
    name: string;
    cover?: Cover;
    rating?: number;
    first_release_date?: number;
    genres?: Genre[];
    platforms?: Platform[];
}

export type { Game }