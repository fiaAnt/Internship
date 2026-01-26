import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bar from '@components/Bar';
import GamesList from '@components/GameList';
import SearchPanel from '@components/SearchPanel';
import Skeleton from '@components/Skeleton';
import { IGDBItem } from 'types/igdb';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { AppDispatch, RootState } from 'store/store';
import { loadGames } from '@store/features/games/games.thunks';

const Explore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { games, loading, hasMore } = useSelector(
    (state: RootState) => state.games,
  );

  useInfiniteScroll(() => dispatch(loadGames()), loading, hasMore);

  useEffect(() => {
    dispatch(loadGames());
  }, []);

  const genres: IGDBItem[] = [];
  const platforms: IGDBItem[] = [];

  return (
    <div>
      <Bar />

      <SearchPanel genres={genres} platforms={platforms} isLoading={loading} />

      <div className="games-container">
        {loading &&
          games.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}

        <GamesList games={games} />
      </div>
    </div>
  );
};

export default Explore;
