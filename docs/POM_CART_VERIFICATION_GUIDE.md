# 🛒 상품 추가 후 장바구니 확인 테스트 가이드

**작성일**: 2026-01-07
**작성자**: Claude Code
**목적**: Playwright + POM 패턴을 사용한 장바구니 검증 테스트 작성 가이드

---

## 📋 요구사항

사용자가 원하는 테스트 시나리오:
> **상품을 추가하고 그 상품이 추가되었는지 확인하는 케이스를 만들고 싶다**

---

## 🎯 구현 목표

### 테스트 플로우
1. 메인 페이지 접속
2. 상품 검색
3. 첫 번째 상품 선택
4. 장바구니에 추가
5. **장바구니 페이지에서 해당 상품이 담겼는지 확인** ✅

---

## 📁 작업 내용

### 1. Page Object 개선

#### SearchPage.ts 추가 기능
```typescript
// 첫 번째 상품 클릭
async clickFirstGoods() {
    await this.firstGoods.click();
}

// 첫 번째 상품 이름 가져오기
async getFirstGoodsName(): Promise<string> {
    return await this.firstGoods.textContent() || '';
}

// 장바구니 담기 버튼 클릭
async clickAddCartButton() {
    await this.click(this.addCartButton);
}

// 장바구니로 이동
async goToCartPage() {
    await this.page.goto('https://www.kurly.com/cart');
}
```

#### CartPage.ts 추가 기능
```typescript
// 장바구니가 비어있는지 확인
async isCartEmpty(): Promise<boolean> {
    return await this.EmptyCartText.isVisible();
}

// 특정 상품이 장바구니에 있는지 확인
async hasGoods(goodsName: string): Promise<boolean> {
    const goodsLocator = this.page.locator(`text=${goodsName}`);
    return await goodsLocator.first().isVisible({ timeout: 5000 }).catch(() => false);
}

// 장바구니에 담긴 모든 상품명 가져오기
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

// 장바구니 URL로 이동
async goto() {
    await this.page.goto('https://www.kurly.com/cart');
}
```

> **⚠️ 네이밍 규칙**: 마켓컬리 URL이 `/goods/123` 형식이므로 **Product 대신 Goods**로 통일했습니다!

---

### 2. 테스트 코드 작성

**파일**: `src/tests/ui/ui_goods_add_and_verify.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { CartPage } from '../../pages/CartPage';
import { getNowString } from '../../utils/dataFormat';

test.describe('🛒 상품 추가 및 장바구니 확인 (POM 패턴)', () => {

  test('상품 검색 → 상품 추가 → 장바구니에서 확인', async ({ page }, testInfo) => {
    allure.description(
      '검색어로 상품을 검색하고, 첫 번째 상품을 장바구니에 담은 후, ' +
      '장바구니 페이지에서 해당 상품이 정확히 담겨 있는지 확인하는 E2E 테스트'
    );
    allure.severity('critical');
    allure.tag('UI', 'Cart', 'POM');

    const cartPage = new CartPage(page);

    // Step 1: 메인 페이지로 이동
    await page.goto('https://www.kurly.com/main');
    await expect(page).toHaveURL(/.*kurly.com\/main/);

    // Step 2: 상품 검색
    const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
    await searchBox.click();
    await searchBox.fill('과자');
    await searchBox.press('Enter');
    await page.waitForTimeout(2000);

    // Step 3: 첫 번째 상품 클릭
    const firstGoods = page.locator('.css-1dry2r1.e1c07x485').first();
    await expect(firstGoods).toBeVisible();
    await firstGoods.click();
    await page.waitForTimeout(2000);

    // Step 4: 장바구니 담기
    const cartButton = page.locator('button:has-text("장바구니 담기")');
    await expect(cartButton).toBeVisible();
    await cartButton.click();
    await page.waitForTimeout(2000);

    // Step 5: 장바구니로 이동
    await page.goto('https://www.kurly.com/cart');
    await expect(page).toHaveURL('https://www.kurly.com/cart');

    // Step 6: 장바구니에 상품이 있는지 확인
    const isEmpty = await cartPage.isCartEmpty().catch(() => false);
    expect(isEmpty).toBeFalsy(); // 장바구니가 비어있지 않아야 함

    console.log(`✅ 장바구니에 상품이 추가되었습니다`);
  });
});
```

---

## ⚠️ 발견된 이슈

### 1. 로그인 필요 (추정)
- 장바구니에 상품이 추가되지 않음
- `isCartEmpty()` 메서드가 `true` 반환
- **원인**: 마켓컬리는 비회원 장바구니를 지원하지 않을 가능성

