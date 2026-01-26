import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class GoodsPage extends BasePage {


    private readonly likeButtonLocator: Locator;
    private readonly addGoodsButtonInCart: Locator;
    private readonly productTitleLocator: Locator;

    constructor(page: Page) {
        super(page);


        this.likeButtonLocator = page.getByLabel('찜하기');
        this.addGoodsButtonInCart = page.getByRole('button', { name: '장바구니 담기' }); // 찜하기 버튼
        this.productTitleLocator = page.locator('h1').first(); // 상품명 제목
    }

    async clickLikeButton() {
        await this.click(this.likeButtonLocator); 

    }

    async clickAddGoodsInCartButton(n: number) {
        for (let i = 0; i < n; i++) {
            await this.click(this.addGoodsButtonInCart);
            await expect(this.page.getByText('장바구니에 상품을 담았습니다.')).toBeVisible({timeout: 5000});
            await expect(this.page.getByText('장바구니에 상품을 담았습니다.')).not.toBeVisible({ timeout: 3000 });
        }
    }

    async isCartAddedToastVisible(): Promise<boolean> {
      try {
            await expect(this.page.getByText('장바구니에 상품을 담았습니다.')).toBeVisible({timeout: 5000});
            await expect(this.page.getByText('장바구니에 상품을 담았습니다.')).not.toBeVisible({ timeout: 3000 }); 
            return true;
        } catch {
            return false;
        }
    }

    async isCompletedLikeGoodsVisible(): Promise<boolean> {
      try {
        await this.page.waitForSelector('text=상품을 찜했어요.', { timeout: 3000, state: 'visible' });
        return true;
      } catch {
        return false;
}
    }

    async isProductTitleVisible(expectedTitle: string): Promise<boolean> {
        const actualTitle = await this.productTitleLocator.textContent();
        return actualTitle?.trim() === expectedTitle;
    }   
}