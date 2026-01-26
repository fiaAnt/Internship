import React from 'react';
import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import './gameInfo.css';
import { useTranslation } from 'react-i18next';

const GameExtras = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  return (
    <div className="game-extras">
      {game.involved_companies && (
        <div>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameExtras.companies')}
          </ElText>
          {game.involved_companies.map((c, i) => (
            <span key={i}>{c.company.name}</span>
          ))}
        </div>
      )}

      {game.similar_games && (
        <div>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameExtras.similarGames')}
          </ElText>
          <div className="similar-games">
            {game.similar_games.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
        </div>
      )}

      {game.websites && (
        <div>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameExtras.websites')}
          </ElText>
          {game.websites.map((w, i) => (
            <a key={i} href={w.url} target="_blank" rel="noreferrer">
              {w.url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameExtras;
