import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, VStack } from '@chakra-ui/react';

import Bar from '@components/Bar';
import GamesList from '@components/GameList';
import SearchPanel from '@components/SearchPanel';

import { IGDBItem } from 'types/igdb';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { AppDispatch, RootState } from 'store/store';
import { loadGames } from '@store/features/games/games.thunks';

const Explore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { games, loading, hasMore } = useSelector(
    (state: RootState) => state.games,
  );

  useInfiniteScroll(() => dispatch(loadGames()), loading, hasMore);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const genres: IGDBItem[] = [];
  const platforms: IGDBItem[] = [];

  return (
    <Box minH="100vh" bg="gray.50">
      <Bar />
      <Container maxW="8xl" py={6} px={16}>
        <VStack spacing={6} align="stretch">
          <SearchPanel
            genres={genres}
            platforms={platforms}
            isLoading={loading}
          />

          <GamesList games={games} isLoading={loading} />
        </VStack>
      </Container>
    </Box>
  );
};

export default Explore;
