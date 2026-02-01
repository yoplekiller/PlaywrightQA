# Playwright E2E 테스트 자동화

**한국어** | [English](./README.en.md)

[![Playwright Tests](https://github.com/yoplekiller/PlaywrightQA/actions/workflows/playwright-test.yaml/badge.svg)](https://github.com/yoplekiller/PlaywrightQA/actions)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/ko/actions)

> 마켓컬리 웹사이트 UI E2E 테스트 자동화 프로젝트

[Live Test Report](https://yoplekiller.github.io/PlaywrightQA/playwright-report/index.html)

---

## 프로젝트 소개

QA 엔지니어 포트폴리오 프로젝트입니다. Playwright + TypeScript 기반으로 실제 운영 중인 마켓컬리 웹사이트를 대상으로 E2E 테스트를 구현했습니다.

### 주요 특징

| 특징 | 설명 |
|------|------|
| **Page Object Model** | 7개 페이지 클래스로 구조화 |
| **데이터 드리븐** | ExcelJS 기반 외부 데이터 관리 |
| **CI/CD** | GitHub Actions 8시간 주기 자동 실행 |
| **Slack 알림** | Block Kit UI 기반 실시간 리포팅 |
| **크로스 브라우저** | Chromium + Edge 동시 테스트 |
| **자동 배포** | GitHub Pages HTML Report |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Playwright 1.52 |
| Language | TypeScript 5.8 |
| Browsers | Chromium, Edge |
| Reporting | Playwright HTML Report, Slack Block Kit |
| CI/CD | GitHub Actions |
| Data | ExcelJS |

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
│   │   ├── ui/                    # UI 테스트
│   │   │   ├── requires-auth/     # 인증 필요 (4개)
│   │   │   └── *.spec.ts          # 일반 테스트 (8개)
│   │   ├── data/
│   │   │   └── test_case.xlsx     # 테스트 데이터
│   │   └── reporters/
│   │       └── SlackReporter.ts   # Slack 리포터
│   │
│   └── utils/
│       ├── excel_loader.ts        # Excel 로더
│       ├── logger.ts              # 테스트 로거
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
npm test              # 전체 실행
npm run test:ui       # UI 테스트만
npm run report        # 리포트 열기
```

### 환경변수 (.env)

```env
SLACK_WEBHOOK_TS=your_slack_webhook_url          # 선택
KURLY_TEST_USER_EMAIL=your_email                 # 인증 테스트용
KURLY_TEST_USER_PASSWORD=your_password           # 인증 테스트용
```

---

## 테스트 케이스

### UI 테스트 - 일반 (8개)

| 테스트 | 검증 내용 |
|--------|-----------|
| `ui_search` | Excel 데이터 기반 상품 검색 |
| `ui_blank_search` | 공백 입력 시 팝업 노출 |
| `ui_goods_page` | 상품 상세페이지 진입 |
| `ui_goods_cart` | 검색 → 상세 → 장바구니 담기 |
| `ui_goods_duplicate` | 동일 상품 중복 담기 수량 검증 |
| `ui_beauty_btn` | 뷰티컬리 버튼 URL 이동 |
| `ui_address_search` | 주소 검색 팝업 E2E 플로우 |
| `ui_sort_button` | 6개 정렬 탭 순회 및 검증 |

### UI 테스트 - 인증 필요 (4개)

CI에서는 `testIgnore`로 제외되며 로컬에서 별도 실행합니다.

| 테스트 | 검증 내용 |
|--------|-----------|
| `ui_login` | 로그인 후 프로필 링크 노출 |
| `ui_favorite_toggle` | 상품 찜하기 토글 |
| `ui_goods_add_and_verify` | 로그인 → 장바구니 담기 → 확인 |
| `ui_pick_page` | Pick 페이지 진입 및 알럿 확인 |

---

## 주요 구현

### Page Object Model

```
BasePage (공통: goto, click, fill, hover, waitForSelector, takeScreenshot)
  ├── MainPage      검색, 네비게이션
  ├── LoginPage     로그인 처리
  ├── SearchPage    검색 결과, 정렬
  ├── GoodsPage     상품 상세, 장바구니
  ├── CartPage      장바구니 검증
  └── PickPage      찜 페이지
```

### 데이터 드리븐 테스트

```typescript
const searchCases = await loadExcelFile('src/tests/data/test_case.xlsx');
for (const { tc_id, search_term } of searchCases) {
    await mainpage.searchGoods(search_term);
}
```

### Slack 알림

테스트 종료 시 자동 전송:
- 테스트 상태 (PASSED / FAILED)
- 성공/실패/스킵 수량
- 소요 시간
- Report 바로가기 버튼

---

## CI/CD

### 트리거

- `main` 브랜치 push / PR
- 수동 실행 (`workflow_dispatch`)
- 8시간 주기 스케줄

### 파이프라인

```
Checkout → 의존성 설치 → 브라우저 설치 → 테스트 실행
→ Artifact 업로드 → GitHub Pages 배포 → Slack 알림
```

### 최적화

- npm + Playwright 브라우저 캐싱
- Workers 병렬 실행 (2개)
- **빌드 시간 42.8% 단축**

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

---

## 배운 점

- **Playwright**: 자동 대기 기능으로 flaky test 감소, TypeScript 타입 시스템 활용
- **CI/CD**: GitHub Actions Secrets 관리, 캐싱 전략, GitHub Pages 자동 배포
- **문제 해결**: xlsx → ExcelJS 마이그레이션 (보안 취약점), 인증 테스트 분리로 CI 안정성 확보
- **실무 감각**: 핵심 시나리오 집중, CI에는 빠르고 안정적인 테스트만 포함

---

## 관련 프로젝트

- [QATEST](https://github.com/yoplekiller/QATEST) - Python/Selenium Web + API 테스트
- [woongjinAppTest](https://github.com/yoplekiller/woongjinAppTest) - Python/Appium 모바일 테스트

---

## 작성자

**LIM JAE MIN**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: jmlim9244@gmail.com

---

## License

MIT License
