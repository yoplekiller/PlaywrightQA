import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {

    private readonly loginButtoninCart: Locator;
    private readonly EmptyCartText: Locator;
    private readonly goodsItems: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButtoninCart = page.getByRole('button', { name: /로그인/i })
        this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
        this.goodsItems = page.locator('.css-1c85mpj.e1c07x484'); // 장바구니 상품명 locator
    }

    /**
     * 장바구니가 비어있는지 확인
     * @returns 비어있으면 true
     */
    async isCartEmpty(): Promise<boolean> {
        return await this.EmptyCartText.isVisible();
    }

    /**
     * 특정 상품이 장바구니에 있는지 확인
     * @param goodsName 확인할 상품명
     * @returns 상품이 있으면 true
     */
    async hasGoods(goodsName: string): Promise<boolean> {
        const goodsLocator = this.page.locator(`text=${goodsName}`);
        return await goodsLocator.first().isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * 장바구니에 담긴 모든 상품명 가져오기
     * @returns 상품명 배열
     */
    async getAllGoodsNames(): Promise<string[]> {
        const count = await this.goodsItems.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const name = await this.goodsItems.nth(i).textContent();
            if (name) {
                names.push(name.trim());
            }
        }

        return names;
    }

    /**
     * 장바구니 URL로 이동
     */
    async goto() {
        await this.page.goto('https://www.kurly.com/cart');
    }
}