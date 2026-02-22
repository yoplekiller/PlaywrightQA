import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class MainPage extends BasePage {

    private readonly searchBox!: Locator;
    private readonly loginButton!: Locator;
    private readonly userProfileLink!: Locator;
    private readonly marketButton!: Locator;
    private readonly beautyButton!: Locator;
    private readonly likeButton!: Locator;
    private readonly searchButton!: Locator;
    private readonly cartButton!: Locator;
    private readonly addressButton!: Locator;





    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('textbox', { name: /검색어를 입력해주세요/i })
        this.loginButton = page.getByText('로그인');
        this.userProfileLink = page.getByRole('link', {name: /.+님$/i});
        this.marketButton = page.getByRole('button', { name: /마켓컬리/i });
        this.beautyButton = page.getByRole('button', { name: /뷰티컬리/i });
        this.likeButton = page.getByRole('button', { name: /찜하기/i });
        this.searchButton = page.getByRole('button', { name: /검색/i });
        this.cartButton = page.locator('button.css-1e2hf7q.eebvnww2:visible')

        // 주소 버튼 - 헤더의 텍스트 없는 버튼 (class 기반)
        this.addressButton = page.locator('button.css-1bq61g1').first();

    }


    async clickLoginButton() {
        await this.click(this.loginButton);
    }
    async clickMarketButton() {
        await this.click(this.marketButton);
    }
    async clickBeautyButton() {
        await this.click(this.beautyButton);
    }

    async clickLikeButton() {
        await this.click(this.likeButton);
    }
    async clickCartButton() {
        await this.click(this.cartButton);
    }

    async hoverAddressButton() {
        await this.addressButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.hover(this.addressButton);
        await this.page.getByRole('button', { name: '주소 검색', exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    }

    // 검색어 입력 및 검색
    async fillSearchBox(text: string) {
        await this.fill(this.searchBox, text);
    }
    async clickSearchButton() {
        await this.click(this.searchButton);
    }

    async clickPickButton() {
        await this.click(this.likeButton);
    }

    // 검색 실행
    async pressEnterInSearchBox() {
        await this.searchBox.press('Enter');
    }


    async isLoggedIn(): Promise<boolean> {
        try{
            return await this.userProfileLink.isVisible({ timeout: 5000 });
        } catch {
            return false;
        }
    }

    async searchGoods(goodsName: string) {
        await this.fillSearchBox(goodsName);
        await this.pressEnterInSearchBox();
    }

    async isSearchBoxAccessible(): Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    async isBlankSearchPopupVisible(): Promise<boolean> {
        const popup = this.page.locator('.popup-content.css-15yaaju.e1k5padi2');
        const message = this.page.getByText('검색어를 입력해주세요');
        try {
            await popup.waitFor({ state: 'visible', timeout: 5000 });
            return await message.isVisible();
        } catch {
            return false;
        }
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

