import React from 'react';
import ElText from '@elements/ElText';
import { GameInfo } from 'types/gameInfo';
import './gameInfo.css';
import { useTranslation } from 'react-i18next';

const GameMedia = ({ game }: { game: GameInfo }) => {
  const { t } = useTranslation();

  if (!game.screenshots && !game.videos) return null;

  return (
    <section className="game-media">
      {game.screenshots && (
        <>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameMedia.screenshots')}
          </ElText>
          <div className="screenshots">
            {game.screenshots.map((s, i) => (
              <img
                key={i}
                src={`https:${s.url.replace('t_thumb', 't_screenshot_big')}`}
                alt=""
              />
            ))}
          </div>
        </>
      )}

      {game.videos && (
        <>
          <ElText as="h3" variant="subtitle" weight="bold">
            {t('gameMedia.videos')}
          </ElText>
          {game.videos.map((v, i) => (
            <iframe
              key={i}
              src={`https://www.youtube.com/embed/${v.video_id}`}
              allowFullScreen
            />
          ))}
        </>
      )}
    </section>
  );
};

export default GameMedia;
