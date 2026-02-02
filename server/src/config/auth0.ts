export function getAuthConfig() {
    const { AUTH0_SESSION_SECRET, AUTH0_CLIENT_ID, API_BASE_URL } = process.env;

    if (!AUTH0_SESSION_SECRET || !AUTH0_CLIENT_ID) {
        throw new Error('Missing Auth0 environment variables. Check your .env file!');
    }

    return {
        authRequired: false,
        auth0Logout: true,
        baseURL: `${API_BASE_URL}`,
        clientID: AUTH0_CLIENT_ID,
        issuerBaseURL: 'https://dev-m4zzyipdlsq4qe6h.us.auth0.com',
        secret: AUTH0_SESSION_SECRET,
        routes: {
            login: '/login',
            logout: '/logout',
            callback: '/callback',
            postLogoutRedirect: `${process.env.CLIENT_URL}/`,
        },
    };
}
