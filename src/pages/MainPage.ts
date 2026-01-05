import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class MainPage extends BasePage {

    private readonly searchBox: Locator;
    private readonly loginButton: Locator;
    private readonly userProfileLink: Locator;
    private readonly marketButton: Locator;
    private readonly beautyButton: Locator;
    private readonly adressButton: Locator;
    private readonly likeButton: Locator;
    private readonly cartButton: Locator;
    protected readonly adressSearchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('textbox', { name: /검색어를 입력해주세요\./i })
        this.loginButton = page.getByRole('link', { name: /로그인/i });
        this.userProfileLink = page.getByRole('link', {name: /.+님$/i});
        this.marketButton = page.getByRole('button', { name: /마켓컬리/i });
        this.beautyButton = page.getByRole('button', { name: /뷰티컬리/i });
        this.likeButton = page.getByRole('button', { name: /찜하기/i })
        this.cartButton = page.locator('button.css-1e2hf7q.eebvnww2:visible')
        this.adressButton = page.locator('div.css-gaxl0w.e1m38gux1:visible')
        this.adressSearchButton = page.locator('button.css-1e2hf7q.eebvnww2:visible')
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
    async clickAdressButton() {
        await this.click(this.adressButton);
    }
    async clickLikeButton() {
        await this.click(this.likeButton);
    }
    async clickCartButton() {
        await this.click(this.cartButton);
    }
    async adressSearchClick() {
        await this.click(this.adressSearchButton);
    }

    async isLoggedIn(): Promise<boolean> {
        try{
            return await this.userProfileLink.isVisible({ timeout: 5000 });
        } catch {
            return false;
        }

 }
}