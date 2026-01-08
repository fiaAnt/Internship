import { SELECTORS } from './constants';

export async function navigateToRegister(): Promise<void> {
    try {
        await page.click(SELECTORS.REGISTER_LINK);
        await page.waitForSelector(SELECTORS.USERNAME_INPUT, { visible: true });
    } catch (error) {
        throw new Error(`Failed to navigate to register page: ${error.message}`);
    }
}

export async function navigateToLogin(): Promise<void> {
    try {
        await page.click(SELECTORS.LOGIN_LINK);
        await page.waitForSelector(SELECTORS.EMAIL_INPUT, { visible: true });
    } catch (error) {
        throw new Error(`Failed to navigate to login page: ${error.message}`);
    }
}

export async function navigateToSettings(): Promise<void> {
    try {
        await page.click(SELECTORS.SETTINGS_LINK);
        await page.waitForSelector(SELECTORS.LOGOUT_BUTTON, { visible: true });
    } catch (error) {
        throw new Error(`Failed to navigate to settings page: ${error.message}`);
    }
}

export async function navigateToEditor(): Promise<void> {
    try {
        await page.click(SELECTORS.EDITOR_LINK);
        await page.waitForSelector(SELECTORS.ARTICLE_TITLE_INPUT, { visible: true });
    } catch (error) {
        throw new Error(`Failed to navigate to editor page: ${error.message}`);
    }
}

export async function navigateToHome(
    waitUntil: 'domcontentloaded' | 'networkidle0' = 'domcontentloaded'
): Promise<void> {
    await page.goto(process.env.BR_URL, { waitUntil });
}