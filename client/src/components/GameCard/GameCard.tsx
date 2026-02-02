import React from 'react';
import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import rating from '@assets/images/rating.png';
import calendar from '@assets/images/calendar.png';
import { GameCardProps } from './GameCard.types';
import Tag from '@elements/Tag';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const MotionLinkBox = motion.create(LinkBox);

const CARD_HEIGHT = '540px';
const IMAGE_HEIGHT = '280px';
const SPACING = 24;

const GameCard: React.FC<GameCardProps> = ({ game, isComingSoon = false }) => {
  const { t } = useTranslation();

  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString()
    : 'TBA';

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      minHeight={CARD_HEIGHT}
    >
      <MotionLinkBox
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="blue.100"
        p={5}
        flex="1"
        display="flex"
        flexDirection="column"
        height="100%"
        whileHover={
          isComingSoon
            ? {}
            : {
                y: -8,
                scale: 1.02,
                boxShadow: '0px 14px 28px rgba(0,0,0,0.15)',
                transition: {
                  type: 'spring',
                  stiffness: 280,
                  damping: 20,
                },
              }
        }
      >
        <Box
          height={IMAGE_HEIGHT}
          mb={3}
          borderRadius="md"
          overflow="hidden"
          bg="blue.50"
          flexShrink={0}
          position="relative"
        >
          {game.cover ? (
            <Image
              src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
              alt={game.name}
              position="absolute"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          ) : (
            <Flex
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.400">No Image</Text>
            </Flex>
          )}
        </Box>

        <Flex direction="column" flex="1" overflow="hidden">
          <Heading
            size="md"
            color="gray.800"
            noOfLines={2}
            lineHeight="1.3"
            mb={`${SPACING / 4}px`}
          >
            {isComingSoon ? (
              game.name
            ) : (
              <LinkOverlay as={NavLink} to={`/game/${game.id}`}>
                {game.name}
              </LinkOverlay>
            )}
          </Heading>

          <Flex align="center" gap={2} mb={`${SPACING / 4}px`}>
            <Image
              src={isComingSoon ? calendar : rating}
              alt={isComingSoon ? 'Calendar' : 'Rating'}
              boxSize="18px"
              sx={{ imageRendering: 'pixelated' }}
            />
            <Text
              fontSize="sm"
              color="gray.500"
              fontWeight={isComingSoon ? 'normal' : 'bold'}
            >
              {isComingSoon
                ? releaseDate
                : game.rating
                  ? `${Math.round(game.rating)}/100`
                  : '-'}
            </Text>
          </Flex>

          <Box h={`${SPACING / 2}px`} />

          <Box flex="1" overflow="auto">
            {game.genres && (
              <Box mb={`${SPACING / 4}px`}>
                <Text fontWeight="bold" mb="4px" color="gray.800" fontSize="sm">
                  {t('gameCard.genres')}
                </Text>
                <Flex gap={2} wrap="wrap">
                  {game.genres.slice(0, 3).map((genre) => (
                    <Tag key={genre.id} type="genre" size="sm">
                      {genre.name}
                    </Tag>
                  ))}
                </Flex>
              </Box>
            )}

            {!isComingSoon && game.platforms && (
              <Box>
                <Text fontWeight="bold" mb="4px" color="gray.800" fontSize="sm">
                  {t('gameCard.platforms')}
                </Text>
                <Flex gap={2} wrap="wrap">
                  {game.platforms.slice(0, 3).map((platform) => (
                    <Tag key={platform.id} type="platform" size="sm">
                      {platform.name}
                    </Tag>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </MotionLinkBox>
    </Box>
  );
};

export default GameCard;
