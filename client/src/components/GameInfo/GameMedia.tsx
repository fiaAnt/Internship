import React, { useRef } from 'react';
import { Box, Flex, Image, HStack } from '@chakra-ui/react';
import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import { useTranslation } from 'react-i18next';

const GameMedia = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;

    if (el.scrollLeft <= 0) {
      el.scrollLeft = half;
    }

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
      el.scrollLeft = half - el.clientWidth;
    }
  };

  const screenshotsLoop = [
    ...(game.screenshots ?? []),
    ...(game.screenshots ?? []),
  ];

  if (!game.screenshots && !game.videos) return null;

  return (
    <Box bg="gray.100" p={{ base: 4, md: 16 }} borderRadius="md" mb={6}>
      {game.screenshots && (
        <Box mb={6}>
          <ElText as="h3" variant="subtitle" weight="bold" mb={4}>
            {t('gameMedia.screenshots')}
          </ElText>
          <Flex
            ref={scrollRef}
            onScroll={handleScroll}
            gap={4}
            overflowX="auto"
            pb={2}
            sx={{
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.300',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': { bg: 'gray.100' },
            }}
          >
            {screenshotsLoop.map((s, i) => (
              <Image
                key={i}
                src={`https:${s.url.replace('t_thumb', 't_screenshot_big')}`}
                alt=""
                flex="0 0 auto"
                w="320px"
                h="250px"
                borderRadius="md"
                objectFit="cover"
              />
            ))}
          </Flex>
        </Box>
      )}
      {game.videos && (
        <Box>
          <ElText as="h3" variant="subtitle" weight="bold" mb={4}>
            {t('gameMedia.videos')}
          </ElText>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            flexWrap="wrap"
          >
            {game.videos.slice(0, 3).map((v, i) => (
              <Box key={i} flex="1 1 100%" maxW={{ md: '33%' }}>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${v.video_id}`}
                  allowFullScreen
                  style={{ borderRadius: '12px', border: 'none' }}
                  loading="lazy"
                />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default GameMedia;
