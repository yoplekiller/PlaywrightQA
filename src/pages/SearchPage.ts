import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  private readonly addCartButton: Locator;
  private readonly cancelButtonInCartAlt: Locator;
  private readonly addButtonInCartAlt: Locator;
  private readonly increaseQuantityButton: Locator;
  private readonly decreaseQuantityButton: Locator;
  private readonly firstGoods: Locator;
  private readonly productItems: Locator;
  private readonly noResultMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.addCartButton = page.locator('button').filter({ hasText: '담기' }).last();
    this.cancelButtonInCartAlt = page.getByRole('button', { name: /취소/i });
    this.addButtonInCartAlt = page.getByRole('button', { name: /장바구니 담기/i });
    this.increaseQuantityButton = page.getByRole('button', { name: /수량올리기/i });
    this.decreaseQuantityButton = page.getByRole('button', { name: /수량내리기/i });
    this.productItems = page.locator('a[href^="/goods/"]');
    this.firstGoods = this.productItems.first();
    this.noResultMessage = page.locator('body').filter({ hasText: /검색.*없|상품.*없|결과.*없/ });
  }

  async getFirstGoodsName(): Promise<string> {
    return await this.firstGoods.textContent() || '';
  }

  async clickFirstGoods() {
    await this.firstGoods.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstGoods.click();
  }

  async clickAddCartButton() {
    await this.addCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addCartButton.click();
  }

  async clickCancelButtonInCartAlt() {
    await this.cancelButtonInCartAlt.click();
  }

  async clickAddButtonInCartAlt() {
    await this.addButtonInCartAlt.waitFor({ state: 'visible', timeout: 10000 });
    await this.addButtonInCartAlt.click();
  }

  async increaseQuantity(times: number) {
    for (let i = 0; i < times; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async decreaseQuantity(times: number) {
    for (let i = 0; i < times; i++) {
      await this.decreaseQuantityButton.click();
    }
  }

  async clickGoodsByIndex(index: number) {
    const goodsLocator = this.productItems.nth(index);
    await goodsLocator.click();
  }

  getProductItems(): Locator {
    return this.productItems;
  }

  async expectSearchUrlContainsTerm(name: string) {
    await expect.poll(
      () => this.hasSearchTermInUrl(name),
      { message: `검색 URL에 "${name}" 검색어가 포함되어야 합니다.` },
    ).toBe(true);
  }

  async expectSearchResultsVisible(name: string) {
    await this.page.waitForURL(/\/search(?:\?|$)/, { timeout: 10000 });
    await this.expectSearchUrlContainsTerm(name);
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
  }

  async expectNoSearchResults() {
    await expect(this.productItems).toHaveCount(0, { timeout: 10000 });
  }

  private hasSearchTermInUrl(name: string): boolean {
    const currentUrl = new URL(this.page.url());

    return Array.from(currentUrl.searchParams.values())
      .some(value => value === name || decodeURIComponent(value).includes(name));
  }

  async clickSortTab(name: string) {
    const tab = this.page.getByRole('link', { name });
    await tab.click();

    const expectedSortedType = this.getExpectedSortedType(name);
    if (expectedSortedType) {
      await expect.poll(() => new URL(this.page.url()).searchParams.get('sorted_type'))
        .toBe(expectedSortedType);
    }

    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => undefined);
  }

  private getExpectedSortedType(name: string): string | undefined {
    const sortTypes: Record<string, string> = {
      '낮은 가격순': '2',
      '높은 가격순': '3',
    };

    return sortTypes[name];
  }

  async getProductPrices(): Promise<number[]> {
    await this.productItems.first().waitFor({ state: 'visible', timeout: 5000 });

    return this.productItems.evaluateAll(items => items
      .map(item => {
        const priceTexts = item.textContent?.match(/\d{1,3}(?:,\d{3})*원/g) ?? [];
        const salePriceText = priceTexts.at(-1);

        return salePriceText ? Number(salePriceText.replace(/[^0-9]/g, '')) : NaN;
      })
      .filter(price => Number.isFinite(price)));
  }
}
