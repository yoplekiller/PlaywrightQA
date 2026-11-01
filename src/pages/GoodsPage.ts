import { Page, Locator, Response, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// 장바구니 담기 API. 버튼 클릭 결과를 토스트(표시 시간이 환경마다 다름) 대신 이 응답으로 판정한다.
const CART_ADD_API = '/external-cart/v2/add';

export interface CartAddResult {
    dealProductNo: number;
    quantity: number;
}

export class GoodsPage extends BasePage {
    private readonly likeButtonLocator: Locator;
    private readonly addGoodsButtonInCart: Locator;
    private readonly productTitleLocator: Locator;
    private readonly optionSelectButton: Locator;
    private readonly optionItems: Locator;

    constructor(page: Page) {
        super(page);

        this.likeButtonLocator = page.getByLabel('찜하기');
        this.addGoodsButtonInCart = page.getByRole('button', { name: '장바구니 담기' });
        this.productTitleLocator = page.locator('h1').first();
        this.optionSelectButton = page.locator('button:visible').filter({ hasText: '상품을 선택해주세요' }).first();
        this.optionItems = page.locator('li[class*="e13g30ne5"]:visible').filter({ hasText: /원/ });
    }

    async clickLikeButton() {
        await this.likeButtonLocator.click();
    }

    // n번 담고, 매번 장바구니 담기 API 응답(success=true)을 확인한다.
    // 예전엔 토스트 대기를 .catch()로 삼켜서 담기가 실패해도 다음 단계로 넘어갔다 → 장바구니 단계에서 원인 모를 실패로 나타났음.
    async clickAddGoodsInCartButton(n: number): Promise<CartAddResult[]> {
        const results: CartAddResult[] = [];
        for (let i = 0; i < n; i++) {
            await this.selectFirstOptionIfNeeded();
            const responsePromise = this.page.waitForResponse(
                res => res.url().includes(CART_ADD_API) && res.request().method() === 'POST',
                { timeout: 10000 },
            );
            await this.addGoodsButtonInCart.click();
            results.push(await this.expectCartAddSucceeded(await responsePromise));
            await expect(this.page.getByRole('dialog').filter({ hasText: '주문하실 상품을 선택해주세요.' }))
                .toBeHidden({ timeout: 1000 });
        }
        return results;
    }

    private async expectCartAddSucceeded(response: Response): Promise<CartAddResult> {
        expect(response.status(), '장바구니 담기 API HTTP 상태').toBe(200);
        const body = await response.json();
        expect(body.success, `장바구니 담기 API 실패: ${JSON.stringify(body).slice(0, 200)}`).toBe(true);
        const requested = JSON.parse(response.request().postData() ?? '{}').cartItems?.[0];
        expect(requested, '장바구니 담기 요청에 cartItems 가 없습니다').toBeTruthy();
        return { dealProductNo: requested.dealProductNo, quantity: requested.quantity };
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
