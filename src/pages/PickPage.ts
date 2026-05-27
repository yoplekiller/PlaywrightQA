import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';




export class PickPage extends BasePage {

    private readonly needLoginAlt!: Locator;

    constructor(page: Page) {
        super(page);
        this.needLoginAlt = page.getByText('로그인하셔야 본 서비스를 이용하실 수 있습니다.');
    }

    async expectNeedLoginAlertVisible() {
        await expect(this.needLoginAlt).toBeVisible();
    }
}
