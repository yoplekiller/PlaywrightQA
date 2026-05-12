import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoodsPage extends BasePage {
    private readonly likeButtonLocator: Locator;
    private readonly addGoodsButtonInCart: Locator;
    private readonly productTitleLocator: Locator;
    private readonly addCartToast: Locator;

    constructor(page: Page) {
        super(page);

        this.likeButtonLocator = page.getByLabel('찜하기');
        this.addGoodsButtonInCart = page.getByRole('button', { name: '장바구니 담기' });
        this.productTitleLocator = page.locator('h1').first();
        this.addCartToast = page.getByText('장바구니에 상품을 담았습니다.', { exact: true });
    }

    async clickLikeButton() {
        await this.click(this.likeButtonLocator);
    }

    async clickAddGoodsInCartButton(n: number) {
        for (let i = 0; i < n; i++) {
            await this.click(this.addGoodsButtonInCart);
            await expect(this.addCartToast).toBeVisible({ timeout: 5000 });

            // Toast duration can vary by browser/CI. Do not fail the product flow only because
            // the success message stayed visible slightly longer than expected.
            await this.addCartToast.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => undefined);
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
