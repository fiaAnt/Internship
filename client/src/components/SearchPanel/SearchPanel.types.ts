import { IGDBItem } from "types/igdb";

interface SearchProps {
    genres: IGDBItem[];
    platforms: IGDBItem[];
    isLoading?: boolean;
}
export type { SearchProps }