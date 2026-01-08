import { Page, Locator, FrameLocator } from '@playwright/test';
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
        this.likeButton = page.locator("//button[@class='css-1cs6gj8']//*[name()='svg']")

         
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
    // 검색어 입력 및 검색
    async fillSearchBox(text: string) {
        await this.fill(this.searchBox, text);
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
}