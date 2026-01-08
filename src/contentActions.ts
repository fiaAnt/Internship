import { SELECTORS } from "./constants";
import { navigateToEditor } from "./navigation";

export async function createArticle(title: string, description: string, body: string, tag?: string): Promise<void> {
    try {
        await navigateToEditor();
        await page.type(SELECTORS.ARTICLE_TITLE_INPUT, title);
        await page.type(SELECTORS.ARTICLE_DESCRIPTION_INPUT, description);
        await page.type(SELECTORS.ARTICLE_BODY_TEXTAREA, body);

        if (tag) {
            await page.type(SELECTORS.ARTICLE_TAGS_INPUT, tag);
            await page.keyboard.press('Enter');
        }

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }),
            page.click(SELECTORS.PUBLISH_BUTTON)
        ]);

        await page.waitForSelector('h1', { timeout: 5000 });
        console.log('Article created');
    } catch (error) {
        throw new Error(`Failed to create article "${title}": ${error.message}`);
    }
}

export async function getMostPopularTag(): Promise<string> {
    try {
        await page.waitForSelector(SELECTORS.TAG_PILL, { visible: true });
        const tag = await page.$eval(
            SELECTORS.TAG_PILL,
            (el) => el.textContent?.trim() || ''
        );
        console.log(`Most popular tag: ${tag}`);
        return tag;
    } catch (error) {
        throw new Error(`Failed to get most popular tag: ${error.message}`);
    }
}

export async function searchArticleByTag(tag: string, articleTitle: string): Promise<boolean> {
    try {
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
    } catch (error) {
        throw new Error(`Failed to search article by tag ${tag}: ${error.message}`);
    }
}

export async function getPageTitle(): Promise<string> {
    try {
        return await page.title();
    } catch (error) {
        throw new Error(`Failed to get page title: ${error.message}`);
    }
}

export async function getArticleTitle(): Promise<string> {
    await page.waitForSelector('h1', { timeout: 5000 });
    return page.$eval('h1', el => el.textContent?.trim() || '');
}

export async function getNavbarContent(): Promise<string> {
    try {
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
    } catch (error) {
        throw new Error(`Failed to get navbar content: ${error.message}`);
    }
}