import { SELECTORS } from './constants';


export async function setupPage(): Promise<void> {
    console.log('Page available?', typeof page !== 'undefined');

    await page.goto(process.env.BR_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(SELECTORS.NAVBAR, { timeout: 10000 });
}