import { createArticle, getArticleTitle, getMostPopularTag, getNavbarContent, getPageTitle, searchArticleByTag } from '../contentActions';
import { navigateToHome } from '../navigation';
import { setupPage } from '../setup';
import { ensureUserLoggedIn, isUserLoggedIn, loginUser, logoutUser, registerUser } from '../userActions';

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
        await navigateToHome();
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
        await navigateToHome('networkidle0');
    });

    test('Login with existing credentials', async () => {

        await loginUser(process.env.EMAIL, process.env.PASSWORD);
        const loggedIn = await isUserLoggedIn();
        expect(loggedIn).toBe(true);
    });
});

describe('Article Management', () => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    beforeEach(async () => {
        await navigateToHome('networkidle0');
        await ensureUserLoggedIn(email, password);
    });

    test('Create article and find it by popular tag', async () => {
        const popularTag = await getMostPopularTag();
        const postTitle = `Test Post ${Date.now()}`;
        const postDescription = 'post description';
        const postBody = 'body of the test post';

        await createArticle(postTitle, postDescription, postBody, popularTag);
        expect(await getArticleTitle()).toBe(postTitle);


        await navigateToHome();
        const postFound = await searchArticleByTag(popularTag, postTitle);

        expect(postFound).toBe(true);
    });
});