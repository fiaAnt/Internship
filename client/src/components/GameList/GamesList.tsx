import React from 'react';
import { GameCard } from '../GameCard';
import './gameList.css';
import { GamesListProps } from './GameList.types';

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="games-container">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
