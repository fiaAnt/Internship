import { useEffect } from 'react';
import { userManager } from './oidc';

export default function Callback() {
  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        window.location.href = '/';
      })
      .catch(console.error);
  }, []);

  return <div>Signing in...</div>;
}
