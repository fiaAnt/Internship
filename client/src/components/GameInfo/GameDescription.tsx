import React from 'react';
import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import './gameInfo.css';
import { useTranslation } from 'react-i18next';

const GameDescription = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  if (!game.summary && !game.storyline) return null;

  return (
    <div className="game-description">
      {game.summary && (
        <div className="game-description-summary">
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameDescription.summary')}
          </ElText>
          <ElText as="p">{game.summary}</ElText>
        </div>
      )}

      {game.storyline && (
        <div>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameDescription.storyline')}
          </ElText>
          <ElText as="p">{game.storyline}</ElText>
        </div>
      )}
    </div>
  );
};

export default GameDescription;
