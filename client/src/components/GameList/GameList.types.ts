import { Game } from "../../types/game";

interface GamesListProps {
    games: Game[];
    isComingSoon?: boolean;
    isLoading?: boolean;
}

export type { GamesListProps }
