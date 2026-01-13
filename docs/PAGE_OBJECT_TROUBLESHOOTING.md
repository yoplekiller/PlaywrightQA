# Page Object Model 트러블슈팅 가이드

> 이 문서는 Page Object Model 구현 중 겪은 실제 문제와 해결 방법을 기록합니다.

## 📅 작성일
- 2026-01-12

---

## 1. async/await 관련 이슈

### 문제 상황
```typescript
// ❌ 잘못된 코드
allure.step('메인 페이지 접속', async () => {
    await page.goto('https://www.kurly.com/main');
});
// 👆 어떤 문제가 있었나요?
```

### 에러 메시지
```
Error: page.goto: Test ended.
    Call log:
      - navigating to "https://www.kurly.com/main", waiting until "load
```

### 원인
- [ ] TODO: allure.step()에서 async 콜백을 사용할 때 무엇을 빠뜨렸나요?

### 해결 방법
```typescript
// ✅ 올바른 코드
// TODO: 여기에 수정한 코드를 작성하세요
```

### 배운 점
- allure.step()의 async 콜백은 _______ 해야 한다
- 비동기 함수를 호출할 때는 항상 _______ 를 확인해야 한다

---

## 2. Locator vs Boolean 반환 타입 실수

### 문제 상황
```typescript
// ❌ 잘못된 코드
async isGoodsSearchResultVisible(name: string): Promise<Locator> {
    return this.page.getByText(new RegExp(`'${name}'에 대한 검색결과`));
}

// 테스트에서
expect(await searchpage.isGoodsSearchResultVisible(search_term)).toBe(true);
```

### 에러 메시지
```
Expected: true
Received: {"_selector": "...", ...}
```

### 원인
- [ ] TODO: 메서드 이름은 `is...Visible()`인데 실제로는 무엇을 반환했나요?
- [ ] TODO: `is...` 로 시작하는 메서드는 어떤 타입을 반환해야 하나요?

### 해결 방법
```typescript
// ✅ 올바른 코드
async isGoodsSearchResultVisible(name: string): Promise<boolean> {
    return await this.goodsSearchResult(name).isVisible();
}
```

### 배운 점
- Locator는 요소를 찾는 _______ 이다
- 실제 가시성을 확인하려면 _______ 메서드를 호출해야 한다
- 메서드 이름과 반환 타입은 _______ 해야 한다

---

## 3. 함수 호출 시 괄호 누락

### 문제 상황
```typescript
// ❌ 잘못된 코드
expect(pickPage.isNeedLoginAltVisible).toBe(true);
```

### 에러 메시지
```
Expected: true
Received: [Function isNeedLoginAltVisible]
```

### 원인
- [ ] TODO: 무엇을 빠뜨렸나요?

### 해결 방법
```typescript
// ✅ 올바른 코드
// TODO: 여기에 수정한 코드를 작성하세요
```

---

## 4. page.goto() 타임아웃 이슈

### 문제 상황
```
Error: page.goto: Timeout 70000ms exceeded
navigating to "https://www.kurly.com/main", waiting until "load"
```

### 원인
- [ ] TODO: 기본 waitUntil 옵션은 무엇이었나요?
- [ ] TODO: 왜 타임아웃이 발생했을까요?

### 해결 방법
```typescript
// 옵션 1: waitUntil 변경
await page.goto('https://www.kurly.com/main', {
    waitUntil: '______' // TODO: 어떤 옵션을 사용했나요?
});

// 옵션 2: 타임아웃 조정
await page.goto('https://www.kurly.com/main', {
    timeout: ______ // TODO: 얼마로 설정했나요?
});
```

### waitUntil 옵션 비교
| 옵션 | 의미 | 속도 |
|------|------|------|
| `load` | 모든 리소스 로딩 완료 | 느림 |
| `domcontentloaded` | HTML 파싱 완료 | 빠름 |
| `networkidle` | 네트워크 요청 없음 (500ms) | 중간 |

---

## 5. 불필요한 async 키워드

### 발견한 내용
```typescript
// 🤔 이게 필요할까?
async goodsSearchResult(name: string) {
    return this.page.getByText(new RegExp(`'${name}'에 대한 검색결과`));
}
```

### 분석
- Playwright의 Locator는 즉시 반환됩니다 (lazy evaluation)
- 실제 비동기 작업(await)이 없다면 async가 필요없습니다

### 개선된 코드
```typescript
// ✅ 더 정확한 코드
goodsSearchResult(name: string): Locator {
    return this.page.getByText(new RegExp(`'${name}'에 대한 검색결과`));
}
```

### 배운 점
- async는 함수 내부에서 _______ 를 사용할 때만 필요하다
- Locator 생성은 _______ 작업이다

---

## 체크리스트: Page Object 메서드 작성 시

- [ ] `is...` 메서드는 `Promise<boolean>` 반환하는가?
- [ ] `get...` 메서드는 `Locator` 반환하는가?
- [ ] async 함수는 실제로 await를 사용하는가?
- [ ] 메서드 이름이 반환 타입을 잘 설명하는가?
- [ ] 테스트에서 async 메서드를 await 하는가?

---

## 참고 자료

### 비슷한 실수를 방지하려면
1. PickPage의 `isNeedLoginAltVisible()` 참고
2. TypeScript 반환 타입 명시하기
3. 메서드 이름 규칙 정하기 (`is...`, `get...`, `click...`)

### 관련 문서
- [POM_CART_VERIFICATION_GUIDE.md](./POM_CART_VERIFICATION_GUIDE.md)
- [REFACTORING_GUIDE.md](./REFACTORING_GUIDE.md)

---

## 다음에 적용할 점

1. [ ] TODO: 오늘 배운 것 중 가장 중요한 3가지는?
2. [ ] TODO: 다른 Page Object에도 같은 패턴을 적용할 부분은?
3. [ ] TODO: 테스트 코드 리뷰 시 체크할 항목은?
