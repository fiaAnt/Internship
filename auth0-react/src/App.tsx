import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import './index.css';

function App() {
  const { isAuthenticated, isLoading, error, getAccessTokenSilently } =
    useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://proba-api',
        },
      });

      const res = await fetch('http://localhost:3000/api/private', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Error calling API');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="app-container">
      <h1>Auth0 Proba</h1>

      {isAuthenticated ? (
        <>
          <Profile />
          <div className="buttons">
            <button className="button-api" onClick={callApi}>
              Call protected API
            </button>
            <LogoutButton />
          </div>
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
