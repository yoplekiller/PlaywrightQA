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
    private readonly addressSearchButton!: Locator;





    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('textbox', { name: /^검색어를 입력해주세요$/i })
        this.loginButton = page.getByText('로그인');
        this.userProfileLink = page.getByRole('link', {name: /.+님$/i});
        this.marketButton = page.getByRole('button', { name: /마켓컬리/i });
        this.beautyButton = page.getByRole('button', { name: /뷰티컬리/i });
        this.likeButton = page.getByRole('button', { name: /찜하기/i });
        this.searchButton = page.getByRole('button', { name: /검색|submit/i });

        // Header icon buttons have no accessible name. The address button is the first
        // empty icon button after the search submit button.
        this.addressButton = page.locator('button').filter({ hasText: /^$/ }).nth(1);
        this.addressSearchButton = page.locator('button', { hasText: /^주소 검색$/ });

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
    // 주소 버튼은 hover 해야 "주소 검색" 버튼이 있는 툴팁이 열린다. 헤더 hydration 전에 hover 하면 툴팁이 안 뜨는 경우가 있어
    // hover + 툴팁 확인을 한 덩어리로 묶어 expect().toPass() 로 재시도한다 (예전: for 루프 + waitForTimeout(300) 하드 대기).
    async hoverAddressButton() {
        await this.addressButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addressButton.scrollIntoViewIfNeeded();
        await expect(async () => {
            await this.page.mouse.move(0, 0);
            await this.addressButton.hover();
            await expect(this.addressSearchButton).toBeVisible({ timeout: 2000 });
        }).toPass({ timeout: 10000 });
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
        await this.addressSearchButton.dispatchEvent('click');
    }

    // 툴팁의 "주소 검색" 클릭 → 새 창(popup)으로 주소 검색 페이지가 열린다.
    // popup 이벤트 대기를 클릭 전에 걸어둬야 이벤트를 놓치지 않는다. 툴팁이 닫혀 클릭이 안 먹히면 hover 부터 다시 시도.
    async openAddressSearchPopup(): Promise<Page> {
        let popup: Page | undefined;
        await expect(async () => {
            await this.hoverAddressButton();
            const popupPromise = this.page.waitForEvent('popup', { timeout: 5000 });
            await this.clickAddressSearchButton();
            popup = await popupPromise;
        }).toPass({ timeout: 30000 });
        await popup!.waitForLoadState('domcontentloaded');
        return popup!;
    }
}
