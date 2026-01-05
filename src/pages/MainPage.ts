import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class MainPage extends BasePage {

    private readonly searchBox: Locator;
    private readonly loginButton: Locator;
    private readonly userProfileLink: Locator;
    private readonly marketButton: Locator;
    private readonly beautyButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('textbox', { name: /검색어를 입력해주세요\./i })
        this.loginButton = page.getByRole('link', { name: /로그인/i });
        this.userProfileLink = page.getByRole('link', {name: /.+님$/i});
        this.marketButton = page.getByRole('button', { name: /마켓컬리/i });
        this.beautyButton = page.getByRole('button', { name: /뷰티컬리/i });
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

    async isLoggedIn(): Promise<boolean> {
        try{
            return await this.userProfileLink.isVisible({ timeout: 5000 });
        } catch {
            return false;
        }

 }
}