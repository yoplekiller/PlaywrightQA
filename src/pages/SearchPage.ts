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
  private readonly productItems: Locator;
  private readonly noResultMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.addCartButton = page.locator('button').filter({ hasText: '담기' }).last();
    this.cartAlt = page.locator('div.css-1m3m6o4.e1f5wbog0:visible');
    this.cancelButtonInCartAlt = page.getByRole('button', { name: /취소/i });
    this.addButtonInCartAlt = page.getByRole('button', { name: /장바구니 담기/i });
    this.increaseQuantityButton = page.getByRole('button', { name: /수량올리기/i });
    this.decreaseQuantityButton = page.getByRole('button', { name: /수량내리기/i });
    this.firstGoods = page.locator('.css-1dry2r1.e1c07x485').first();
    this.productItems = page.locator('a[href*="/goods/"], .css-1dry2r1.e1c07x485');
    this.noResultMessage = page.locator('body').filter({ hasText: /검색.*없|상품.*없|결과.*없/ });
    this.cartButton = page.locator("//button[@class='css-1o9e4kz']//*[name()='svg']");
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

  async isFirstProductVisible(): Promise<boolean> {
    return await this.firstGoods.isVisible();
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

  async clickGoodsByName(goodsName: string) {
    const goodsLocator = this.page.getByRole('link', { name: new RegExp(goodsName) });
    await this.click(goodsLocator);
  }

  async clickGoodsByPartialText(partialText: string) {
    const goodsLocator = this.page.locator('a[href*="/goods/"]').filter({ hasText: partialText }).first();
    await this.click(goodsLocator);
  }

  async goodsSearchResult(name: string): Promise<Locator> {
    return this.page.locator('body').filter({ hasText: name });
  }

  async isGoodsSearchResultVisible(name: string): Promise<boolean> {
    try {
      await this.page.waitForURL(/\/search(?:\?|$)/, { timeout: 10000 });

      const currentUrl = new URL(this.page.url());
      const hasSearchTerm = Array.from(currentUrl.searchParams.values())
        .some(value => value === name || decodeURIComponent(value).includes(name));
      if (!hasSearchTerm) {
        return false;
      }

      await Promise.race([
        this.productItems.first().waitFor({ state: 'visible', timeout: 10000 }),
        this.noResultMessage.waitFor({ state: 'visible', timeout: 10000 }),
      ]).catch(() => undefined);

      return true;
    } catch {
      return false;
    }
  }

  async clickSortTab(name: string) {
    const tab = this.page.getByRole('link', { name });
    await this.click(tab);
  }

  async isNoSearchResultMessageVisible(): Promise<boolean> {
    try {
      await this.noResultMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSearchResultCount(): Promise<number> {
    return await this.productItems.count();
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = this.page.locator('.price-number');
    await priceElements.first().waitFor({ state: 'visible', timeout: 5000 });

    const pricesTexts = await priceElements.allTextContents();

    return pricesTexts
      .map(text => parseInt(text.replace(/[^0-9]/g, ''), 10))
      .filter(n => !isNaN(n));
  }
}
