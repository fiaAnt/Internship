import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export const userManager = new UserManager({
    authority: 'https://dev-m4zzyipdlsq4qe6h.us.auth0.com',
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: `${import.meta.env.VITE_CLIENT_URL}/callback`,
    post_logout_redirect_uri: `${import.meta.env.VITE_CLIENT_URL}`,
    response_type: 'code',
    scope: 'openid profile email offline_access',
    extraQueryParams: {
        audience: 'https://proba-api',
    },
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
});
