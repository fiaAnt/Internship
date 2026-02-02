import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Box, VStack, HStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

import FiltersContainer from '../FiltersContainer';
import { RootState, AppDispatch } from '@store/store';
import { applyFilters } from '@store/features/games/games.slice';
import { loadGames } from '@store/features/games/games.thunks';
import { loadFiltersData } from '@store/features/filtersData/filtersData.thunks';
import ElButton from '@components/elements/ElButton';

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const {
    genres = [],
    platforms = [],
    loading: filtersLoading = false,
  } = useSelector((state: RootState) => state.filtersData ?? {});

  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState<number | null>(null);
  const [platformId, setPlatformId] = useState<number | null>(null);
  const [year, setYear] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (genres.length === 0 || platforms.length === 0) {
      dispatch(loadFiltersData());
    }
  }, [dispatch, genres.length, platforms.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      apply();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, genreId, platformId, year]);

  const apply = () => {
    const hasFilters =
      search.trim() || genreId !== null || platformId !== null || year.trim();

    if (!hasFilters) {
      dispatch(
        applyFilters({
          search: '',
          genreId: null,
          platformId: null,
          year: '',
        }),
      );
    } else {
      dispatch(
        applyFilters({
          search,
          genreId,
          platformId,
          year,
        }),
      );
    }

    dispatch(loadGames());
  };

  return (
    <Box
      width="100%"
      maxW="900px"
      mx="auto"
      px={6}
      py={5}
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      border="1px solid"
      borderColor="blue.100"
    >
      <VStack spacing={4} width="100%">
        <HStack width="100%" spacing={3}>
          <Input
            placeholder={t('search.placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            isDisabled={filtersLoading}
            flex={1}
            size="md"
          />
          <ElButton
            onClick={() => setIsVisible((v) => !v)}
            width="48px"
            px={0}
            bg="blue.500"
            variant="secondary"
            color="white"
            name="show filters"
            aria-label="Show filters"
          >
            {isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ElButton>
        </HStack>
        {isVisible && (
          <FiltersContainer
            genreId={genreId}
            setGenreId={setGenreId}
            platformId={platformId}
            setPlatformId={setPlatformId}
            year={year}
            setYear={setYear}
            onApply={apply}
          />
        )}
      </VStack>
    </Box>
  );
};

export default SearchPanel;
