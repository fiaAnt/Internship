import React from 'react';
import { Box, Container, VStack, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Bar from '@components/Bar';
import GamesList from '@components/GameList';
import { useGamesExplorer } from '@hooks/useGamesList';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';

const ComingSoonGames: React.FC = () => {
  const { games, loading, hasMore, loadGames } =
    useGamesExplorer('/api/coming-soon');

  useInfiniteScroll(loadGames, loading, hasMore);

  const { t } = useTranslation();

  return (
    <Box minH="100vh" bg="gray.50">
      <Bar />

      <Container maxW="8xl" py={6} px={16}>
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" color="blue.600">
            {t('comingSoon.text')}
          </Heading>
          <GamesList games={games} isComingSoon isLoading={loading} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ComingSoonGames;
