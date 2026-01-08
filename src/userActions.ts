import { SELECTORS } from "./constants";
import { navigateToLogin, navigateToRegister, navigateToSettings } from "./navigation";

export async function isUserLoggedIn(): Promise<boolean> {
    try {
        await page.waitForSelector(SELECTORS.LOGIN_LINK, { timeout: 3000 });
        return false;
    } catch {
        const profileLinks = await page.$$(SELECTORS.PROFILE_LINK);
        return profileLinks.length > 0;
    }
}


export async function registerUser(username: string, email: string, password: string): Promise<void> {
    try {
        await navigateToRegister();

        await page.type(SELECTORS.USERNAME_INPUT, username);
        await page.type(SELECTORS.EMAIL_INPUT, email);
        await page.type(SELECTORS.PASSWORD_INPUT, password);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }),
            page.click(SELECTORS.SUBMIT_BUTTON)
        ]);

        await page.waitForSelector(SELECTORS.USER_PROFILE_LINK(username), {
            visible: true,
            timeout: 10000
        });

        console.log(`Registered: ${username}`);
    } catch (error) {
        throw new Error(`Failed to register user ${username}: ${error.message}`);
    }
}

export async function loginUser(email: string, password: string): Promise<void> {
    try {
        const loggedIn = await isUserLoggedIn();
        if (loggedIn) {
            console.log('User is already logged in');
            return;
        }

        await navigateToLogin();

        await page.type(SELECTORS.EMAIL_INPUT, email);
        await page.type(SELECTORS.PASSWORD_INPUT, password);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }),
            page.click(SELECTORS.SUBMIT_BUTTON)
        ]);

        await page.waitForSelector(SELECTORS.PROFILE_LINK, { timeout: 5000 });
        console.log('Logged in');
    } catch (error) {
        throw new Error(`Failed to login with email ${email}: ${error.message}`);
    }
}

export async function ensureUserLoggedIn(
    email: string,
    password: string
): Promise<void> {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) {
        await loginUser(email, password);
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await navigateToSettings();
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }),
            page.click(SELECTORS.LOGOUT_BUTTON)
        ]);

        await page.waitForSelector(SELECTORS.LOGIN_LINK, { visible: true, timeout: 5000 });
        console.log('Logged out');
    } catch (error) {
        throw new Error(`Failed to logout: ${error.message}`);
    }
}