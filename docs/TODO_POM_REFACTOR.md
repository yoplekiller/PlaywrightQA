# Page Object Model 리팩토링 작업 가이드

## 목표
테스트 코드에서 `page.` 직접 호출을 제거하고, 모든 액션을 Page Object 메서드로 이동

---

## 현재 상태

### 기존 Page Objects (7개)
| 파일 | 담당 페이지 |
|------|------------|
| `BasePage.ts` | 공통 메서드 |
| `MainPage.ts` | 메인 페이지 |
| `LoginPage.ts` | 로그인 페이지 |
| `SearchPage.ts` | 검색 결과 페이지 |
| `CartPage.ts` | 장바구니 페이지 |
| `GoodsPage.ts` | 상품 상세 페이지 |
| `PickPage.ts` | 찜하기 페이지 |

### 리팩토링 필요한 테스트 파일 (12개)
- [ ] `ui_address_search.spec.ts`
- [ ] `ui_sort_button.spec.ts`
- [ ] `ui_pick_page.spec.ts`
- [ ] `ui_product_cart.spec.ts`
- [ ] `ui_goods_page.spec.ts`
- [ ] `ui_product_duplicate.spec.ts`
- [ ] `ui_login.spec.ts`
- [ ] `ui_search.spec.ts`
- [ ] `ui_blank_search.spec.ts`
- [ ] `ui_beauty_btn.spec.ts`
- [ ] `ui_favorite_toggle.spec.ts`
- [ ] `ui_goods_add_and_verify.spec.ts`

---

## 작업 방법

### 1단계: 테스트 파일에서 `page.` 직접 호출 찾기

```typescript
// 이런 패턴들을 찾아라
await page.goto('...');
await page.click('...');
await page.fill('...');
await page.locator('...');
await page.getByRole('...');
await page.getByText('...');
await page.waitForSelector('...');
await page.waitForURL('...');
await expect(page).toHaveURL('...');
```

### 2단계: 적절한 Page Object에 메서드 추가

**메서드 네이밍 규칙:**
- 클릭: `click{대상}()` - `clickLoginButton()`
- 입력: `enter{대상}()` - `enterSearchKeyword()`
- 이동: `navigateTo{페이지}()` - `navigateToMain()`
- 확인: `is{상태}()` - `isLoggedIn()`
- 대기: `waitFor{대상}()` - `waitForSearchResults()`

**예시:**
```typescript
// MainPage.ts
export class MainPage extends BasePage {
    // 네비게이션
    async navigateToMain() {
        await this.page.goto('https://www.kurly.com/main');
    }

    // 액션
    async clickAddressSearchButton() {
        await this.page.getByRole('button', { name: '주소 검색' }).click();
    }

    // 검증
    async isOnMainPage(): Promise<boolean> {
        return this.page.url().includes('/main');
    }
}
```

### 3단계: 테스트 코드 수정

```typescript
// Before ❌
await page.goto('https://www.kurly.com/main');
await page.getByRole('button', { name: '주소 검색' }).click();

// After ✅
await mainPage.navigateToMain();
await mainPage.clickAddressSearchButton();
```

---

## 파일별 작업 체크리스트

### ui_address_search.spec.ts
- [ ] `page.goto()` → `mainPage.navigateToMain()`
- [ ] `page.getByRole('button', { name: '주소 검색' })` → `mainPage.clickAddressSearchButton()`
- [ ] `page.waitForEvent('popup')` → 필요시 새 메서드 추가
- [ ] `expect(popup).toHaveURL()` → `addressPage.verifyPopupURL()` (새 Page Object 필요할 수 있음)

### ui_sort_button.spec.ts
- [ ] `page.goto()` → `mainPage.navigateToMain()`
- [ ] `page.getByRole('link', { name })` → `searchPage.clickSortTab(name)`
- [ ] `page.locator('.css-1dry2r1')` → `searchPage.getFirstProduct()`
- [ ] `page.screenshot()` → 그대로 유지 (테스트 관심사)

### ui_pick_page.spec.ts
- [ ] `page.goto()` → `mainPage.navigateToMain()`
- [ ] `page.waitForURL('**/pick/**')` → `pickPage.waitForPickPage()`
- [ ] `page.waitForSelector('text=로그인...')` → `pickPage.waitForLoginAlert()`

### ui_product_cart.spec.ts
- [ ] `page.goto()` → `mainPage.navigateToMain()`
- [ ] `page.waitForTimeout()` → 가능하면 명시적 대기로 변경
- [ ] `page.locator('h1')` → `goodsPage.getProductTitle()`
- [ ] `page.getByText('장바구니에 상품을 담았습니다.')` → `cartPage.isAddedToCartMessageVisible()`

---

## 새로 추가할 수 있는 Page Objects

| Page Object | 용도 |
|-------------|------|
| `AddressPage.ts` | 주소 검색 팝업 |

---

## 작업 순서 추천

1. **쉬운 것부터**: `ui_login.spec.ts`, `ui_beauty_btn.spec.ts`
2. **중간 난이도**: `ui_address_search.spec.ts`, `ui_goods_page.spec.ts`
3. **복잡한 것**: `ui_sort_button.spec.ts`, `ui_goods_add_and_verify.spec.ts`

---

## 완료 기준

- [ ] 모든 테스트 파일에서 `page.goto()` 직접 호출 제거
- [ ] 모든 테스트 파일에서 `page.click()`, `page.fill()` 직접 호출 제거
- [ ] 모든 테스트 파일에서 `page.locator()`, `page.getByRole()` 직접 호출 제거
- [ ] 테스트 실행해서 모두 통과 확인
- [ ] README.md에서 "POM 패턴 적용" 체크 완료로 변경
