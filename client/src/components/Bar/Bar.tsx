import React, { useEffect } from 'react';
import './bar.css';
import ElText from '@elements/ElText';
import gamepad from '@assets/images/gamepad.png';
import defaultProfile from '@assets/images/profile.png';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { loadUser } from '@store/features/user/user.thunks';

const Bar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleProfileClick = () => {
    if (isAuthenticated && user) {
      window.location.href = '/profile-page';
    } else {
      window.location.href = `http://localhost:3001/login?returnTo=${window.location.origin}/profile-page`;
    }
  };
  return (
    <div className="bar">
      <div className="bar-left">
        <img src={gamepad} alt="Gamepad" className="logo" />
        <ElText as="h1" variant="title" weight="bold" color="header">
          {t('header.title')}
        </ElText>
        <div className="bar-nav">
          <NavLink to="/">
            {({ isActive }) => (
              <ElText
                as="span"
                variant="navigation"
                weight={isActive ? 'bold' : 'medium'}
                color="header"
                className={isActive ? 'nav-link-active' : ''}
              >
                {t('header.explore')}
              </ElText>
            )}
          </NavLink>
          <NavLink to="/coming-soon">
            {({ isActive }) => (
              <ElText
                as="span"
                variant="navigation"
                weight={isActive ? 'bold' : 'medium'}
                color="header"
                className={isActive ? 'nav-link-active' : ''}
              >
                {t('header.comingSoon')}
              </ElText>
            )}
          </NavLink>
        </div>
      </div>

      <div className="auth-section" onClick={handleProfileClick}>
        <img
          src={!loading ? user?.picture || defaultProfile : defaultProfile}
          alt="Profile"
          referrerPolicy="no-referrer"
          className="profile-image"
        />
      </div>
    </div>
  );
};

export default Bar;
