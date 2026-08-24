import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoodsPage extends BasePage {
    private readonly likeButtonLocator: Locator;
    private readonly addGoodsButtonInCart: Locator;
    private readonly productTitleLocator: Locator;
    private readonly addCartToast: Locator;
    private readonly optionSelectButton: Locator;
    private readonly optionItems: Locator;

    constructor(page: Page) {
        super(page);

        this.likeButtonLocator = page.getByLabel('찜하기');
        this.addGoodsButtonInCart = page.getByRole('button', { name: '장바구니 담기' });
        this.productTitleLocator = page.locator('h1').first();
        this.addCartToast = page.getByText('장바구니에 상품을 담았습니다.', { exact: true });
        this.optionSelectButton = page.locator('button:visible').filter({ hasText: '상품을 선택해주세요' }).first();
        this.optionItems = page.locator('li[class*="e13g30ne5"]:visible').filter({ hasText: /원/ });
    }

    async clickLikeButton() {
        await this.likeButtonLocator.click();
    }

    async clickAddGoodsInCartButton(n: number) {
        for (let i = 0; i < n; i++) {
            await this.selectFirstOptionIfNeeded();
            await this.addGoodsButtonInCart.click();
            await expect(this.page.getByRole('dialog').filter({ hasText: '주문하실 상품을 선택해주세요.' }))
                .toBeHidden({ timeout: 1000 });

            // Toast duration can vary by browser/CI. Do not fail the product flow only because
            // the success message stayed visible slightly longer than expected.
            await this.addCartToast.waitFor({ state: 'visible', timeout: 1000 }).catch(() => undefined);
            await this.addCartToast.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => undefined);
        }
    }

    private async selectFirstOptionIfNeeded() {
        await this.addGoodsButtonInCart.scrollIntoViewIfNeeded();

        const firstOption = this.optionItems.first();
        if (await firstOption.isVisible().catch(() => false)) {
            await firstOption.click({ force: true });
            return;
        }

        if (!await this.optionSelectButton.isVisible().catch(() => false)) {
            return;
        }

        await this.optionSelectButton.click();
        await expect(firstOption).toBeVisible({ timeout: 5000 });
        await firstOption.click({ force: true });
    }

    async expectCompletedLikeGoodsVisible() {
        await expect(this.page.getByText('상품을 찜했어요.')).toBeVisible({ timeout: 5000 });
    }

    async expectProductTitleVisible(expectedTitle: string) {
        await expect(this.productTitleLocator).toHaveText(expectedTitle);
    }

    async getProductTitle(): Promise<string> {
        return (await this.productTitleLocator.textContent())?.trim() || '';
    }
}
