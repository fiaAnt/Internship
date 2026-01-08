import { userManager } from './oidc';
import './index.css';

const LogoutButton = () => {
  const logout = async () => {
    await userManager.signoutRedirect();
  };

  return (
    <button onClick={logout} className="button-logout">
      Log Out
    </button>
  );
};

export default LogoutButton;
