import React, { useEffect } from 'react';
import { Box, Flex, HStack, VStack, Image, Switch } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import gamepad from '@assets/images/gamepad.png';
import defaultProfile from '@assets/images/profile.png';
import ElText from '@elements/ElText';
import { AppDispatch, RootState } from '@store/store';
import { loadUser } from '@store/features/user/user.thunks';
import { loadFavorites } from '@store/features/favorites/favorites.thunks';

const Bar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(loadUser());
    }
  }, [dispatch, user, loading]);
  useEffect(() => {
    if (user?.sub) {
      dispatch(loadFavorites(user.sub));
    }
  }, [dispatch, user]);

  const handleProfileClick = () => {
    if (!loading && isAuthenticated && user) {
      navigate('/profile-page');
    } else {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/login?returnTo=${window.location.origin}/profile-page`;
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'eng' : 'ru');
  };

  return (
    <Flex
      as="header"
      w="100%"
      align="center"
      justify="space-between"
      py={{ base: 3, md: 6 }}
      px={{ base: 4, md: 16 }}
      bg="blue.600"
      boxShadow="sm"
    >
      <HStack spacing={4}>
        <Image src={gamepad} alt="Gamepad" w="60px" h="40px" />

        <VStack spacing={0} align="flex-start">
          <ElText as="h1" variant="title" weight="bold" color="header">
            {t('header.title')}
          </ElText>

          <HStack spacing={4}>
            <NavLink to="/">
              {({ isActive }) => (
                <ElText
                  as="span"
                  variant="navigation"
                  weight={isActive ? 'bold' : 'medium'}
                  color="header"
                >
                  {t('header.explore')}
                </ElText>
              )}
            </NavLink>

            <NavLink to="/coming-soon">
              {({ isActive }) => (
                <ElText
                  as="span"
                  variant="navigation"
                  weight={isActive ? 'bold' : 'medium'}
                  color="header"
                >
                  {t('header.comingSoon')}
                </ElText>
              )}
            </NavLink>
          </HStack>
        </VStack>
      </HStack>

      <HStack spacing={3}>
        <Switch
          isChecked={i18n.language === 'ru'}
          onChange={toggleLanguage}
          size="sm"
          colorScheme="whiteAlpha"
          aria-label="Switch language"
        />
        <ElText fontSize="sm" color="header">
          {i18n.language.toUpperCase()}
        </ElText>

        <Box
          onClick={handleProfileClick}
          cursor="pointer"
          borderRadius="full"
          overflow="hidden"
          w="40px"
          h="40px"
        >
          <Image
            src={!loading ? user?.picture || defaultProfile : defaultProfile}
            alt="Profile"
            objectFit="cover"
            referrerPolicy="no-referrer"
          />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Bar;
