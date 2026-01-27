# Playwright 테스트 자동화 프레임워크

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/ko/actions)

> 마켓컬리 웹사이트 UI E2E 테스트 자동화 프레임워크

[Live Test Report](https://yoplekiller.github.io/PlaywrightQA/playwright-report/index.html)

---

## 프로젝트 소개

### 목적

- QA 엔지니어 포지션 지원을 위한 포트폴리오 프로젝트
- Playwright + TypeScript 기반 테스트 자동화 기술 학습
- 실제 운영 중인 웹사이트(마켓컬리)를 대상으로 실무 수준의 E2E 테스트 구현

### 주요 특징

- **Page Object Model (POM)**: 7개 페이지 클래스로 구조화된 테스트 코드
- **데이터 드리븐 테스트**: ExcelJS 기반 외부 데이터 관리
- **CI/CD 파이프라인**: GitHub Actions 8시간 주기 자동 실행
- **Slack 실시간 알림**: Block Kit UI 기반 테스트 결과 리포팅
- **크로스 브라우저**: Chromium + Edge 동시 테스트
- **자동 리포트 배포**: GitHub Pages를 통한 HTML Report 배포

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Test Framework | Playwright 1.52 |
| Language | TypeScript 5.8 |
| Browsers | Chromium, Edge |
| Reporting | Playwright HTML Report, Slack Block Kit |
| CI/CD | GitHub Actions (8시간 주기 스케줄) |
| Data Management | ExcelJS (Excel 기반 테스트 데이터) |
| Design Pattern | Page Object Model (POM) |

---

## 프로젝트 구조

```
PlaywrightQA/
├── .github/workflows/
│   └── playwright-test.yaml           # CI/CD 파이프라인
│
├── src/
│   ├── pages/                         # Page Object Model (7개)
│   │   ├── BasePage.ts                #   공통 메서드 (기본 클래스)
│   │   ├── MainPage.ts               #   메인 페이지 (검색, 네비게이션)
│   │   ├── LoginPage.ts              #   로그인 페이지
│   │   ├── SearchPage.ts             #   검색 결과 페이지
│   │   ├── GoodsPage.ts              #   상품 상세 페이지
│   │   ├── CartPage.ts               #   장바구니 페이지
│   │   └── PickPage.ts               #   찜 페이지
│   │
│   ├── tests/
│   │   ├── ui/                        # UI 테스트 (8개)
│   │   │   ├── requires-auth/         #   인증 필요 테스트 (4개)
│   │   │   │   ├── ui_login.spec.ts
│   │   │   │   ├── ui_favorite_toggle.spec.ts
│   │   │   │   ├── ui_goods_add_and_verify.spec.ts
│   │   │   │   └── ui_pick_page.spec.ts
│   │   │   ├── ui_search.spec.ts
│   │   │   ├── ui_blank_search.spec.ts
│   │   │   ├── ui_goods_page.spec.ts
│   │   │   ├── ui_goods_cart.spec.ts
│   │   │   ├── ui_goods_duplicate.spec.ts
│   │   │   ├── ui_beauty_btn.spec.ts
│   │   │   ├── ui_address_search.spec.ts
│   │   │   └── ui_sort_button.spec.ts
│   │   │
│   │   ├── data/
│   │   │   └── test_case.xlsx         #   검색 테스트 데이터 (Excel)
│   │   │
│   │   └── reporters/
│   │       └── SlackReporter.ts       #   Slack Block Kit 리포터
│   │
│   └── utils/
│       ├── excel_loader.ts            #   Excel 데이터 로더
│       ├── logger.ts                  #   테스트 로거 (콘솔 + 파일)
│       └── dataFormat.ts              #   날짜/문자열 포맷 유틸
│
├── docs/                              # 프로젝트 문서
├── playwright.config.ts               # Playwright 설정
├── tsconfig.json                      # TypeScript 설정
└── package.json
```

---

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm

### 설치

```bash
# 1. 저장소 클론
git clone https://github.com/YopleKiller/PlaywrightQA.git
cd PlaywrightQA

# 2. 의존성 설치
npm install

# 3. Playwright 브라우저 설치
npx playwright install --with-deps
```

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다:

```env
# Slack 알림 (선택)
SLACK_WEBHOOK_TS=your_slack_webhook_url

# 마켓컬리 테스트 계정 (인증 필요 테스트용)
KURLY_TEST_USER_EMAIL=your_kurly_id
KURLY_TEST_USER_PASSWORD=your_kurly_password
```

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `SLACK_WEBHOOK_TS` | Slack Webhook URL | X |
| `KURLY_TEST_USER_EMAIL` | 마켓컬리 테스트 계정 이메일 | 인증 테스트 시 |
| `KURLY_TEST_USER_PASSWORD` | 마켓컬리 테스트 계정 비밀번호 | 인증 테스트 시 |

### 테스트 실행

```bash
# 전체 테스트 실행 (Chromium + Edge)
npm test

# UI 테스트만 실행
npm run test:ui

# HTML 리포트 열기
npm run report

# 특정 브라우저로 실행
npx playwright test --project=chromium
npx playwright test --project=Edge

# 인증 필요 테스트 포함 실행 (로컬)
npx playwright test src/tests/ui/requires-auth/
```

---

## 테스트 커버리지

### UI 테스트 - 일반 (8개 파일)

CI/CD에서 Chromium + Edge 두 브라우저로 자동 실행됩니다.

| 파일 | 테스트명 | 검증 내용 |
|------|----------|-----------|
| `ui_search` | 엑셀 기반 상품 검색 | Excel 데이터에서 검색어를 읽어 순차 검색, URL 및 결과 노출 확인 |
| `ui_blank_search` | 공백 입력 시 팝업 노출 | 검색창에 공백 입력 후 "검색어를 입력해주세요" 팝업 노출 확인 |
| `ui_goods_page` | 상품 상세페이지 진입 | 검색 후 첫 번째 상품 클릭, 상세 페이지 정상 진입 확인 |
| `ui_goods_cart` | 검색 > 상세 > 장바구니 담기 | 상품 검색 > 상세 진입 > 장바구니 담기 > 장바구니 페이지에서 상품 확인 |
| `ui_goods_duplicate` | 상품 중복 담기 | 동일 상품 N회 장바구니 담기 후 수량 검증 |
| `ui_beauty_btn` | 뷰티컬리 버튼 동작 | 뷰티컬리 버튼 클릭 후 `/main/beauty` URL 이동 확인 |
| `ui_address_search` | 주소 검색 E2E 플로우 | 주소 버튼 hover > 검색 팝업 열기 > 팝업 URL 검증 |
| `ui_sort_button` | 카테고리별 정렬 검증 | 6개 정렬 탭(신상품순, 판매량순 등) 순회 클릭 후 상품 노출 확인 |

### UI 테스트 - 인증 필요 (4개 파일)

로그인 후 실행되는 테스트로, CI에서는 `testIgnore` 설정으로 제외되며 로컬에서 별도 실행합니다.

| 파일 | 테스트명 | 검증 내용 |
|------|----------|-----------|
| `ui_login` | 로그인 후 메인 버튼 확인 | 로그인 수행 후 사용자 프로필 링크 노출 확인 |
| `ui_favorite_toggle` | 상품 찜하기 토글 | 로그인 > 상품 검색 > 찜하기 버튼 클릭 > 토스트 메시지 확인 |
| `ui_goods_add_and_verify` | 상품 추가 및 장바구니 확인 | 로그인 > 검색 > 상품 클릭 > 장바구니 담기 > 장바구니 비어있지 않음 확인 |
| `ui_pick_page` | Pick 페이지 진입 | 로그인 상태: 찜하기 클릭 > Pick 페이지 이동 / 비로그인: 로그인 유도 알럿 확인 |

---

## 주요 구현 상세

### 1. Page Object Model (POM)

`BasePage`를 상속하는 7개 페이지 클래스로 테스트 코드의 재사용성과 유지보수성을 확보했습니다.

```
BasePage (goto, click, fill, hover, waitForSelector, takeScreenshot)
  ├── MainPage      검색, 로그인/네비게이션 버튼, 뷰티컬리, 주소
  ├── LoginPage     이메일/비밀번호 입력, 로그인 실행
  ├── SearchPage    검색 결과 클릭, 정렬 탭 전환, 장바구니 담기
  ├── GoodsPage     상품 상세, 장바구니 추가, 찜하기
  ├── CartPage      장바구니 상품 확인, 수량 검증, 비어있음 확인
  └── PickPage      찜 페이지, 로그인 필요 알럿 확인
```

테스트에서의 사용:

```typescript
test('검색 → 상세 → 장바구니 담기', async ({ page }) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);
    const goodsPage = new GoodsPage(page);

    await page.goto('https://www.kurly.com/main');
    await mainpage.searchGoods('과자');
    await searchpage.clickFirstGoods();
    await goodsPage.clickAddGoodsInCartButton(1);
});
```

### 2. 데이터 드리븐 테스트

`ExcelJS`를 활용하여 테스트 데이터를 Excel 파일(`test_case.xlsx`)로 외부 관리합니다.
테스트 코드 수정 없이 Excel 데이터만 변경하여 테스트 케이스를 추가/수정할 수 있습니다.

```typescript
// excel_loader.ts - Excel에서 테스트 케이스 로드
const searchCases = await loadExcelFile('src/tests/data/test_case.xlsx');
// → [{ tc_id: 'TC001', search_term: '과자' }, { tc_id: 'TC002', search_term: '우유' }, ...]

// 테스트에서 데이터 순회
for (const { tc_id, search_term } of searchCases) {
    await mainpage.searchGoods(search_term);
    expect(await searchpage.isGoodsSearchResultVisible(search_term)).toBe(true);
}
```

### 3. Slack 알림 (Block Kit UI)

커스텀 `SlackReporter`가 테스트 종료 시 Slack으로 결과를 전송합니다.

전송 내용:
- 테스트 상태 (PASSED / FAILED)
- 성공/실패/스킵 수량
- 시작/종료 시간 및 소요 시간
- Playwright Report 바로가기 버튼

`SLACK_WEBHOOK_TS` 환경변수가 없으면 알림을 건너뜁니다.

### 4. 테스트 로거

`TestLogger` 클래스는 콘솔 출력과 파일 저장을 동시에 지원합니다.

```typescript
const logger = new TestLogger(testInfo);

logger.stepStart('상품 검색');
logger.info('검색어: 과자');
logger.success('검색 결과 확인 완료');
logger.stepEnd('상품 검색');
logger.finalize(true);
// → logs/ 폴더에 타임스탬프별 로그 파일 자동 저장
```

지원 레벨: `DEBUG` | `INFO` | `WARN` | `ERROR` | `SUCCESS`

---

## CI/CD 파이프라인

GitHub Actions를 통해 자동화된 테스트를 실행합니다.

**트리거 조건:**
- `main` 브랜치 push / PR
- 수동 실행 (`workflow_dispatch`)
- 8시간 주기 스케줄 (`cron: '0 */8 * * *'`)

**파이프라인 흐름:**

```
Checkout → Node.js 설정 (npm 캐싱) → 의존성 설치
→ Playwright 브라우저 설치 → UI 테스트 실행 (workers=2)
→ Artifact 업로드 (Report, 스크린샷, 영상, 로그)
→ GitHub Pages 리포트 배포 → Slack 알림 전송
```

**성능 최적화 (빌드 시간 42.8% 단축):**
- npm + Playwright 브라우저 캐싱
- Workers 병렬 실행 (2개)
- Artifact 보존 기간 최적화 (Report 30일, 기타 7일)
- 상세 내역: [CI/CD 개선 보고서](docs/CI_CD_IMPROVEMENTS_APPLIED.md)

---

## Playwright 설정

| 항목 | 값 |
|------|-----|
| Timeout | 70초 |
| Viewport | 1920 x 1080 |
| Headless | true |
| Trace | retain-on-failure |
| Screenshot | only-on-failure |
| Video | retain-on-failure |
| Base URL | https://www.kurly.com/main |
| Browsers | Chromium, Edge |

인증 필요 테스트(`requires-auth/`)는 `testIgnore` 설정으로 CI 실행에서 제외됩니다.

---

## 배운 점

### Playwright

- TypeScript 타입 시스템을 활용한 Page Object 설계
- Playwright 자동 대기(auto-waiting) 기능으로 flaky test 감소
- `test.step`, `testInfo.attach` 등을 활용한 리포트 가독성 향상

### CI/CD

- GitHub Actions Secrets를 통한 민감 정보 관리
- npm/Playwright 캐싱으로 빌드 시간 42.8% 단축
- GitHub Pages 자동 배포로 리포트 공유 체계 구축

### 문제 해결

- **xlsx 라이브러리 보안 취약점** 발견 후 ExcelJS로 마이그레이션
- 인증 필요 테스트를 `requires-auth/` 폴더로 분리하여 CI 안정성 확보
- `testIgnore` 패턴으로 환경별 테스트 실행 범위 제어

### 실무 감각

- 모든 것을 테스트하려 하지 말고 **핵심 시나리오에 집중**
- CI/CD에는 빠르고 안정적인 테스트만 포함
- 코드만큼 **"왜 이렇게 했는지"** 문서화가 중요

---

## 완료 항목

- [x] Page Object Model 7개 페이지 클래스 구현
- [x] 크로스 브라우저 테스트 (Chromium + Edge)
- [x] 인증 필요 테스트 분리 (`requires-auth/`)
- [x] CI/CD 성능 개선 (빌드 시간 42.8% 단축)
- [x] Slack Block Kit UI 알림 구현
- [x] ExcelJS 기반 데이터 드리븐 테스트
- [x] GitHub Pages 리포트 자동 배포

## Roadmap

- [ ] Excel 데이터 연계 테스트 시나리오 확장
- [ ] 성능 테스트 추가 (Lighthouse CI)
- [ ] Firefox, Safari 브라우저 지원 추가
- [ ] 테스트 데이터 관리 개선 (Fixture 파일)

---

## 참고 자료

- [Playwright 공식 문서](https://playwright.dev/)
- [Slack Block Kit](https://api.slack.com/block-kit)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

---

## 작성자

**LIM JAE MIN**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: jmlim9244@gmail.com

---

## 라이선스

This project is licensed under the MIT License.
