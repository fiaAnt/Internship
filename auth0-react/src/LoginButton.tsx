import { userManager } from './oidc';
import './index.css';

export default function LoginButton() {
  const login = async () => {
    await userManager.removeUser();
    await userManager.clearStaleState();
    await userManager.signinRedirect();
  };

  return (
    <button className="button-login" onClick={login}>
      Login
    </button>
  );
}
