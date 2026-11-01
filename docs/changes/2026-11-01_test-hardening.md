# 2026-11-01 테스트 고도화: 안정화 · 실행 결과 분류 · API+UI 하이브리드 · CI

## 무엇을 / 왜

| # | 변경 | 왜 |
|---|---|---|
| 1 | 장바구니 수량 검증 로케이터 수정 (`CartPage.expectGoodsQuantity`) | 페이지 전체에서 텍스트 `"1"`을 찾아서 장바구니 배지의 `1`과 겹침 → strict mode 위반으로 **로컬 5/5 실패**. `@smoke` 전용이라 CI(`@regression`)에서 안 돌아 아무도 몰랐음 |
| 2 | 장바구니 담기 성공을 API 응답으로 판정 (`GoodsPage.clickAddGoodsInCartButton`) | 토스트 대기를 `.catch()`로 삼켜서 **담기가 실패해도 다음 단계로 진행** → 장바구니 화면에서 원인 모를 실패로 나타나는 구조였음 |
| 3 | 상품 중복 담기 테스트 skip 해제 | 1·2 수정 후 수량 2 검증이 통과함 |
| 4 | 하드 대기 제거 (`MainPage` 주소 hover/popup, `SearchPage` 마지막 페이지) | `for` 재시도 + `waitForTimeout(300)`, 고정 `waitForTimeout(1000)` → 환경 속도에 따라 느리거나 불안정 |
| 5 | 접근성 테스트를 `test.fail()` → 기준선(baseline) 방식으로 | `test.fail()`이면 페이지가 아예 안 떠서 실패해도 "예상된 실패"로 묻혀 **아무것도 지켜주지 못함** |
| 6 | 실행 결과 분류 리포터 (`classify.ts`, `SummaryReporter.ts`, `SlackReporter` 수정) | 기존 Slack 리포터가 `result.status`로 세서 **known issue(`test.fail`)를 실패로 집계** → 매일 빨간불이라 새 회귀를 못 알아봄 |
| 7 | API+UI 하이브리드 테스트 4건 (`ui_api_hybrid.spec.ts`) | 가격정렬 테스트는 화면 가격(쿠폰가·첫구매가)을 파싱해서 쿠폰 카드를 빼는 우회가 필요했음. 정렬 기준은 API 데이터로, 화면은 "API 순서대로 그렸나"로 나눠 검증 |
| 8 | 로그인 실패 테스트 2건 (`ui_login_failed.spec.ts`, 작성 중이던 초안 완성) | 초안이 실제 계정 env로 "실패 메시지"를 기대하는 모순 상태였음 → 존재할 수 없는 계정/빈 값으로 변경 |
| 9 | CI: trace 보존, 단계 이름·요약 정정 | 실행 후 `rm -rf test-results/**/*.zip`이 **재시도 trace까지 삭제** → 실패 원인 분석 불가. PR 단계 이름은 "smoke"인데 실제로는 Chromium+Edge regression 실행 |

현황 파악에서 확인한 것: 10-19~11-01 매일 스케줄 실패 4건은 전부 사이트 결함(반응형 가로스크롤 2, 무료배송 표기 불일치, 가격정렬)으로, 10-11 수정분이 11-01에 반영된 뒤 push 실행은 통과. 주소검색·장바구니 담기는 최근 CI에서 실패 없음(로컬 사전 측정 5/5).
`npm run typecheck`(`tsc --noEmit`)는 이 레포에선 39개 파일을 실제로 검사함 — 다른 프로젝트의 "0개 검사" 문제 없음, 수정 불필요.

## 반복 실행 결과

| 대상 | 수정 전 | 수정 후 |
|---|---|---|
| 주소검색 + 장바구니 담기 + 장바구니 수량 (`--repeat-each=5`) | 10/15 (장바구니 수량 0/5) | **20/20** (중복 담기 포함 4스펙 × 5) |
| 페이지네이션 (`--repeat-each=2`) | - | 8/8 |
| 접근성 (`--repeat-each=3`) | (known issue 처리) | 3/3, 기준선 4종 기록 |
| API+UI 하이브리드 (`--repeat-each=3`) | 신규 | 12/12 |
| 로그인 실패 (`--repeat-each=2`) | 초안(미동작) | 4/4 |
| 전체 regression (CI 설정: retries 1, workers 2) | 22 통과 / 3 실패(known) / 1 스킵 | **29 통과 / 3 known issue / 0 실패 / 0 flaky / 0 스킵** |

