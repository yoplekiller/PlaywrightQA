import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {
    private readonly EmptyCartText: Locator;
    private readonly addGoodsButton: Locator;
    private readonly checkoutLoginButton: Locator;
    private readonly checkoutButton: Locator;
    private readonly decreaseItemQuantityButton: Locator;
    private readonly increaseItemQuantityButton: Locator;
    private readonly itemQuantityText: Locator;
    private readonly productPriceValue: Locator;
    private readonly deliveryPriceValue: Locator;
    private readonly totalPaymentPriceValue: Locator;
    private readonly summaryLine: Locator;
    private readonly serverErrorModal: Locator;
    private readonly serverErrorModalConfirmButton: Locator;


  constructor(page: Page) {
    super(page);
    this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
    this.addGoodsButton = page.getByRole('button', { name: /장바구니 담기/i })
    this.checkoutLoginButton = page.getByRole('button', { name: '로그인' });
    this.checkoutButton = page.getByRole('button', { name: /결제하기|구매하기|주문하기/ });

    // 장바구니 상품 수량 증감 버튼. 접근성 이름이 영문 "Stepper minus/plus"로 고정되어 있어
    // 배포마다 바뀌는 해시 클래스 대신 이 이름으로 잡는다. 담긴 상품이 1개라는 전제로 first() 사용.
    this.decreaseItemQuantityButton = page.getByRole('button', { name: 'Stepper minus' }).first();
    this.increaseItemQuantityButton = page.getByRole('button', { name: 'Stepper plus' }).first();

    // 수량 표시는 감소 버튼 바로 다음 형제 <p>로 렌더링된다. 이 요소를 직접 지정해야
    // "전체선택 1/1"처럼 페이지 내 다른 곳에 나타나는 동일한 텍스트("1")와 겹치지 않는다.
    this.itemQuantityText = this.decreaseItemQuantityButton.locator('xpath=following-sibling::p[1]');

    // 결제금액 패널의 각 항목 값. 라벨 바로 다음 형제가 아니라 "라벨 뒤에 오는 가장 가까운
    // <p>"로 잡는다(xpath following, following-sibling 아님) - 배송비처럼 라벨이 안내
    // 아이콘 버튼과 한 겹 더 감싸인 wrapper 안에 있어서 형제 관계가 항목마다 다른데,
    // CSS-in-JS 해시 클래스 없이도 라벨→값 순서만으로 안정적으로 값을 잡을 수 있다.
    this.productPriceValue = page.getByText('상품 금액', { exact: true }).locator('xpath=following::p[1]');
    this.deliveryPriceValue = page.getByText('배송비', { exact: true }).locator('xpath=following::p[1]');
    this.totalPaymentPriceValue = page.getByText('결제예정금액', { exact: true }).locator('xpath=following::p[1]');

    // 상품 카드 하단의 압축 요약 줄("상품 N원 + 배송비 N원/무료")
    this.summaryLine = page.getByText(/^상품 .+ \+ 배송비 /);

    this.serverErrorModal = page.getByText('서버 오류', { exact: true });
    this.serverErrorModalConfirmButton = this.serverErrorModal.locator('xpath=following::button[1]');
  }

  async expectCheckoutRequiresLogin() {
    await expect(this.checkoutLoginButton).toBeVisible({ timeout: 5000 });
    await expect(this.checkoutButton).toHaveCount(0);
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

  async clickDecreaseItemQuantity() {
    await this.decreaseItemQuantityButton.click({ force: true });
  }

  // 스테퍼 옆에 표시되는 실제 수량 값을 확인한다 (전체선택 카운트 등 페이지의 다른 "1"과 무관).
  async expectItemQuantity(quantity: number) {
    await expect(this.itemQuantityText).toHaveText(String(quantity), { timeout: 5000 });
  }

  // 경계값 테스트: 수량이 최소값(1)일 때 감소 버튼이 비활성화되어 0 이하로 내려가지 않아야 한다.
  async expectDecreaseItemQuantityDisabled() {
    await expect(this.decreaseItemQuantityButton).toBeDisabled({ timeout: 5000 });
  }

  // 결제금액 패널이 payment/calculate 응답 데이터를 실제로 반영하고 있는지 확인한다.
  async expectPaymentSummary(opts: { productPrice: string; deliveryPrice: string; totalPaymentPrice: string }) {
    await expect(this.productPriceValue).toHaveText(opts.productPrice, { timeout: 5000 });
    await expect(this.deliveryPriceValue).toHaveText(opts.deliveryPrice, { timeout: 5000 });
    await expect(this.totalPaymentPriceValue).toHaveText(opts.totalPaymentPrice, { timeout: 5000 });
  }

  // payment/calculate 호출이 실패했을 때 "서버 오류" 안내 모달이 뜨는지 확인하고 닫는다.
  async expectServerErrorModalAndDismiss() {
    await expect(this.serverErrorModal).toBeVisible({ timeout: 5000 });
    await this.serverErrorModalConfirmButton.click();
    await expect(this.serverErrorModal).toBeHidden({ timeout: 5000 });
  }

  // 결제금액 패널의 배송비 값과 상품 카드 하단 요약 줄의 배송비 표기가 서로 일치하는지 확인한다.
  async expectDeliveryPriceConsistentAcrossPanels() {
    const panelText = (await this.deliveryPriceValue.textContent())?.trim() ?? '';
    const summaryText = (await this.summaryLine.textContent()) ?? '';
    const summaryDeliveryPart = summaryText.split('+ 배송비 ')[1]?.trim() ?? '';

    expect(
      summaryDeliveryPart,
      `결제금액 패널은 "${panelText}", 상품 카드 요약은 "${summaryDeliveryPart}"로 배송비 표기가 서로 다릅니다.`
    ).toBe(panelText);
  }

}
