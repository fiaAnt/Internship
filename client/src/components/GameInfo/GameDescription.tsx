import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import { useTranslation } from 'react-i18next';

const GameDescription = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  if (!game.summary && !game.storyline) return null;

  return (
    <Box bg="gray.100" p={{ base: 4, md: 16 }} borderRadius="md" mb={6}>
      <VStack spacing={6} align="stretch">
        {game.summary && (
          <Box>
            <ElText as="h3" variant="subtitle" weight="bold" mb={2}>
              {t('gameDescription.summary')}
            </ElText>
            <ElText as="p">{game.summary}</ElText>
          </Box>
        )}

        {game.storyline && (
          <Box>
            <ElText as="h3" variant="subtitle" weight="bold" mb={2}>
              {t('gameDescription.storyline')}
            </ElText>
            <ElText as="p">{game.storyline}</ElText>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GameDescription;
