# Playwright UI 테스트 자동화

**한국어** | [English](./README.en.md)

[![Playwright Tests](https://github.com/yoplekiller/PlaywrightQA/actions/workflows/playwright-test.yaml/badge.svg)](https://github.com/yoplekiller/PlaywrightQA/actions)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/ko/actions)

> 마켓컬리 웹사이트 UI 테스트 자동화 프로젝트

[Live Test Report](https://yoplekiller.github.io/PlaywrightQA/playwright-report/index.html)

---

## 프로젝트 소개

QA 엔지니어 포트폴리오 프로젝트입니다. Playwright + TypeScript 기반으로 실제 운영 중인 마켓컬리 웹사이트를 대상으로 자동화 테스트 스크립트를 구성하였습니다.

### 주요 특징

| 특징 | 설명 |
|------|------|
| **Page Object Model** | 7개 페이지 클래스로 구조화 |
| **Custom Fixtures** | Page Object를 fixture로 주입하여 테스트 코드 중복 감소 |
| **데이터 드리븐** | TS fixture 기반 smoke 데이터 + ExcelJS 외부 데이터 예제 |
| **접근성 검사** | axe-core 기반 WCAG 2.0 검증 — 알려진 위반은 기준선으로 관리, 신규 critical/serious 위반 시 실패 |
| **API+UI 하이브리드** | `waitForResponse`로 검색·정렬·장바구니 API 응답을 잡아 화면 결과와 대조 |
| **실행 결과 분류** | 통과 / flaky(재시도 통과) / known issue(`test.fail`) / 실패 / 스킵 분류표를 Actions 요약·Slack에 표시 |
| **시각적 회귀 테스트** | 헤더 영역 픽셀 diff 비교, Docker 기반 기준 이미지로 CI 환경 일치 |
| **CI/CD** | GitHub Actions 하루 1회 자동 실행 |
| **Slack 알림** | Block Kit UI 기반 실시간 리포팅 (브라우저별 결과 포함) |
| **크로스 브라우저** | Chromium + Edge 동시 테스트 |
| **자동 배포** | GitHub Pages HTML Report |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Playwright 1.59 |
| Language | TypeScript 5.8 |
| Browsers | Chromium, Edge |
| Reporting | Playwright HTML Report, Slack Block Kit |
| CI/CD | GitHub Actions |
| Data | ExcelJS |
| Accessibility | axe-core |

---

## 프로젝트 구조

```
PlaywrightQA/
├── .github/workflows/
│   └── playwright-test.yaml       # CI/CD 파이프라인
│
├── src/
│   ├── pages/                     # Page Object Model
│   │   ├── BasePage.ts            # 공통 메서드
│   │   ├── MainPage.ts            # 메인 (검색, 네비게이션)
│   │   ├── LoginPage.ts           # 로그인
│   │   ├── SearchPage.ts          # 검색 결과
│   │   ├── GoodsPage.ts           # 상품 상세
│   │   ├── CartPage.ts            # 장바구니
│   │   └── PickPage.ts            # 찜
│   │
│   ├── tests/
│   │   ├── setup/
│   │   │   └── auth.setup.ts     # 인증 상태 생성
│   │   ├── ui/                    # UI 테스트
│   │   │   ├── requires-auth/     # 인증 필요 테스트
│   │   │   └── *.spec.ts          # 일반 UI 테스트
│   │   ├── data/
│   │   │   ├── searchCases.ts     # smoke 검색 데이터
│   │   │   └── test_case.xlsx     # Excel 데이터 예제
│   │   └── reporters/
│   │       └── SlackReporter.ts   # Slack 리포터
│   │
│   ├── fixtures/
│   │   └── pages.ts               # Page Object fixtures
│   │
│   └── utils/
│       ├── excel_loader.ts        # Excel 로더
│       └── dataFormat.ts          # 포맷 유틸
│
├── playwright.config.ts
└── package.json
```

---

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/YopleKiller/PlaywrightQA.git
cd PlaywrightQA

# 의존성 설치
npm install
npx playwright install --with-deps

# 테스트 실행
npm test              # Chromium 일반 UI 테스트
npm run test:ui       # Chromium 일반 UI 테스트
npm run test:ui:all   # Chromium + Edge 일반 UI 테스트
npm run test:smoke    # 핵심 검색 smoke 테스트
npm run test:auth     # 인증 필요 테스트
npm run typecheck     # TypeScript 타입체크
npm run report        # 리포트 열기
```

### 환경변수 (.env)

```env
SLACK_WEBHOOK_TS=your_slack_webhook_url          # 선택
KURLY_TEST_USERNAME=your_kurly_id                  # 인증 테스트용
KURLY_TEST_PASSWORD=your_password                # 인증 테스트용
```

---

## 테스트 케이스

### UI 테스트 - 일반

| 테스트 | 검증 내용 |
|--------|-----------|
| `ui_search` | TS fixture 기반 상품 검색 smoke |
| `ui_blank_search` | 공백 입력 시 팝업 노출 |
| `ui_no_search_result` | 존재하지 않는 상품 검색 시 결과 없음 표시 |
| `ui_goods_page` | 상품 상세페이지 진입 |
| `ui_goods_cart` | 검색 → 상세 → 장바구니 담기 |
| `ui_cart_quantity` | 상품 1개 담기 후 장바구니 수량이 1인지 검증 |
| `ui_goods_duplicate` | 동일 상품 2회 담기 → 장바구니 수량 2 검증 |
| `ui_guest_checkout_requires_login` | 비회원 장바구니는 결제 버튼 대신 로그인 버튼만 노출됨을 확인 |
| `ui_beauty_btn` | 뷰티컬리 버튼 URL 이동 |
| `ui_address_search` | 주소 검색 팝업 E2E 플로우 |
| `ui_sort_button` | 6개 정렬 탭 순회 및 검증 |
| `ui_sort_price` | 가격순 정렬 결과 검증 |
| `ui_accessibility` | axe-core 기반 WCAG 접근성 검사 — 기준선(사이트 기존 위반) 외 신규 critical/serious 위반 0건, 페이지 로드 사전조건 확인 |
| `ui_responsive` | 반응형 뷰포트별 레이아웃 확인 |
| `ui_visual_regression` | 헤더(GNB) 영역 시각적 회귀 검사 (별도 workflow, 주 1회) |
| `ui_pagination` | 검색 결과 페이지네이션(다음/특정페이지/처음/마지막) 동작 |
| `ui_boundary_values` | 빈 검색어, 장바구니 최소수량(1) 경계값 |
| `ui_api_hybrid` | API+UI 하이브리드: 검색 API 순서 = 화면 순서, 가격순 정렬은 API 판매가 기준 정렬 + 화면 순서 일치, 장바구니 담기 API 성공 + 화면 수량 일치 |
| `ui_login_failed` | 없는 계정 로그인 시 안내 dialog·로그인 안 됨, 빈 값 제출 시 입력값 오류 dialog |
| `ui_cart_payment_mock` | `payment/calculate` API 목킹 - 결제금액 패널 데이터 바인딩, 서버 에러 처리, 무료배송 표기 일관성(⚠️ 실제 불일치 발견, fail 유지) |

### UI 테스트 - 인증 필요

`setup` 프로젝트에서 로그인 상태를 `playwright/.auth/user.json`으로 저장하고, `chromium-auth` 프로젝트에서 `storageState`로 재사용합니다.

| 테스트 | 검증 내용 |
|--------|-----------|
| `ui_login` | 로그인 후 프로필 링크 노출 |
| `ui_favorite_toggle` | 상품 찜하기 토글 |
| `ui_goods_add_and_verify` | 로그인 → 장바구니 담기 → 확인 |
| `ui_pick_page` | 로그인 상태에서 Pick 페이지 진입 |

---

## 주요 구현

### Page Object Model

```
BasePage (공통 Page 참조만 보관)
  ├── MainPage      검색, 네비게이션, 주소 검색 팝업
  ├── LoginPage     로그인 처리
  ├── SearchPage    검색 결과, 정렬, 가격 추출
  ├── GoodsPage     상품 상세, 장바구니, 찜하기
  ├── CartPage      장바구니 검증
  └── PickPage      찜 페이지
```

### 데이터 드리븐 테스트

```typescript
import { searchCases } from '../data/searchCases';

for (const { tc_id, search_term } of searchCases) {
    await mainPage.searchGoods(search_term);
}
```

ExcelJS 기반 `test_case.xlsx`와 `excel_loader.ts`는 외부 QA 데이터 연동 예제로 유지합니다.

### Slack 알림

테스트 종료 시 자동 전송:
- 테스트 상태 (PASSED / FAILED)
- 성공 / 실패 / 스킵 수량 (TC 기준, 중복 제거)
- 브라우저별 결과 (chromium / chromium-auth / Edge 독립 집계)
- 시작 시각 / 종료 시각 / 소요 시간
- Report 바로가기 버튼

**실행 결과 분류**: `src/tests/reporters/classify.ts`가 `test.outcome()` 기준으로 결과를 ✅ 통과 / 🔁 flaky(재시도 후 통과) / 📌 known issue(`test.fail()`로 표시한 실사이트 결함) / ❌ 실패 / ⏭️ 스킵으로 나눕니다. Slack 메시지와 GitHub Actions 실행 요약(`SummaryReporter.ts` → `GITHUB_STEP_SUMMARY`, `test-results/summary.md`)에 같은 분류표가 나가서, 빨간불이 새 회귀인지 이미 아는 사이트 결함인지 바로 구분됩니다. known issue 테스트가 예상외로 통과하면(사이트가 고친 경우) 실패로 올려 `test.fail()` 제거를 알립니다.

**실패 자동 분류**: 실패한 테스트가 있으면 에러 패턴을 분석해 🐞 제품 결함 가능성 / 🛠️ 자동화 코드 점검 / 🌐 환경 이슈 가능성 3가지로 자동 분류하고, 카테고리별 조치 가이드까지 함께 표시합니다(`src/tests/reporters/SlackReporter.ts`). 실패 원인 파악을 위한 1차 트리아지 시간을 단축하는 목적입니다.

> **집계 규칙 (TC 기준, 중복 제거)**
> - 전체 집계는 HTML 리포터와 동일한 **최악 결과 우선** 방식으로 동작합니다.
> - 집계는 `classify.ts`의 분류(통과/flaky/known issue/실패/스킵)를 따르고, 브라우저(프로젝트)별로 따로 셉니다.
> - 재시도 후 통과는 실패가 아니라 flaky로, `test.fail()` 테스트가 예상대로 실패하면 known issue로 집계됩니다.
> - 실패 상세(원인 분류·조치 가이드)는 진짜 실패에만 붙습니다.

### 시각적 회귀 테스트 (Visual Regression)

assert 기반 테스트는 "특정 조건이 참인가"를 검증하지만, 시각적 회귀 테스트는 판정 기준이 다릅니다 —
**기준 스크린샷(baseline) 대비 픽셀 diff 비율**로 "이전과 달라졌는가"를 검증합니다.

- **스코프**: 메인 페이지 전체가 아니라 헤더(GNB) 영역만(`clip`으로 좌표 고정). 전체 페이지는
  프로모션 배너 회전·가격 변동 때문에 매 실행마다 diff가 발생해 신뢰할 수 없는 테스트가 됨.
  헤더는 리뉴얼 전까지 거의 안 바뀌는 안정적인 영역이라 "레이아웃이 의도치 않게 깨졌는가"를
  판단하기에 적합함.
- **통과 기준**: `maxDiffPixelRatio: 0.02` (픽셀 2% 이내 차이는 통과). 안티앨리어싱 등 미세한
  렌더링 차이는 허용하되, 그 이상은 실패시켜 사람이 diff 이미지를 보고 의도된 변경인지 판단.
- **기준 이미지 생성**: 로컬(Windows)이 아니라 `Dockerfile`(공식 Playwright 이미지, CI와 동일
  Ubuntu 기반)로 생성. 렌더링 환경이 다르면 폰트/안티앨리어싱 차이로 기준 이미지 자체가 CI에서
  항상 실패하기 때문.
- **CI 분리**: 메인 `Playwright Tests` 워크플로우와 별도로 `visual-regression.yaml`에서 주 1회
  실행. 시각 테스트가 UI 디자인 변경으로 깨져도 회귀 테스트 배지에는 영향이 없도록 분리.

---

## CI/CD

### 트리거

- `main` 브랜치 push / PR
- 수동 실행 (`workflow_dispatch`)
- 하루 1회 스케줄

### 파이프라인

```
Checkout → 의존성 설치 → 브라우저 설치 → 타입체크(tsc) → 테스트 실행(분류표 → Actions 요약)
→ Artifact 업로드(trace·스크린샷·summary.md) → GitHub Pages 배포 → Slack 알림
```

### AutoTC 연동 (배포 판단 자동화)

같은 워크플로우에서 [AutoTC](https://github.com/yoplekiller/AutoTC) 레포를 체크아웃해 `release_report.py`를 함께 실행합니다. Playwright 결과(`results.json`)를 분석해 Go / Caution / No-Go 배포 판단을 산출하고, PlaywrightQA 자체 SlackReporter(실패 원인 분류)와는 별도로 Slack에 배포 판단 메시지를 전송합니다 — 같은 CI 실행 안에서 "무엇이 실패했는가"(SlackReporter)와 "그래서 배포해도 되는가"(AutoTC)를 각각 답하는 구조입니다.

### 최적화

- npm + Playwright 브라우저 캐싱
- Workers 병렬 실행 (2개)
- **빌드 시간 42.8% 단축**

---

## Playwright 설정

| 항목 | 값 |
|------|-----|
| Timeout | 70초 |
| Retries | CI: 1회 / 로컬: 0회 |
| Viewport | 1920 x 1080 |
| Headless | true |
| Trace | retain-on-failure |
| Screenshot | only-on-failure |
| Video | retain-on-failure |
| Auth Setup | setup project + `playwright/.auth/user.json` |

---

## 배운 점

- **Playwright**: 자동 대기 기능으로 flaky test 감소, TypeScript 타입 시스템 활용
- **CI/CD**: GitHub Actions Secrets 관리, 캐싱 전략, GitHub Pages 자동 배포
- **문제 해결**: xlsx → ExcelJS 마이그레이션 (보안 취약점), 인증 테스트 분리로 CI 안정성 확보
- **실무 감각**: 핵심 시나리오 집중, CI에는 빠르고 안정적인 테스트만 포함

---

## 관련 프로젝트

- [QATEST](https://github.com/yoplekiller/QATEST) - Python/Selenium Web UI 테스트
- [KurlyApp](https://github.com/yoplekiller/KurlyApp) - Python/Appium 모바일 테스트
- [AutoTC](https://github.com/yoplekiller/AutoTC) - 테스트 케이스 자동 생성

---

## 작성자

**LIM JAE MIN**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: jmlim9244@gmail.com

---

## License

MIT License
