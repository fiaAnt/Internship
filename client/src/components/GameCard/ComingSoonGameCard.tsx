import React from 'react';
import './gameCard.css';
import calendar from '@assets/images/calendar.png';
import { GameCardProps } from './GameCard.types';
import ElText from '@elements/ElText';
import Tag from '@elements/Tag';
import { useTranslation } from 'react-i18next';

const ComingSoonGameCard: React.FC<GameCardProps> = ({ game }) => {
  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString()
    : 'TBA';
  const { t } = useTranslation();

  return (
    <div className="game-card">
      {game.cover && (
        <img
          src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
          alt={game.name}
          className="game-card-image"
        />
      )}
      <ElText as="h2" variant="subtitle" weight="bold" color="primary">
        {game.name}
      </ElText>

      <div className="game-card-release-date">
        <img src={calendar} alt="Calendar" />
        <ElText as="p" variant="caption" weight="medium" color="primary">
          {releaseDate}
        </ElText>
      </div>

      {game.genres && (
        <div className="game-card-tags">
          <ElText as="p" variant="body" weight="bold" color="primary">
            {t('gameCard.genres')}
          </ElText>
          {game.genres.map((g) => (
            <Tag key={g.id} type="genre">
              {g.name}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComingSoonGameCard;
