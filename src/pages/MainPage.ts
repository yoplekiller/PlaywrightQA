import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class MainPage extends BasePage {

    private readonly searchBox!: Locator;
    private readonly loginButton!: Locator;
    private readonly userProfileLink!: Locator;
    private readonly marketButton!: Locator;
    private readonly beautyButton!: Locator;
    private readonly likeButton!: Locator;
    private readonly searchButton!: Locator;
    private readonly addressButton!: Locator;





    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('textbox', { name: /검색어를 입력해주세요/i })
        this.loginButton = page.getByText('로그인');
        this.userProfileLink = page.getByRole('link', {name: /.+님$/i});
        this.marketButton = page.getByRole('button', { name: /마켓컬리/i });
        this.beautyButton = page.getByRole('button', { name: /뷰티컬리/i });
        this.likeButton = page.getByRole('button', { name: /찜하기/i });
        this.searchButton = page.getByRole('button', { name: /검색|submit/i });

        // Header icon buttons have no accessible name. The address button is the first
        // empty icon button after the search submit button.
        this.addressButton = page.locator('button').filter({ hasText: /^$/ }).nth(1);

    }


    async clickLoginButton() {
        await this.loginButton.click();
    }
    async clickMarketButton() {
        await this.marketButton.click();
    }
    async clickBeautyButton() {
        await this.beautyButton.click();
    }

    async clickLikeButton() {
        await this.likeButton.click();
    }
    async hoverAddressButton() {
        await this.addressButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addressButton.hover();
        await this.page.getByRole('button', { name: '주소 검색', exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    }

    // 검색어 입력 및 검색
    async fillSearchBox(text: string) {
        await this.searchBox.fill(text);
    }
    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickPickButton() {
        await this.likeButton.click();
    }

    async searchGoods(goodsName: string) {
        await this.fillSearchBox(goodsName);
        await this.clickSearchButton();
    }

    async expectBlankSearchPopupVisible() {
        await expect(this.page.getByRole('dialog')).toContainText('검색어를 입력해주세요.', { timeout: 5000 });
    }

    async clickAddressSearchButton() {
        await this.page.getByRole('button', { name: '주소 검색', exact: true }).click();
    }

    async openAddressSearchPopup(): Promise<Page> {
        await this.hoverAddressButton();
        const popupPromise = this.page.waitForEvent('popup');
        await this.clickAddressSearchButton();
        const popup = await popupPromise;
        await popup.waitForLoadState('domcontentloaded');
        return popup;
    }
}
