const BR_URL = 'http://localhost:4100/';

declare global {
    var BR_URL: string;
    var setupPage: () => Promise<void>;
}

Object.assign(global, {
    BR_URL,
    setupPage: async () => {
        console.log('Page available?', typeof page !== 'undefined');
        await page.goto(BR_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('nav.navbar', { timeout: 10000 });
    }
});

export { };