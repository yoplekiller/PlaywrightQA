import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {


    private readonly loginButtoninCart: Locator;
    private readonly EmptyCartText: Locator;
    private readonly addGoodsButton: Locator;





  constructor(page: Page) {
    super(page);
    this.loginButtoninCart = page.getByRole('button', { name: /로그인/i })
    this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
    this.addGoodsButton = page.getByRole('button', { name: /장바구니 담기/i })
  }

  async isCartEmpty(): Promise<boolean> {
    await this.EmptyCartText.waitFor({ state: 'visible', timeout: 5000 });
    return await this.EmptyCartText.isVisible();
  }

  async isVisibleGoodsInCart(goodsName: string): Promise<boolean> {
    const goodsLocator = this.page.locator(`text=${goodsName}`);
    await goodsLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await goodsLocator.isVisible();
  }

  async clickAddGoodsButton() {
    await this.click(this.addGoodsButton);
  }

  async verifyGoodsQuantity(expectedQuantity: number): Promise<boolean> {
    const quantityLocator = this.page.locator('.quantity-selector__value');
    await quantityLocator.waitFor({ state: 'visible', timeout: 5000 });
    const quantityText = await quantityLocator.textContent();
    const quantity = Number(quantityText);
    return quantity === expectedQuantity;
  }

  async hasGoodsQuantity(expected: number): Promise<boolean> {
      const quantityText = this.page.getByText(`${expected}`, { exact: true });
      return await quantityText.isVisible();
  }





}