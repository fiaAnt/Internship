import React from 'react';
import Bar from '@components/Bar';
import { ComingSoonGameCard } from '@components/GameCard';
import Skeleton from '@components/Skeleton';
import { useGamesExplorer } from '@hooks/useGamesList';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import ElText from '@elements/ElText';
import { useTranslation } from 'react-i18next';
import './ComingSoonGames.css';

const ComingSoonGames: React.FC = () => {
  const { games, loading, hasMore, loadGames } =
    useGamesExplorer('/api/coming-soon');

  useInfiniteScroll(loadGames, loading, hasMore);
  const { t } = useTranslation();

  return (
    <div>
      <Bar />
      <div className="coming-soon-title">
        <ElText as="h2" variant="subtitle" weight="bold" color="accent">
          {t('comingSoon.text')}
        </ElText>
      </div>
      <div className="games-container">
        {loading &&
          games.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={`skeleton-${i}`} />
          ))}
        {games.map((game) => (
          <ComingSoonGameCard key={game.id} game={game} />
        ))}
      </div>
      {!hasMore}
    </div>
  );
};

export default ComingSoonGames;
