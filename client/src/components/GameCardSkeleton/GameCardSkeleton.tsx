import React from 'react';
import { Box, Skeleton, Flex } from '@chakra-ui/react';

const CARD_HEIGHT = '540px';
const IMAGE_HEIGHT = '280px';

const GameCardSkeleton: React.FC = () => (
  <Box
    borderRadius="lg"
    overflow="hidden"
    borderWidth="1px"
    borderColor="blue.100"
    bg="white"
    shadow="sm"
    height={CARD_HEIGHT}
    display="flex"
    flexDirection="column"
  >
    <Skeleton height={IMAGE_HEIGHT} width="100%" />

    <Box p={5} flex="1" display="flex" flexDirection="column">
      <Skeleton height="3.5rem" mb={2} />
      <Flex gap={2} mb={2}>
        <Skeleton height="18px" width="60px" />
      </Flex>
      <Box flex="1" minHeight="0.5rem" />
      <Flex gap={2} wrap="wrap">
        <Skeleton height="24px" width="50px" borderRadius="md" />
        <Skeleton height="24px" width="50px" borderRadius="md" />
      </Flex>
    </Box>
  </Box>
);

export default GameCardSkeleton;
