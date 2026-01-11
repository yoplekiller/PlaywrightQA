import {Page, Locator} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

async goto(url: string) {
    await this.page.goto(url);
}

async click(locator : Locator) {
    await locator.click();
}

async fill(locator: Locator, text: string) {
    await locator.fill(text);
}


async hover(locator: Locator) {
    await locator.hover();
}
async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
}

async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
}

}
