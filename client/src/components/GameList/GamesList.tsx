import React from 'react';
import { SimpleGrid, Box, VStack } from '@chakra-ui/react';
import { GamesListProps } from './GameList.types';
import GameCard from '@components/GameCard';
import GameCardSkeleton from '../GameCardSkeleton';

const GamesList: React.FC<GamesListProps> = ({
  games,
  isComingSoon = false,
  isLoading = false,
}) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} py={4}>
      {isLoading && games.length === 0
        ? Array.from({ length: 12 }).map((_, i) => (
            <GameCardSkeleton key={`skeleton-${i}`} />
          ))
        : games.map((game) => (
            <GameCard key={game.id} game={game} isComingSoon={isComingSoon} />
          ))}
    </SimpleGrid>
  );
};

export default GamesList;
