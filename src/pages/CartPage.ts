import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {
    private readonly EmptyCartText: Locator;
    private readonly addGoodsButton: Locator;


  constructor(page: Page) {
    super(page);
    this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
    this.addGoodsButton = page.getByRole('button', { name: /장바구니 담기/i })
  }

  async clickAddGoodsButton() {
    await this.addGoodsButton.click();
  }

  async expectGoodsQuantity(quantity: number) {
    await expect(this.page.getByText(String(quantity), { exact: true })).toBeVisible();
  }

  async expectGoodsVisible(goodsName: string) {
    await expect(this.page.getByText(goodsName)).toBeVisible({ timeout: 5000 });
  }

  async expectCartEmpty() {
    await expect(this.EmptyCartText).toBeVisible({ timeout: 5000 });
  }

  async expectCartNotEmpty() {
    await expect(this.EmptyCartText).toBeHidden({ timeout: 5000 });
  }

}
