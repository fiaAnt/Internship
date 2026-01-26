import React from 'react';
import ElText from '@elements/ElText';
import Tag from '@elements/Tag';
import { GameInfo } from 'types/gameInfo';
import './gameInfo.css';
import { useTranslation } from 'react-i18next';

const GameMeta = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  return (
    <div className="game-meta">
      {game.cover && (
        <img
          src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
          alt={game.name}
          className="game-meta-img"
        />
      )}
      <div className="game-meta-inf">
        <ElText as="h1" variant="title" weight="bold">
          {game.name}
        </ElText>

        {game.rating && (
          <ElText as="p" variant="subtitle">
            {t('gameMeta.rating')}: {Math.round(game.rating)}/100
          </ElText>
        )}

        {game.first_release_date && (
          <ElText as="p" variant="body">
            {t('gameMeta.release')}:{' '}
            {new Date(game.first_release_date * 1000).toLocaleDateString()}
          </ElText>
        )}

        {game.genres && (
          <div className="game-meta-section">
            <ElText as="p" variant="body">
              {t('gameMeta.genres')}:
            </ElText>
            <div className="game-tags-row">
              {game.genres.map((g) => (
                <Tag key={g.id} type="genre">
                  {g.name}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {game.platforms && (
          <div className="game-meta-section">
            <ElText as="p" variant="body">
              {t('gameMeta.platforms')}:
            </ElText>
            <div className="game-tags-row">
              {game.platforms.map((p) => (
                <Tag key={p.id} type="platform">
                  {p.name}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {game.themes && (
          <div className="game-meta-section">
            <ElText as="p" variant="body">
              {t('gameMeta.themes')}:
            </ElText>
            <div className="game-tags-row">
              {game.themes.map((tItem) => (
                <Tag key={tItem.id}>{tItem.name}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameMeta;
