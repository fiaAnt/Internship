import { useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { User } from 'oidc-client-ts';
import { userManager } from './oidc';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [protectedData, setProtectedData] = useState<string | null>(null);

  useEffect(() => {
    userManager.getUser().then((u) => setUser(u));
  }, []);

  useEffect(() => {
    const fetchProtected = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/private`,
          {
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );
        if (!res.ok) {
          console.error('Server response:', res.status, await res.text());
          setProtectedData(`Error: ${res.status}`);
          return;
        }
        const data = await res.json();
        setProtectedData(data.message);
      } catch (err) {
        console.error(err);
        setProtectedData('Error fetching protected data');
      }
    };
    fetchProtected();
  }, [user]);

  if (!user) return <LoginButton />;

  return (
    <div>
      <h1>OIDC Proba</h1>
      <Profile />
      <p>
        <strong>Protected API response:</strong> {protectedData ?? 'Loading...'}
      </p>
      <LogoutButton />
    </div>
  );
}

export default App;