### 2. 해결 방안

#### Option A: 로그인 추가
```typescript
// LoginPage 사용
const loginPage = new LoginPage(page);
await loginPage.login(process.env.kurly_id, process.env.kurly_pw);
```

#### Option B: 테스트 목적 변경
- 장바구니 **담기 버튼 클릭**까지만 테스트
- 장바구니 페이지 접근은 로그인 필요성 확인 테스트로 분리

#### Option C: 상품명 검증 추가 (권장)
```typescript
// 상품명을 동적으로 저장한 후 장바구니에서 검증
const goodsName = await page.locator('.goods-name').first().textContent();
await cartPage.hasGoods(goodsName); // true/false 반환
```

---

## 🎓 배운 점

### 1. POM 패턴의 장점
- **재사용성**: `CartPage.hasProduct()` 메서드를 다른 테스트에서도 사용 가능
- **가독성**: 테스트 코드가 간결하고 이해하기 쉬움
- **유지보수**: Locator가 변경되어도 Page Object만 수정하면 됨

### 2. Locator 선택의 중요성
- CSS 클래스 기반 Locator는 변경될 수 있음 → 불안정
- `getByRole`, `getByPlaceholder` 등 semantic한 Locator 사용 권장
- 예시:
  ```typescript
  // ❌ 불안정
  page.locator('.css-1dry2r1.e1c07x485')

  // ✅ 안정적
  page.getByRole('button', { name: '장바구니 담기' })
  page.getByPlaceholder('검색어를 입력해주세요')
  ```

### 3. 비동기 처리
- `waitForTimeout()`은 임시 방편
- 더 나은 방법:
  ```typescript
  // ❌ 고정 대기
  await page.waitForTimeout(2000);

  // ✅ 조건부 대기
  await expect(firstProduct).toBeVisible();
  await page.waitForURL(/.*cart/);
  ```

---

## 📊 테스트 결과

### 현재 상태
- ❌ 장바구니 확인 실패 (로그인 필요로 추정)
- ✅ 상품 검색, 선택, 담기 버튼 클릭까지는 성공

### 다음 단계
1. **로그인 기능 추가** - env 파일에 ID/PW 설정
2. **상품명 동적 검증** - 추가한 상품이 정확히 장바구니에 있는지 확인
3. **Locator 개선** - CSS 클래스 대신 semantic locator 사용

---

## 💡 권장 구조 (최종)

### 완벽한 테스트 플로우
```typescript
test('상품 추가 → 장바구니 확인 (로그인 포함)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  // 1. 로그인
  await loginPage.goto();
  await loginPage.login(process.env.kurly_id, process.env.kurly_pw);

  // 2. 메인 페이지 접속
  await page.goto('https://www.kurly.com/main');

  // 3. 상품 검색
  await page.getByPlaceholder('검색어를 입력해주세요').fill('과자');
  await page.getByPlaceholder('검색어를 입력해주세요').press('Enter');

  // 4. 첫 번째 상품명 저장 (중요!)
  const firstGoods = page.locator('.goods-card').first();
  const goodsName = await firstGoods.locator('.goods-name').textContent();

  // 5. 상품 클릭 및 장바구니 담기
  await firstGoods.click();
  await page.getByRole('button', { name: '장바구니 담기' }).click();

  // 6. 장바구니로 이동
  await page.goto('https://www.kurly.com/cart');

  // 7. 상품명 검증 (동적)
  const hasGoods = await cartPage.hasGoods(goodsName);
  expect(hasGoods).toBeTruthy();

  console.log(`✅ "${goodsName}" 상품이 장바구니에 추가되었습니다`);
});
```

---

## 📝 체크리스트

### 완료된 작업
- [x] SearchPage에 상품명 가져오기 메서드 추가
- [x] CartPage에 장바구니 검증 메서드 추가
- [x] 기본 테스트 케이스 작성
- [x] POM 패턴 적용

### 추가 작업 필요
- [ ] 로그인 기능 추가
- [ ] 상품명 동적 검증
- [ ] Locator를 semantic하게 개선
- [ ] 테스트 안정성 개선 (waitForTimeout 제거)
- [ ] 에러 핸들링 추가

---

## 🔗 참고 자료

- [Playwright 공식 문서 - Locators](https://playwright.dev/docs/locators)
- [Playwright - Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model 패턴](https://playwright.dev/docs/pom)

---

**마지막 수정**: 2026-01-07
**다음 업데이트 예정**: 로그인 기능 추가 후
