import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FiltersContainer from '../FiltersContainer';
import ElButton from '@elements/ElButton';
import './search.css';
import { useTranslation } from 'react-i18next';

import { RootState, AppDispatch } from '@store/store';
import { applyFilters } from '@store/features/games/games.slice';
import { loadGames } from '@store/features/games/games.thunks';
import { loadFiltersData } from '@store/features/filtersData/filtersData.thunks';

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const {
    genres,
    platforms,
    loading: filtersLoading,
  } = useSelector((state: RootState) => state.filtersData);

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

  const apply = () => {
    dispatch(
      applyFilters({
        search,
        genreId,
        platformId,
        year,
      }),
    );
    dispatch(loadGames());
  };

  return (
    <div className="search-panel">
      <div className="search-panel-container">
        <input
          className="search-panel-input"
          placeholder={t('search.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={filtersLoading}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
        />
        <ElButton variant="primary" onClick={() => setIsVisible((v) => !v)}>
          {isVisible ? '⯅' : '⯆'}
        </ElButton>
      </div>

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
    </div>
  );
};

export default SearchPanel;
