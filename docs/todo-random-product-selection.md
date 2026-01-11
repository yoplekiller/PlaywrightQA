# TODO: 랜덤 상품 선택 기능 구현

## 📋 작업 개요

**날짜**: 2026-01-12 (내일 작업)
**우선순위**: Medium
**예상 소요 시간**: 30분

## 🎯 목표

SearchPage 또는 GoodsPage에 임의의 상품을 선택하는 메서드를 추가하여, 테스트 시 매번 다른 상품을 선택할 수 있도록 한다.

## 📝 구현 내용

### 1. 기본 랜덤 선택 메서드

```typescript
async clickRandomGoods() {
    // 1. 전체 상품 개수 가져오기
    const count = await this.productItems.count();

    // 2. 랜덤 인덱스 생성 (0 ~ count-1)
    const randomIndex = Math.floor(Math.random() * count);

    // 3. 해당 인덱스의 상품 클릭
    await this.productItems.nth(randomIndex).click();

    console.log(`✅ ${randomIndex + 1}번째 상품 선택 (전체 ${count}개 중)`);
}
```

### 2. 사용 예시

```typescript
// ui_product_cart.spec.ts
test('랜덤 상품을 장바구니에 담기', async ({ page }) => {
    const mainpage = new Mainpage(page);
    const searchPage = new SearchPage(page);

    await allure.step('메인 페이지 이동', async () => {
        await mainpage.navigate();
    });

    await allure.step('상품 검색', async () => {
        await mainpage.searchGoods('수박');
        await page.waitForLoadState('networkidle');
    });

    await allure.step('랜덤 상품 선택', async () => {
        await searchPage.clickRandomGoods(); // 🎲 매번 다른 상품 선택!
    });

    // ... 장바구니 담기 로직
});
```

## 🚀 구현 단계

1. **Locator 확인**
   - [ ] `this.productItems`가 제대로 정의되어 있는지 확인
   - [ ] 만약 없다면 추가: `this.productItems = page.locator('.product-item')` (실제 클래스명으로 수정)

2. **메서드 추가**
   - [ ] `clickRandomGoods()` 메서드를 SearchPage 또는 GoodsPage에 추가
   - [ ] console.log로 선택된 상품 번호 출력

3. **테스트 작성**
   - [ ] 기존 `ui_product_cart.spec.ts`에서 사용해보기
   - [ ] 여러 번 실행해서 랜덤으로 잘 선택되는지 확인

4. **문서화**
   - [ ] README.md에 랜덤 선택 기능 추가 언급

## 🎨 선택적 개선 사항

### 옵션 1: 범위 지정 랜덤 선택

```typescript
async clickRandomGoods(options?: { min?: number; max?: number }) {
    const count = await this.productItems.count();
    const min = options?.min || 0;
    const max = options?.max || count - 1;

    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    await this.productItems.nth(randomIndex).click();

    console.log(`✅ ${randomIndex + 1}번째 상품 선택 (${min + 1} ~ ${max + 1} 범위 내)`);
}

// 사용 예시
await searchPage.clickRandomGoods({ min: 2, max: 5 }); // 3~6번째 상품 중 선택
```

### 옵션 2: 첫 번째 상품 제외하기

```typescript
async clickRandomGoodsExcludingFirst() {
    const count = await this.productItems.count();

    if (count <= 1) {
        throw new Error('선택 가능한 상품이 없습니다');
    }

    // 1 ~ count-1 범위에서 랜덤 선택 (0번째 제외)
    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;
    await this.productItems.nth(randomIndex).click();

    console.log(`✅ ${randomIndex + 1}번째 상품 선택 (첫 번째 제외, 전체 ${count}개 중)`);
}
```

### 옵션 3: 상품명 로깅

```typescript
async clickRandomGoods() {
    const count = await this.productItems.count();
    const randomIndex = Math.floor(Math.random() * count);

    const item = this.productItems.nth(randomIndex);

    // 상품명 가져오기 (실제 locator는 프로젝트에 맞게 수정)
    const productName = await item.locator('h1').first().textContent();

    await item.click();

    console.log(`✅ ${randomIndex + 1}번째 상품 선택: ${productName}`);
}
```

## ⚠️ 주의 사항

1. **상품 개수 확인**
   - 검색 결과가 0개일 경우 에러 핸들링 필요
   ```typescript
   const count = await this.productItems.count();
   if (count === 0) {
       throw new Error('검색 결과가 없습니다');
   }
   ```

2. **동적 로딩 대기**
   - 검색 후 상품 목록이 로드될 때까지 대기 필요
   ```typescript
   await page.waitForLoadState('networkidle');
   // 또는
   await expect(this.productItems.first()).toBeVisible();
   ```

3. **재현 가능성**
   - 랜덤 테스트는 실패 시 재현이 어려움
   - 디버깅을 위해 선택된 인덱스를 반드시 로깅
   - 필요시 시드(seed) 값을 받아 고정된 랜덤 생성 가능

## 📚 참고 자료

- [Playwright count()](https://playwright.dev/docs/api/class-locator#locator-count)
- [Playwright nth()](https://playwright.dev/docs/api/class-locator#locator-nth)
- [Math.random() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

## ✅ 완료 체크리스트

- [ ] `clickRandomGoods()` 메서드 구현
- [ ] SearchPage 또는 GoodsPage에 추가
- [ ] 테스트 코드에서 사용
- [ ] console.log로 선택 상품 로깅
- [ ] 여러 번 실행해서 랜덤 동작 확인
- [ ] (선택) 범위 지정 옵션 추가
- [ ] (선택) 상품명 로깅 추가
- [ ] README.md 업데이트

---

**작성일**: 2026-01-11
**작성자**: Claude Code
**관련 이슈**: 상품 테스트 다양성 확보
