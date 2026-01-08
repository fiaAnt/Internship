import { useEffect, useState } from 'react';
import { User } from 'oidc-client-ts';
import { userManager } from './oidc';
import './index.css';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userManager.getUser().then(setUser);
  }, []);

  if (!user) return null;

  const { name, email, picture } = user.profile;

  return (
    <>
      {picture && <img src={picture} alt={name} className="profile-picture" />}
      <div>
        <div className="profile-name">{name}</div>
        <div className="profile-email">{email}</div>
      </div>
    </>
  );
};

export default Profile;
