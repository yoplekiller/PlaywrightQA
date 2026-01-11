import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {

    private readonly addCartButton: Locator;
    private readonly cartAlt: Locator;
    private readonly cancelButtonInCartAlt: Locator;
    private readonly addButtonInCartAlt: Locator;
    private readonly increaseQuantityButton: Locator;
    private readonly decreaseQuantityButton: Locator;
    private readonly cartButton: Locator;
    private readonly firstGoods: Locator;

    constructor(page: Page) {
        super(page);

        this.addCartButton = page.locator('button').filter({ hasText: '담기' }).last() // 장바구니 담기 버튼
        this.cartAlt = page.locator('div.css-1m3m6o4.e1f5wbog0:visible') // 장바구니 담기 알림창
        this.cancelButtonInCartAlt = page.getByRole('button', { name: /취소/i }) // 취소 버튼
        this.addButtonInCartAlt = page.getByRole('button', { name: /장바구니 담기/i }) // 장바구니 담기 버튼
        this.increaseQuantityButton = page.getByRole('button', { name: /수량올리기/i }) // 수량 올리기 버튼
        this.decreaseQuantityButton = page.getByRole('button', { name: /수량내리기/i }) // 수량 내리기 버튼
        this.firstGoods = page.locator('.css-1dry2r1.e1c07x485').first(); // 첫 번째 상품
        this.cartButton = page.locator("//button[@class='css-1o9e4kz']//*[name()='svg']") //장바구니 아이콘


    }

    async getFirstGoodsName(): Promise<string> {
        return await this.firstGoods.textContent() || '';
    }

    async clickFirstGoods() {
        await this.firstGoods.waitFor({ state: 'visible', timeout: 10000 });
        await this.click(this.firstGoods);
    }

    async clickAddCartButton() {
        await this.addCartButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.click(this.addCartButton);
    }

    async clickCancelButtonInCartAlt() {
        await this.click(this.cancelButtonInCartAlt);
    }

    async clickAddButtonInCartAlt() {
        await this.addButtonInCartAlt.waitFor({ state: 'visible', timeout: 10000 });
        await this.click(this.addButtonInCartAlt);
    }

    async clickCartButton() {
        await this.click(this.cartButton);
    }

    async increaseQuantity(times: number) {
        for (let i = 0; i < times; i++) {
            await this.click(this.increaseQuantityButton);
        }
    }

    async decreaseQuantity(times: number) {
        for (let i = 0; i < times; i++) {
            await this.click(this.decreaseQuantityButton);
        }  
    }

    async isCartAltVisible(): Promise<boolean> {
        return await this.cartAlt.isVisible();
    }
    
    async clickGoodsByIndex(index: number) {
        const goodsLocator = this.page.locator('.css-1dry2r1.e1c07x485').nth(index);
        await this.click(goodsLocator);
    }

    /**
     * 상품명으로 상품 클릭 (정규식 매칭)
     * @param goodsName 상품명 또는 일부 텍스트 (예: '호두과자', '우리쌀')
     */
    async clickGoodsByName(goodsName: string) {
        const goodsLocator = this.page.getByRole('link', { name: new RegExp(goodsName) });
        await this.click(goodsLocator);
    }

    /**
     * 상품명 부분 텍스트로 상품 클릭 (첫 번째 매칭)
     * @param partialText 상품명에 포함된 텍스트
     */
    async clickGoodsByPartialText(partialText: string) {
        const goodsLocator = this.page.locator('a[href*="/goods/"]').filter({ hasText: partialText }).first();
        await this.click(goodsLocator);
    }





}