## 핵심 코드

**장바구니 담기 = API 응답으로 판정** (`src/pages/GoodsPage.ts`)
```ts
const responsePromise = this.page.waitForResponse(
    res => res.url().includes(CART_ADD_API) && res.request().method() === 'POST',
    { timeout: 10000 },
);
await this.addGoodsButtonInCart.click();
results.push(await this.expectCartAddSucceeded(await responsePromise));
// expectCartAddSucceeded: HTTP 200 + body.success === true, 요청 body 의 dealProductNo/quantity 반환
```

**hover 재시도를 `expect().toPass()`로** (`src/pages/MainPage.ts`)
```ts
await expect(async () => {
    await this.page.mouse.move(0, 0);
    await this.addressButton.hover();
    await expect(this.addressSearchButton).toBeVisible({ timeout: 2000 });
}).toPass({ timeout: 10000 });
```

**결과 분류** (`src/tests/reporters/classify.ts`)
```ts
const outcome = test.outcome();            // 'expected' | 'unexpected' | 'flaky' | 'skipped'
if (outcome === 'flaky') return 'flaky';
if (outcome === 'expected') return test.expectedStatus === 'failed' ? 'knownIssue' : 'passed';
if (test.expectedStatus === 'failed') return 'failed'; // known issue 가 예상외로 통과 → test.fail() 제거 신호
```

**하이브리드: 정렬 기준은 API, 화면은 API 순서대로** (`src/tests/ui/ui_api_hybrid.spec.ts`)
```ts
const responsePromise = waitForSearchResponse(page, SORT_TYPES[sortName]); // 클릭 전에 대기 등록
await page.getByRole('link', { name: sortName }).click();
const apiItems = await parseSearchItems(await responsePromise);
expect(prices).toEqual(sorted);                                   // 서버 데이터 정렬
await expect.poll(() => searchPage.getProductNos(count))
    .toEqual(apiItems.slice(0, count).map(item => item.no));       // 화면 순서 = API 순서
```

**접근성 기준선** (`src/tests/ui/ui_accessibility.spec.ts`)
```ts
const newViolations = blocking.filter(v => !(v.id in KNOWN_VIOLATIONS));
expect(report.checkedRules).toBeGreaterThan(20);  // 빈 화면 검사 방지
expect(report.new).toEqual([]);                    // 기준선 외 신규 위반만 실패
```

## 검증 포인트

| 테스트 | assert | 확인하는 것 |
|---|---|---|
| 장바구니 담기 (모든 담기 흐름 공통) | `response.status()` = 200, `body.success` = true | 담기가 서버에서 실제로 성공했는가 |
| `ui_api_hybrid` 검색 순서 | `getProductNos(20)` = API `items[].no` | 화면이 서버 결과를 빠짐·순서 바뀜 없이 그렸는가 |
| `ui_api_hybrid` 가격순 | `sortType` = 2/3, `discountedPrice ?? salesPrice` 정렬, 화면 순서 = API 순서 | 정렬 요청값 / 서버 정렬 / 화면 렌더링을 각각 따로 |
| `ui_api_hybrid` 장바구니 | 담은 quantity 합 = 스테퍼 수량 | API 로 담은 수량이 화면에 그대로 반영되는가 |
| `ui_accessibility` | 검사 규칙 수 > 20, 신규 위반 = [] | 페이지가 정상 로드됐고, 기존 위반 외 새 접근성 결함이 없는가 |
| `ui_login_failed` | 안내 dialog, URL `/member/login` 유지, 프로필 링크 0개 | 틀린 계정으로 로그인되지 않는가 |

실측으로 알게 된 사실: 검색 API(`search/v4/sites/market/normal-search`)는 **할인가 우선 실제 판매가 기준으로 정확히 정렬**하고 화면도 그 순서 그대로다. 예전 가격정렬 실패는 정렬 결함이 아니라 화면 표시가(쿠폰·첫구매 혜택가)를 파싱한 테스트 쪽 문제였다.

## 선택 이유

