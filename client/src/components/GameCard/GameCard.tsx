import React from 'react';
import './gameCard.css';
import rating from '@assets/images/rating.png';
import { GameCardProps } from './GameCard.types';
import ElText from '@elements/ElText';
import Tag from '@elements/Tag';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { t } = useTranslation();
  return (
    <NavLink to={`/game/${game.id}`} className="game-card-link">
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
        {game.rating && (
          <div className="game-card-rating">
            <img src={rating} alt="Rating" />
            <ElText as="span" variant="body" weight="bold" color="primary">
              {Math.round(game.rating)}/100
            </ElText>
          </div>
        )}
        {game.genres && (
          <div className="game-card-tags">
            <ElText as="h3" variant="body" weight="bold" color="primary">
              {t('gameCard.genres')}
            </ElText>
            {game.genres.map((genre) => (
              <Tag key={genre.id} type="genre">
                {genre.name}
              </Tag>
            ))}
          </div>
        )}
        {game.platforms && (
          <div className="game-card-tags">
            <ElText as="h3" variant="body" weight="bold" color="primary">
              {t('gameCard.platforms')}
            </ElText>
            {game.platforms.map((platform) => (
              <Tag key={platform.id} type="platform">
                {platform.name}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default GameCard;
