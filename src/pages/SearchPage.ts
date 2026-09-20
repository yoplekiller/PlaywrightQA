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
  private readonly firstPageIcon: Locator;
  private readonly prevPageIcon: Locator;
  private readonly nextPageIcon: Locator;
  private readonly lastPageIcon: Locator;

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

    // Pagination controls at the bottom of the search results grid. The icons themselves are
    // tiny (~5-9px) <img> elements, too small to click reliably, so we key off their Korean alt
    // text (stable across deployments, unlike the surrounding CSS-in-JS hashed classes) and then
    // climb to the enclosing <a>, which has a much larger (34x34px) hit area.
    this.firstPageIcon = page.getByAltText('처음 페이지로 이동하기 아이콘').locator('xpath=..');
    this.prevPageIcon = page.getByAltText('이전 페이지로 이동하기 아이콘').locator('xpath=..');
    this.nextPageIcon = page.getByAltText('다음 페이지로 이동하기 아이콘').locator('xpath=..');
    this.lastPageIcon = page.getByAltText('마지막 페이지로 이동하기 아이콘').locator('xpath=..');
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

  // 검색 결과 페이지 하단 페이지네이션의 현재 페이지 번호를 URL의 page 파라미터에서 읽는다.
  // page 파라미터가 없으면 1페이지를 의미한다.
  getCurrentPageParam(): number {
    const currentUrl = new URL(this.page.url());
    const pageParam = currentUrl.searchParams.get('page');

    return pageParam ? Number(pageParam) : 1;
  }

  private async waitForPageParam(expectedPage: number, previousFirstHref: string | null) {
    await expect.poll(() => this.getCurrentPageParam(), {
      message: `URL의 page 파라미터가 ${expectedPage}이어야 합니다.`,
    }).toBe(expectedPage);
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });

    // 목록이 실제로 새로 그려질 때까지 대기한다. page 파라미터만 바뀌고 아직 이전 페이지의
    // 상품 목록이 화면에 남아있는 짧은 전환 구간에서 검증이 이뤄지는 것을 방지한다.
    if (previousFirstHref !== null) {
      await expect.poll(() => this.productItems.first().getAttribute('href'), {
        message: '페이지 이동 후 상품 목록이 갱신되어야 합니다.',
      }).not.toBe(previousFirstHref);
    }
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => undefined);
  }

  async clickPageNumber(pageNumber: number) {
    const previousFirstHref = await this.productItems.first().getAttribute('href').catch(() => null);
    const pageLink = this.page.locator('a', { hasText: new RegExp(`^${pageNumber}$`) }).first();
    await pageLink.scrollIntoViewIfNeeded();
    await pageLink.click();
    await this.waitForPageParam(pageNumber, previousFirstHref);
  }

  async clickNextPage() {
    const currentPage = this.getCurrentPageParam();
    const previousFirstHref = await this.productItems.first().getAttribute('href').catch(() => null);
    await this.nextPageIcon.scrollIntoViewIfNeeded();
    await this.nextPageIcon.click();
    await this.waitForPageParam(currentPage + 1, previousFirstHref);
  }

  async clickPrevPage() {
    const currentPage = this.getCurrentPageParam();
    const previousFirstHref = await this.productItems.first().getAttribute('href').catch(() => null);
    await this.prevPageIcon.scrollIntoViewIfNeeded();
    await this.prevPageIcon.click();
    await this.waitForPageParam(Math.max(1, currentPage - 1), previousFirstHref);
  }

  async clickFirstPage() {
    const previousFirstHref = await this.productItems.first().getAttribute('href').catch(() => null);
    await this.firstPageIcon.scrollIntoViewIfNeeded();
    await this.firstPageIcon.click();
    await this.waitForPageParam(1, previousFirstHref);
  }

  async clickLastPage() {
    await this.lastPageIcon.scrollIntoViewIfNeeded();
    await this.lastPageIcon.click();
    // 전체 페이지 수는 검색어/카탈로그에 따라 달라지므로 고정 숫자를 기다리지 않고
    // 1페이지보다 큰 값으로 이동했는지만 확인한다.
    await expect.poll(() => this.getCurrentPageParam(), {
      message: '마지막 페이지 이동 후 page 파라미터가 1보다 커야 합니다.',
    }).toBeGreaterThan(1);
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => undefined);
  }

  // 경계값 테스트: 마지막 페이지에서 다음 페이지 아이콘을 눌러도 더 이상 진행되지 않아야 한다.
  async expectNextPageIsNoOpAtLastPage() {
    const currentPage = this.getCurrentPageParam();
    await this.nextPageIcon.scrollIntoViewIfNeeded();
    await this.nextPageIcon.click({ force: true });
    await this.page.waitForTimeout(1000);

    expect(this.getCurrentPageParam()).toBe(currentPage);
  }
}
