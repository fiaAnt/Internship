import { BR_URL, TEST_DATA } from '../constants';
import {
    setupPage,
    getPageTitle,
    getNavbarContent,
    registerUser,
    logoutUser,
    loginUser,
    getMostPopularTag,
    createArticle,
    searchArticleByTag,
    isUserLoggedIn
} from '../helpers';

describe('Realworld App verification', () => {
    beforeAll(async () => {
        await setupPage();
    });

    test('Title of the page', async () => {
        const title = await getPageTitle();
        expect(title).toBe('Conduit');
    });

    test('Header of the page', async () => {
        const headerContent = await getNavbarContent();
        expect(headerContent).toContain('conduit');
    });
});

describe('User Registration', () => {
    beforeEach(async () => {
        await page.goto(BR_URL);
    });

    test('Register and logout user', async () => {
        const timestamp = Date.now();
        const username = `testuser${timestamp}`;
        const emailReg = `test${timestamp}@example.com`;
        const passwordReg = 'TestPassword123!';

        await registerUser(username, emailReg, passwordReg);
        const loggedIn = await isUserLoggedIn();
        expect(loggedIn).toBe(true);
        await logoutUser();

        const loggedOut = !(await isUserLoggedIn());
        expect(loggedOut).toBe(true);
    });
});

describe('User Login', () => {
    beforeEach(async () => {
        await page.goto(BR_URL, { waitUntil: 'networkidle0' });
    });

    test('Login with existing credentials', async () => {
        await loginUser(TEST_DATA.EMAIL, TEST_DATA.PASSWORD);
        const loggedIn = await isUserLoggedIn();
        expect(loggedIn).toBe(true);
    });
});

describe('Article Management', () => {
    const email = TEST_DATA.EMAIL;
    const password = TEST_DATA.PASSWORD;
    let popularTag: string;
    const postTitle = `Test Post ${Date.now()}`;
    const postDescription = 'post description';
    const postBody = 'body of the test post';

    beforeEach(async () => {
        await page.goto(BR_URL, { waitUntil: 'networkidle0' });
        const loggedIn = await isUserLoggedIn();
        if (!loggedIn) {
            await loginUser(email, password);
        }
    });

    test('Create article and find it by popular tag', async () => {
        popularTag = await getMostPopularTag();
        await createArticle(postTitle, postDescription, postBody, popularTag);
        const createdTitle = await page.$eval('h1', el => el.textContent.trim());
        expect(createdTitle).toBe(postTitle);

        await page.goto(BR_URL, { waitUntil: 'networkidle0' });
        const postFound = await searchArticleByTag(popularTag, postTitle);

        expect(postFound).toBe(true);
    });
});