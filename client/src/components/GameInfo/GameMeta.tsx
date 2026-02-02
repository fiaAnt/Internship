import React, { useState } from 'react';
import { Box, Flex, Image, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import ElText from '@elements/ElText';
import { motion } from 'framer-motion';
import Tag from '@elements/Tag';
import { GameInfo } from 'types/gameInfo';
import { useTranslation } from 'react-i18next';
import selected from '@assets/images/selected.png';
import notSelected from '@assets/images/notSelected.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { toggleFavorite } from '@store/features/favorites/favorites.thunks';

const MotionImage = motion(Image);

const GameMeta = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.gameIds.includes(String(game.id)),
  );

  const handleFavoriteClick = () => {
    if (!user?.sub) return;

    dispatch(
      toggleFavorite({
        auth0Id: user.sub,
        gameId: String(game.id),
      }),
    );
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg="gray.50"
      p={{ base: 6, md: 16 }}
      borderRadius="2xl"
      gap={{ base: 6, md: 10 }}
      mb={6}
      align={{ base: 'center', md: 'flex-start' }}
    >
      {game.cover && (
        <Image
          src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
          alt={game.name}
          borderRadius="2xl"
          objectFit="cover"
          boxSize={{ base: '260px', md: '280px' }}
          flexShrink={0}
        />
      )}

      <VStack align="stretch" spacing={5} flex={1}>
        <ElText as="h1" variant="title" weight="bold">
          {game.name}
        </ElText>

        {game.rating && (
          <ElText as="p" variant="subtitle">
            {t('gameMeta.rating')}: {Math.round(game.rating)}/100
          </ElText>
        )}

        {game.first_release_date && (
          <ElText as="p" variant="body">
            {t('gameMeta.release')}:{' '}
            {new Date(game.first_release_date * 1000).toLocaleDateString()}
          </ElText>
        )}

        {game.genres && (
          <Box>
            <ElText as="p" variant="body" mb={2}>
              {t('gameMeta.genres')}:
            </ElText>
            <Wrap spacing={2}>
              {game.genres.map((g) => (
                <WrapItem key={g.id}>
                  <Tag type="genre">{g.name}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        {game.platforms && (
          <Box>
            <ElText as="p" variant="body" mb={2}>
              {t('gameMeta.platforms')}:
            </ElText>
            <Wrap spacing={2}>
              {game.platforms.map((p) => (
                <WrapItem key={p.id}>
                  <Tag type="platform">{p.name}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        {game.themes && (
          <Box>
            <ElText as="p" variant="body" mb={2}>
              {t('gameMeta.themes')}:
            </ElText>
            <Wrap spacing={2}>
              {game.themes.map((tItem) => (
                <WrapItem key={tItem.id}>
                  <Tag>{tItem.name}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}
      </VStack>
      <VStack>
        <MotionImage
          onClick={handleFavoriteClick}
          src={isFavorite ? selected : notSelected}
          alt="favorite"
          boxSize="50px"
          cursor="pointer"
          whileTap={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      </VStack>
    </Flex>
  );
};

export default GameMeta;
