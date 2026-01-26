import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Bar from '@components/Bar';
import GameMeta from '@components/GameInfo/GameMeta';
import GameDescription from '@components/GameInfo/GameDescription';
import GameMedia from '@components/GameInfo/GameMedia';
import GameExtras from '@components/GameInfo/GameExtras';

import { AppDispatch, RootState } from 'store/store';
import { resetGames } from '../../store/features/games/games.slice';
import { loadGameById } from '../../store/features/gameInfo/gameInfo.thunks';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { game, loading, error } = useSelector(
    (state: RootState) => state.game,
  );

  useEffect(() => {
    if (!id) return;

    dispatch(loadGameById(id));

    return () => {
      dispatch(resetGames());
    };
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error || !game) return <div>Game not found</div>;

  return (
    <>
      <Bar />
      <GameMeta game={game} />
      <GameDescription game={game} />
      <GameMedia game={game} />
      <GameExtras game={game} />
    </>
  );
};

export default GamePage;