- **로케이터**: 장바구니 수량은 "스테퍼 감소 버튼의 다음 형제 `<p>`" — 접근성 이름(`Stepper minus`)이 고정이라 해시 클래스보다 안정적이고, 페이지의 다른 숫자와 안 겹침. 하이브리드 비교는 텍스트 대신 카드 링크의 `/goods/{상품번호}` — 표시 문구·가격 표기가 바뀌어도 상품 식별은 안 흔들림.
- **대기**: 토스트(표시 시간 환경마다 다름) 대신 API 응답을 기다림. `waitForResponse`는 **클릭 전에 등록**해야 빠른 응답을 놓치지 않음. "hover → 툴팁 확인"처럼 여러 동작을 묶어 재시도할 땐 `expect().toPass()` (Playwright 권장). "아무 일도 안 일어남" 검증은 기다릴 요소가 없어서 `networkidle` 후 URL·목록 불변 확인.
- **known issue 처리**: 사이트 결함은 `test.fail()` 유지(반응형·무료배송 표기). 단 접근성처럼 **여러 위반을 한 테스트가 다루는 경우는 기준선 방식** — `test.fail()`은 "어떤 이유로든 실패"를 다 삼키기 때문.
- **분류 기준을 `test.outcome()`으로**: Playwright 가 retry·expectedStatus 를 반영해 계산한 값이라, 리포터가 상태를 직접 세는 것보다 정확하고 HTML 리포트와 일치.

## 면접 예상 질문 & 답

**Q. flaky 테스트는 어떻게 다뤘나요?**
A. 먼저 CI 이력과 `--repeat-each` 반복 실행으로 수치를 냈습니다. 매일 실패하던 4건은 flaky 가 아니라 사이트 결함이라 known issue 로 분리했고, 실제로 반복 실패한 건 장바구니 수량 테스트(5/5)였는데 원인은 로케이터가 페이지 전체의 "1"을 찾는 테스트 결함이었습니다. 그리고 리포터가 flaky(재시도 통과)를 별도로 분류해서 안정화 대상을 따로 보이게 했습니다.

**Q. 하드 대기(`waitForTimeout`)를 왜 없앴나요? 대신 뭘 썼나요?**
A. 고정 시간은 빠른 환경에선 낭비, 느린 환경에선 부족해서 flaky 의 원인이 됩니다. 조건 기반으로 바꿨습니다 — 담기 성공은 API 응답, hover 툴팁은 `expect().toPass()`로 동작+확인을 묶어 재시도, 변화 없음 검증은 `networkidle` 후 상태 비교.

**Q. API+UI 하이브리드 테스트의 장점은?**
A. 실패했을 때 어느 계층 문제인지 바로 갈립니다. 정렬 테스트에서 요청값(sortType), 서버 정렬, 화면 렌더링을 따로 검증하니까, 예전처럼 화면 가격만 보고 "정렬이 깨졌다"고 오판하지 않습니다. 실제로 이걸로 기존 가격정렬 실패가 정렬 결함이 아니라 표시가 파싱 문제였다는 걸 확인했습니다.

**Q. `test.fail()`을 왜 접근성 테스트에서는 뺐나요?**
A. `test.fail()`은 실패 이유를 구분하지 않아서, 페이지 로드 실패나 셀렉터 오류도 "예상된 실패"로 통과 처리됩니다. 접근성은 기존 위반 목록을 기준선으로 두고 새 위반만 실패시키는 게 회귀 테스트로서 의미가 있습니다. 반대로 사이트가 기존 위반을 고치면 리포트에 "기준선 갱신 필요"로 표시됩니다.

**Q. CI 결과에서 새 회귀와 이미 아는 문제를 어떻게 구분하나요?**
A. 리포터가 `test.outcome()` 기준으로 통과/flaky/known issue/실패/스킵을 나눠 Actions 요약과 Slack 에 같은 표로 보냅니다. ❌ 실패 칸에 뭔가 있으면 새 문제, 📌 known issue 는 예상된 사이트 결함입니다. known issue 가 갑자기 통과하면 실패로 올려서 `test.fail()`을 지우라고 알립니다.

**Q. 실패 원인을 CI 에서 어떻게 분석하나요?**
A. CI 는 첫 재시도 때 trace 를 남기는데, 예전 워크플로우가 실행 후 zip 을 지워서 trace 가 사라지고 있었습니다. 그걸 고쳐서 Artifacts 의 `ui-playwright-test-results`에서 trace·스크린샷·분류표를 받아 `npx playwright show-trace`로 봅니다.
