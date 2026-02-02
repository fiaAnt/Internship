import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
  SimpleGrid,
} from '@chakra-ui/react';
import Bar from '@components/Bar';

const GameDetailSkeleton: React.FC = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Bar />

      <Box maxW="7xl" mx="auto" py={6} px={{ base: 4, md: 6 }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Skeleton
            height="280px"
            width={{ base: '100%', md: '280px' }}
            borderRadius="md"
            flexShrink={0}
          />
          <VStack align="start" spacing={3} flex="1">
            <Skeleton height="32px" width="60%" />
            <Skeleton height="20px" width="30%" />
            <Skeleton height="20px" width="30%" />
            <HStack spacing={2}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  height="24px"
                  width="60px"
                  borderRadius="md"
                />
              ))}
            </HStack>
            <HStack spacing={2}>
              <Skeleton height="24px" width="120px" borderRadius="md" />
            </HStack>
            <HStack spacing={2}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  height="24px"
                  width="80px"
                  borderRadius="md"
                />
              ))}
            </HStack>
          </VStack>
        </Flex>
        <Box mt={8}>
          <SkeletonText noOfLines={6} spacing={4} />
        </Box>
        <VStack spacing={4} mt={8} align="stretch">
          {Array.from({ length: 3 }).map((_, i) => (
            <HStack key={i} spacing={3} align="start">
              <Skeleton height="40px" width="40px" borderRadius="full" />
              <VStack spacing={2} align="start" flex="1">
                <Skeleton height="18px" width="30%" />
                <SkeletonText noOfLines={2} spacing={2} />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default GameDetailSkeleton;
