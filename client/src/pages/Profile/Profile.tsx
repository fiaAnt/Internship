import React, { useEffect, useState } from 'react';
import { VStack, HStack, Box, Image, SimpleGrid } from '@chakra-ui/react';
import defaultProfile from '@assets/images/profile.png';
import Bar from '@components/Bar';
import ElText from '@elements/ElText';
import ElButton from '@elements/ElButton';
import GamesList from '@components/GameList';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/store';
import { loadGamesByIds } from '@store/features/games/games.thunks';
import { GameInfo } from 'types/gameInfo';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    user,
    isAuthenticated,
    loading: userLoading,
  } = useSelector((state: RootState) => state.user);
  const { gameIds, loading: favoritesLoading } = useSelector(
    (state: RootState) => state.favorites,
  );

  const [favoriteGames, setFavoriteGames] = useState<GameInfo[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      window.location.assign(
        `${process.env.REACT_APP_CLIENT_URL}/login?returnTo=${window.location.origin}/profile-page`,
      );
    }
  }, [userLoading, isAuthenticated]);

  useEffect(() => {
    if (gameIds.length === 0) {
      setFavoriteGames([]);
      return;
    }

    setLoadingGames(true);
    dispatch(loadGamesByIds(gameIds))
      .unwrap()
      .then((games) => setFavoriteGames(games))
      .catch(console.error)
      .finally(() => setLoadingGames(false));
  }, [gameIds, dispatch]);

  const handleLogout = () => {
    window.location.assign(`${process.env.REACT_APP_BASE_URL}/logout`);
  };

  if (userLoading || !user) return <div>Loading...</div>;

  return (
    <Box>
      <Bar />

      <VStack spacing={6} p={{ base: 4, md: 16 }}>
        <ElText as="h1" variant="title" weight="bold" color="primary">
          {t('profile.title')}
        </ElText>
        <VStack spacing={6} align="center" w="100%">
          <Image
            src={user.picture || defaultProfile}
            alt="avatar"
            boxSize={{ base: '80px', md: '120px' }}
            borderRadius="full"
            objectFit="cover"
            referrerPolicy="no-referrer"
          />
        </VStack>
        <HStack>
          <VStack justify="space-between" mb={2}>
            <ElText variant="subtitle" weight="bold">
              {t('profile.name')}
            </ElText>
            <ElText variant="subtitle" weight="bold">
              {t('profile.email')}
            </ElText>
          </VStack>
          <VStack justify="space-between" mb={2}>
            <ElText>{user.name || 'Not set'}</ElText>
            <ElText>{user.email || 'Not set'}</ElText>
          </VStack>
        </HStack>
        <ElButton variant="danger" onClick={handleLogout}>
          {t('profile.logout')}
        </ElButton>
        <Box w="100%" mt={8}>
          <ElText as="h2" variant="title" weight="bold" mb={4}>
            {t('profile.favorites')}
          </ElText>

          {loadingGames || favoritesLoading ? (
            <ElText>
              {t('profile.loadingFavorites') || 'Loading favorites...'}
            </ElText>
          ) : favoriteGames.length > 0 ? (
            <GamesList games={favoriteGames} />
          ) : (
            <ElText>
              {t('profile.noFavorites') || 'You have no favorite games yet.'}
            </ElText>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Profile;
