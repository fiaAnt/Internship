import React from 'react';
import { FiltersProps } from './FiltersContainer.types';
import './filtersContainer.css';
import ElButton from '@elements/ElButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

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

  const { genres, platforms } = useSelector(
    (state: RootState) => state.filtersData,
  );
  return (
    <>
      <div className="filters-container">
        <div className="filters-wrapper">
          <select
            className="filter-select"
            value={genreId ?? ''}
            onChange={(e) =>
              setGenreId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">{t('filters.selectGenre')}</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-wrapper">
          <select
            className="filter-select"
            value={platformId ?? ''}
            onChange={(e) =>
              setPlatformId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">{t('filters.selectPlatform')}</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-wrapper">
          <select
            className="filter-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">{t('filters.selectYear')}</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </div>
        <ElButton variant="primary" onClick={onApply}>
          {t('filters.apply')}
        </ElButton>
      </div>
    </>
  );
};

export default FiltersContainer;
