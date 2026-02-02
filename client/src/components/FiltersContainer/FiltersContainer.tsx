import React from 'react';
import { Box, Select, HStack, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { FiltersProps } from './FiltersContainer.types';
import { RootState } from '@store/store';
import ElButton from '@components/elements/ElButton';

const FiltersContainer: React.FC<FiltersProps> = ({
  genreId,
  setGenreId,
  platformId,
  setPlatformId,
  year,
  setYear,
  onApply,
}) => {
  const { t } = useTranslation();

  const {
    genres = [],
    platforms = [],
    loading,
  } = useSelector((state: RootState) => state.filtersData);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <Box width="100%" pt={2} borderTop="1px solid" borderColor="blue.100">
      <HStack spacing={3} width="100%" flexWrap="wrap">
        <Select
          placeholder={t('filters.selectGenre')}
          value={genreId ?? ''}
          isDisabled={loading}
          onChange={(e) =>
            setGenreId(e.target.value ? Number(e.target.value) : null)
          }
          flex={{ base: '1 1 100%', md: 1 }}
          size="md"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>

        <Select
          placeholder={t('filters.selectPlatform')}
          value={platformId ?? ''}
          isDisabled={loading}
          onChange={(e) =>
            setPlatformId(e.target.value ? Number(e.target.value) : null)
          }
          flex={{ base: '1 1 100%', md: 1 }}
          size="md"
          minW="0"
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </Select>

        <Select
          placeholder={t('filters.selectYear')}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          flex={{ base: '1 1 100%', md: 1 }}
          size="md"
        >
          {years.map((y) => (
            <option key={y} value={y.toString()}>
              {y}
            </option>
          ))}
        </Select>

        <ElButton
          onClick={onApply}
          bg="blue.500"
          color="white"
          variant="secondary"
          aria-label="Apply filters"
        >
          {t('filters.apply')}
        </ElButton>
      </HStack>
    </Box>
  );
};

export default FiltersContainer;
