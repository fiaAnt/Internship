import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }
  const { picture, name, email } = user ?? {};
  return isAuthenticated && user ? (
    <>
      <img
        src={picture}
        alt={name || 'User'}
        className="profile-picture"
        onError={() => {
          throw new Error('что-то пошло не так');
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div className="profile-name">{name}</div>
        <div className="profile-email">{email}</div>
      </div>
    </>
  ) : null;
};

export default Profile;
