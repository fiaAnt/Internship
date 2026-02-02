
import { GameInfo } from '../../../types/gameInfo'

export interface GamePageState {
    game: GameInfo | null;
    loading: boolean;
    error: boolean;
}