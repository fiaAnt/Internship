import { BR_URL, SELECTORS } from './constants';

export async function setupPage(): Promise<void> {
    console.log('Page available?', typeof page !== 'undefined');
    await page.goto(BR_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(SELECTORS.NAVBAR, { timeout: 10000 });
}

export async function isUserLoggedIn(): Promise<boolean> {
    try {
        await page.waitForSelector(SELECTORS.LOGIN_LINK, { timeout: 3000 });
        return false;
    } catch {
        const profileLinks = await page.$$('a[href^="/@"]');
        return profileLinks.length > 0;
    }
}

export async function navigateToRegister(): Promise<void> {
    await page.click(SELECTORS.REGISTER_LINK);
    await page.waitForSelector(SELECTORS.USERNAME_INPUT, { visible: true });
}

export async function navigateToLogin(): Promise<void> {
    await page.click(SELECTORS.LOGIN_LINK);
    await page.waitForSelector(SELECTORS.EMAIL_INPUT, { visible: true });
}

export async function navigateToSettings(): Promise<void> {
    await page.click(SELECTORS.SETTINGS_LINK);
    await page.waitForSelector(SELECTORS.LOGOUT_BUTTON, { visible: true });
}

export async function navigateToEditor(): Promise<void> {
    await page.click(SELECTORS.EDITOR_LINK);
    await page.waitForSelector(SELECTORS.ARTICLE_TITLE_INPUT, { visible: true });
}

export async function registerUser(username: string, email: string, password: string): Promise<void> {
    await navigateToRegister();

    await page.type(SELECTORS.USERNAME_INPUT, username);
    await page.type(SELECTORS.EMAIL_INPUT, email);
    await page.type(SELECTORS.PASSWORD_INPUT, password);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(SELECTORS.SUBMIT_BUTTON)
    ]);

    await page.waitForSelector(SELECTORS.USER_PROFILE_LINK(username), {
        visible: true,
        timeout: 10000
    });

    console.log(`Registered: ${username}`);
}

export async function loginUser(email: string, password: string): Promise<void> {
    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
        console.log('User is already logged in');
        return;
    }

    await navigateToLogin();

    await page.type(SELECTORS.EMAIL_INPUT, email);
    await page.type(SELECTORS.PASSWORD_INPUT, password);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(SELECTORS.SUBMIT_BUTTON)
    ]);
    await page.waitForSelector('a[href^="/@"]');
    console.log('Logged in');
}

export async function logoutUser(): Promise<void> {
    await navigateToSettings();

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(SELECTORS.LOGOUT_BUTTON)
    ]);
    await page.waitForSelector(SELECTORS.LOGIN_LINK, { visible: true });
    console.log('Logged out');
}

export async function createArticle(title: string, description: string, body: string, tag?: string): Promise<void> {
    await navigateToEditor();

    await page.type(SELECTORS.ARTICLE_TITLE_INPUT, title);
    await page.type(SELECTORS.ARTICLE_DESCRIPTION_INPUT, description);
    await page.type(SELECTORS.ARTICLE_BODY_TEXTAREA, body);

    if (tag) {
        await page.type(SELECTORS.ARTICLE_TAGS_INPUT, tag);
        await page.keyboard.press('Enter');
    }

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(SELECTORS.PUBLISH_BUTTON)
    ]);
    await page.waitForSelector('h1');
    console.log('Article created');
}

export async function getMostPopularTag(): Promise<string> {
    await page.waitForSelector(SELECTORS.TAG_PILL, { visible: true });

    const tag = await page.$eval(
        SELECTORS.TAG_PILL,
        (el) => el.textContent?.trim() || ''
    );
    console.log(`Most popular tag: ${tag}`);
    return tag;
}

export async function searchArticleByTag(tag: string, articleTitle: string): Promise<boolean> {
    await page.waitForSelector(SELECTORS.TAG_LIST);

    await page.evaluate((selector, targetTag) => {
        const tags = Array.from(document.querySelectorAll<HTMLElement>(selector));
        const target = tags.find(t => t.textContent?.trim() === targetTag);
        if (target) target.click();
    }, SELECTORS.TAG_PILL, tag);

    await page.waitForSelector(SELECTORS.ARTICLE_PREVIEW);

    const postFound = await page.evaluate((selector, title) => {
        return Array.from(document.querySelectorAll(selector))
            .some(el => el.textContent?.trim() === title);
    }, SELECTORS.ARTICLE_PREVIEW_TITLE, articleTitle);

    console.log(`Article found by tag ${tag}: ${postFound}`);
    return postFound;
}

export async function getPageTitle(): Promise<string> {
    return await page.title();
}

export async function getNavbarContent(): Promise<string> {
    const headerHandle = await page.$(SELECTORS.NAVBAR_BRAND);
    if (headerHandle) {
        return await page.evaluate(
            (el) => el.innerHTML,
            headerHandle
        );
    }

    return await page.evaluate(() => {
        return document.querySelector(SELECTORS.NAVBAR)?.textContent || '';
    });
}