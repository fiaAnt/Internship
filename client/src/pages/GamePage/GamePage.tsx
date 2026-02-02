import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentsSection from '@components/Comments/CommentsSection';
import Bar from '@components/Bar';
import GameMeta from '@components/GameInfo/GameMeta';
import GameDescription from '@components/GameInfo/GameDescription';
import GameMedia from '@components/GameInfo/GameMedia';
import GameExtras from '@components/GameInfo/GameExtras';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'store/store';
import { resetGames } from '@store/features/games/games.slice';
import { loadGameById } from '@store/features/gameInfo/gameInfo.thunks';
import GamePageSkeleton from '@components/GamePageSkeleton';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const {
    user,
    isAuthenticated,
    loading: userLoading,
  } = useSelector((state: RootState) => state.user);
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

  if (loading) return <GamePageSkeleton />;
  if (error || !game) return <div>Game not found</div>;

  return (
    <>
      <Bar />
      <GameMeta game={game} />
      <GameDescription game={game} />
      <GameMedia game={game} />
      <GameExtras game={game} />
      {!userLoading && isAuthenticated && user?.sub && (
        <CommentsSection
          gameId={String(game.id)}
          auth0Id={user.sub}
          userName={user.name}
          userAvatar={user.picture}
        />
      )}
    </>
  );
};

export default GamePage;
