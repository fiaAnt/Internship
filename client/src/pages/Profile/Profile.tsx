import React, { useEffect, useState } from 'react';
import defaultProfile from '@assets/images/profile.png';
import { User } from 'types/User';
import Bar from '@components/Bar';
import './profile.css';
import ElText from '@elements/ElText';
import ElButton from '@elements/ElButton';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:3001/api/user', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setUser(data.user);
        } else {
          window.location.href =
            'http://localhost:3001/login?returnTo=http://localhost:3000/profile-page';
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        window.location.href =
          'http://localhost:3001/login?returnTo=http://localhost:3000/profile-page';
      });
  }, []);

  const handleLogout = () => {
    window.location.href = 'http://localhost:3001/logout';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Bar />
      <div className="profile-container">
        <ElText as="h1" variant="title" weight="bold" color="primary">
          {t('profile.title')}
        </ElText>
        <img
          className="profile-avatar"
          src={user!.picture || defaultProfile}
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <div className="profile-row">
          <ElText as="span" variant="subtitle" weight="bold">
            {t('profile.name')}
          </ElText>
          <ElText as="span">{user!.name || 'Not set'}</ElText>
        </div>
        <div className="profile-row">
          <ElText as="span" variant="subtitle" weight="bold">
            {t('profile.email')}
          </ElText>
          <ElText as="span">{user!.email || 'Not set'}</ElText>
        </div>
        <ElButton variant="primary" onClick={() => i18n.changeLanguage('ru')}>
          {t('profile.ru')}
        </ElButton>{' '}
        <ElButton variant="primary" onClick={() => i18n.changeLanguage('eng')}>
          {t('profile.eng')}
        </ElButton>
        <ElButton variant="danger" onClick={handleLogout}>
          {t('profile.logout')}
        </ElButton>
      </div>
    </div>
  );
};

export default Profile;
