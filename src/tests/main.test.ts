describe('Realworld App - Test', () => {
    const email = 'test@example.com';
    const password = 'TestPassword123!';
    let popularTag: string;

    beforeAll(async () => {
        await setupPage();
    });
    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('Conduit');
    });

    test('Header of the page', async () => {
        const headerHandle = await page.$('nav.navbar .navbar-brand');
        if (headerHandle) {
            const html = await page.evaluate(
                (el) => el.innerHTML,
                headerHandle
            );
            expect(html).toContain('conduit');
        } else {
            const headerText = await page.evaluate(() => {
                return document.querySelector('nav.navbar')?.textContent || '';
            });
            expect(headerText).toContain('conduit');
        }
    });
    test('register and log out', async () => {
        const timestamp = Date.now();
        const username = `testuser${timestamp}`;
        const emailReg = `test${timestamp}@example.com`;
        const passwordReg = 'TestPassword123!';

        await page.goto(BR_URL);
        await page.waitForSelector('nav', { visible: true });

        const registerLink = await page.$('a[href="/register"]');
        if (!registerLink) throw new Error('Register link not found!');
        await registerLink.click();

        await page.waitForSelector('input[placeholder="Username"]', { visible: true });
        await page.type('input[placeholder="Username"]', username);
        await page.type('input[placeholder="Email"]', emailReg);
        await page.type('input[placeholder="Password"]', passwordReg);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('button[type="submit"]')
        ]);

        await page.waitForSelector(`a[href="/@${username}"]`, { visible: true, timeout: 10000 });
        console.log(`registered: ${username}`);

        await page.click('a[href="/settings"]');
        await page.waitForSelector('button.btn-outline-danger', { visible: true });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('button.btn-outline-danger')
        ]);

        const signInLinkText = await page.$eval('a[href="/login"]', el => el.textContent?.trim());
        expect(signInLinkText).toBe('Sign in');
        console.log('logged out');
    });
    test('sign in, create post and find it in Global Feed by most popular tag', async () => {
        const postTitle = `Test Post ${Date.now()}`;
        const postDescription = 'post description';
        const postBody = 'body of the test post';

        await page.goto(BR_URL, { waitUntil: 'networkidle0' });
        await page.click('a[href="/login"]');
        await page.waitForSelector('input[placeholder="Email"]');
        await page.type('input[placeholder="Email"]', email);
        await page.type('input[placeholder="Password"]', password);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('button[type="submit"]')
        ]);
        await page.waitForSelector('a[href^="/@"]');
        console.log('logged in');

        await page.waitForSelector('.tag-list a.tag-pill');
        popularTag = await page.$eval(
            '.tag-list a.tag-pill',
            el => el.textContent.trim()
        );
        console.log(`most popular tag: ${popularTag}`);

        await page.click('a[href="/editor"]');
        await page.waitForSelector('input[placeholder="Article Title"]');
        await page.type('input[placeholder="Article Title"]', postTitle);
        await page.type('input[placeholder="What\'s this article about?"]', postDescription);
        await page.type('textarea[placeholder="Write your article (in markdown)"]', postBody);
        await page.type('input[placeholder="Enter tags"]', popularTag);
        await page.keyboard.press('Enter');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('button.btn-primary')
        ]);

        await page.waitForSelector('h1');
        const createdTitle = await page.$eval('h1', el => el.textContent.trim());
        expect(createdTitle).toBe(postTitle);
        console.log('post created');
        await page.goto(BR_URL, { waitUntil: 'networkidle0' });
        await page.waitForSelector('.tag-list');

        await page.evaluate(tag => {
            const tags = Array.from(document.querySelectorAll<HTMLElement>('.tag-list a.tag-pill'));
            const target = tags.find(t => t.textContent.trim() === tag);
            if (target) target.click();
        }, popularTag);

        await page.waitForSelector('.article-preview');

        const postFound = await page.evaluate(title => {
            return Array.from(document.querySelectorAll('.article-preview h1'))
                .some(el => el.textContent.trim() === title);
        }, postTitle);

        expect(postFound).toBe(true);
        console.log('post found in Global Feed by popular tag');
    });
});
