import React from 'react';
import { Box, Wrap, WrapItem, Link, Image } from '@chakra-ui/react';

import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import { useTranslation } from 'react-i18next';

const GameExtras = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  return (
    <Box bg="gray.50" p={{ base: 4, md: 16 }} borderRadius="md" mb={6}>
      {game.involved_companies && (
        <Box mb={6}>
          <ElText as="h3" variant="subtitle" weight="bold" mb={2}>
            {t('gameExtras.companies')}
          </ElText>
          <Wrap spacing={2}>
            {game.involved_companies.map((c, i) => (
              <WrapItem key={i}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                  bg="white"
                >
                  {c.company.name}
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}

      {game.similar_games && (
        <Box mb={6}>
          <ElText as="h3" variant="subtitle" weight="bold" mb={2}>
            {t('gameExtras.similarGames')}
          </ElText>
          <Wrap spacing={2}>
            {game.similar_games.map((g) => (
              <WrapItem key={g.id}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                  bg="white"
                >
                  {g.name}
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
      {game.websites && (
        <Box>
          <ElText as="h3" variant="subtitle" weight="bold" mb={2}>
            {t('gameExtras.websites')}
          </ElText>
          <Wrap spacing={2}>
            {game.websites.map((w, i) => (
              <WrapItem key={i}>
                <Link
                  href={w.url}
                  isExternal
                  px={3}
                  py={1}
                  borderRadius="md"
                  bg="whiteAlpha.800"
                  border="1px solid"
                  borderColor="blue.100"
                  _hover={{ bg: 'blue.50', color: 'blue.600' }}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${new URL(w.url).hostname}`}
                    alt="favicon"
                    boxSize="16px"
                  />
                  {w.url.replace(/^https?:\/\//, '')}
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </Box>
  );
};

export default GameExtras;
