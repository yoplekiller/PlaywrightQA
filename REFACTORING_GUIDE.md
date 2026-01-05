# PlaywrightQA 리팩토링 가이드

**작성일**: 2026-01-04
**목적**: 포트폴리오 품질 향상을 위한 리팩토링 방향 제시
**참고 프로젝트**: [Desktop/QATEST](../QATEST) (리팩토링 완료 프로젝트)

---

## 📋 목차

1. [현재 프로젝트 분석](#현재-프로젝트-분석)
2. [리팩토링 우선순위](#리팩토링-우선순위)
3. [상세 개선 방향](#상세-개선-방향)
4. [작업 체크리스트](#작업-체크리스트)
5. [참고 자료](#참고-자료)

---

## 📊 현재 프로젝트 분석

### ✅ 강점
- ✅ **Playwright 최신 프레임워크** 사용
- ✅ **크로스 브라우저 테스트** 설정 (chromium, firefox, Edge, webkit)
- ✅ **Allure Report** 통합
- ✅ **Slack Reporter** 구현
- ✅ **총 24개 테스트** (UI: 12개, API: 12개)
- ✅ **CI/CD** 설정 (.github/workflows/ci.yml)
- ✅ **TypeScript** 사용

### ⚠️ 개선 필요 사항
- ❌ **POM 패턴 미적용** - 테스트 코드 중복 많음
- ❌ **README 부실** - 48줄 (Desktop/QATEST는 498줄)
- ❌ **주석 처리된 테스트** - ui_login.spec.ts 전체 비활성화
- ❌ **코드 품질 문제** - console.log 과다, 중복 코드
- ❌ **문서화 부족** - 프로젝트 통계, 설치 가이드 없음
- ❌ **Allure Report 배포 없음** - 로컬에서만 확인 가능

---

## 🎯 리팩토링 우선순위

### 🔴 High Priority (긴급)

#### 1. 주석 처리된 테스트 복구
**파일**: `tests/ui/ui_login.spec.ts`
**문제**: 전체 코드가 주석 처리되어 실행되지 않음
**작업**: 주석 해제 및 정상 작동 확인

**Before**:
```typescript
// test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
//   await page.goto('https://www.kurly.com/main');
//   ...
// });
```

**After**:
```typescript
test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
  await page.goto('https://www.kurly.com/main');
  ...
});
```

---

#### 2. 코드 품질 개선

**파일**: `tests/api/api_popular_movie.spec.ts`

**문제 1**: console.log 과다 사용 (13개)
```typescript
// ❌ 삭제 필요
console.log(`✅ 응답 데이터 타입: ${typeof body}`);
console.log(`✅ 응답 데이터: ${JSON.stringify(body, null, 2)}`);
console.log(`✅ 응답 데이터 길이: ${body.results.length}`);
// ... 10개 더
```

**개선**:
```typescript
// ✅ 필요한 로그만 유지
console.log(`🎉 인기 영화 ${body.results.length}건 조회됨`);
```

**문제 2**: allure.attachment 중복 호출 (30줄, 56줄)
```typescript
// ❌ Before
allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');
// ... 26줄 후 ...
allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json'); // 중복!
```

**After**:
```typescript
// ✅ 한 번만 호출
allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');
```

---

#### 3. README 대폭 개선

**현재**: 48줄, 내용 부실
**목표**: 400-500줄, Desktop/QATEST 수준

**추가할 섹션**:
```markdown
# Playwright QA 자동화 포트폴리오 프로젝트

[![Test Automation](배지)]
[![TypeScript](배지)]
[![Playwright](배지)]

## 💡 프로젝트 요약
- 프로젝트 소개 (2-3문단)
- 테스트 대상 (마켓컬리, TMDB API)

## 🎯 프로젝트 특징
- ✅ Playwright 최신 프레임워크
- ✅ 크로스 브라우저 테스트
- ✅ TypeScript로 타입 안전성 확보
- ✅ Allure Report 시각화
- ✅ CI/CD 자동화

## 📊 프로젝트 통계
- **총 테스트 케이스**: 24개 (UI: 12개 | API: 12개)
- **Page Objects**: X개 (리팩토링 후)
- **지원 브라우저**: 4개 (Chrome, Firefox, Edge, Safari)
- **CI/CD**: GitHub Actions

## 🧰 Tech Stack
### 테스트 프레임워크
- **Playwright X.XX**: E2E 테스트
- **TypeScript 5.X**: 타입 안전성

### 리포팅 & 모니터링
- **Allure Report**: 시각적 리포트
- **Slack Reporter**: 실시간 알림

### CI/CD
- **GitHub Actions**: 자동화

## 📖 빠른 시작
### 사전 준비사항
### 설치 및 실행
### 환경변수 설정
### 테스트 실행

## 📊 테스트 결과
- Live Allure Report 링크

## 🧪 테스트 커버리지
### 마켓컬리 UI 테스트 (12개)
| 테스트 카테고리 | 검증 내용 | 파일 | 테스트 수 |
|--------------|---------|------|----------|
| **로그인** | ... | ui_login.spec.ts | 1개 |
| **검색** | ... | ui_search.spec.ts | 1개 |
...

### TMDB API 테스트 (12개)
...

## 🏗️ 프로젝트 구조
```
PlaywrightQA/
├── src/
│   ├── pages/          # Page Objects (리팩토링 후)
│   └── utils/
├── tests/
│   ├── ui/
│   └── api/
...
```

## 🎯 주요 기능
### 1. 크로스 브라우저 테스트
### 2. Allure Report 통합
### 3. Slack 알림

## 🔄 CI/CD 워크플로우
## 📹 데모 영상
## 📚 추가 문서
## 🔮 향후 계획
## 💬 프로젝트 노트
```

---

### 🟡 Medium Priority (구조 개선)

#### 4. Page Object Model (POM) 패턴 적용

**현재 문제**:
```typescript
// tests/ui/ui_login.spec.ts - 테스트 파일에 Locator 직접 작성
await page.locator('a').filter({ hasText: '로그인' }).click();
await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill(kurly_id);
await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill(kurly_pw);
await page.getByRole('button', { name: '로그인' }).click();
```

**개선 방향**:

**1단계**: `src/pages/` 폴더 생성
```
src/
├── pages/
│   ├── BasePage.ts           # 공통 메서드 (모든 페이지의 부모)
│   ├── LoginPage.ts          # 로그인 페이지
│   ├── MainPage.ts           # 메인 페이지
│   ├── SearchPage.ts         # 검색 페이지
│   ├── ProductPage.ts        # 상품 상세 페이지
│   └── CartPage.ts           # 장바구니 페이지
└── utils/
    ├── dataFormat.ts
    └── excel_loader.ts
```

**2단계**: BasePage 클래스 작성
```typescript
// src/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

**3단계**: LoginPage 클래스 작성
```typescript
// src/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly loginButton: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly marketButton: Locator;
  private readonly beautyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator('a').filter({ hasText: '로그인' });
    this.usernameInput = page.getByRole('textbox', { name: '아이디를 입력해주세요' });
    this.passwordInput = page.getByRole('textbox', { name: '비밀번호를 입력해주세요' });
    this.submitButton = page.getByRole('button', { name: '로그인' });
    this.marketButton = page.getByRole('button', { name: '마켓컬리' });
    this.beautyButton = page.getByRole('button', { name: '뷰티컬리' });
  }

  // Actions
  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async fillUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }

  async login(username: string, password: string) {
    await this.clickLoginButton();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  // Verifications
  async isMarketButtonVisible(): Promise<boolean> {
    return await this.marketButton.isVisible({ timeout: 5000 });
  }

  async isBeautyButtonVisible(): Promise<boolean> {
    return await this.beautyButton.isVisible({ timeout: 5000 });
  }
}
```

**4단계**: 테스트 파일 리팩토링
```typescript
// tests/ui/ui_login.spec.ts - AFTER
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import * as allure from 'allure-js-commons';
import dotenv from 'dotenv';

dotenv.config();

const kurly_id = process.env.kurly_id!;
const kurly_pw = process.env.kurly_pw!;

test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }) => {
  allure.description('올바른 아이디/비밀번호 입력 후, 메인 화면에서 "마켓컬리" 및 "뷰티컬리" 버튼이 정상적으로 표시되는지 확인합니다.');

  const loginPage = new LoginPage(page);

  // 마켓컬리 접속
  await page.goto('https://www.kurly.com/main');

  // 로그인
  await loginPage.login(kurly_id, kurly_pw);

  // 버튼 확인
  expect(await loginPage.isMarketButtonVisible()).toBe(true);
  expect(await loginPage.isBeautyButtonVisible()).toBe(true);

  // 스크린샷
  await loginPage.takeScreenshot('login_success');
});
```

**리팩토링 효과**:
- ✅ 테스트 코드 가독성 향상
- ✅ Locator 재사용
- ✅ 유지보수 용이 (Locator 변경 시 Page 클래스만 수정)
- ✅ 테스트 코드 길이 50% 감소

---

#### 5. 테스트 데이터 관리 개선

**현재**: 하드코딩된 테스트 데이터
```typescript
// ❌ Before
const searchKeyword = '사과';
const invalidApiKey = 'invalid_key_12345';
```

**개선**: `tests/data/` 폴더 활용
```
tests/
├── data/
│   ├── search_keywords.json
│   ├── api_test_data.json
│   └── user_credentials.json  # .gitignore에 추가
```

**search_keywords.json**:
```json
{
  "valid": ["사과", "바나나", "우유"],
  "invalid": ["@#$%", ""],
  "special": ["카페 라떼", "프로틴 바"]
}
```

**사용 예시**:
```typescript
import searchData from '../data/search_keywords.json';

test('검색 테스트', async ({ page }) => {
  for (const keyword of searchData.valid) {
    await searchPage.search(keyword);
    expect(await searchPage.hasResults()).toBe(true);
  }
});
```

---

### 🟢 Low Priority (추가 개선)

#### 6. Allure Report GitHub Pages 배포

**참고**: Desktop/QATEST의 `.github/workflows/Test_Automation.yaml`

**추가할 워크플로우**:
```yaml
# .github/workflows/ci.yml에 추가
- name: Generate Allure Report
  if: always()
  run: |
    npm run allure:generate

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: always()
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./allure-report
```

---

#### 7. 영문 README 추가

**파일**: `README.en.md`
**참고**: Desktop/QATEST의 `README.en.md`

---

#### 8. SETUP.md 작성

**내용**:
- Node.js 설치
- Playwright 설치
- 브라우저 설정
- 환경변수 설정
- Allure 설치

---

## ✅ 작업 체크리스트

### Phase 1: 긴급 수정 (1-2일)
- [ ] ui_login.spec.ts 주석 해제
- [ ] api_popular_movie.spec.ts console.log 정리
- [ ] api_popular_movie.spec.ts allure.attachment 중복 제거
- [ ] 다른 테스트 파일들 코드 품질 확인

### Phase 2: 구조 개선 (3-5일)
- [ ] src/pages/ 폴더 생성
- [ ] BasePage.ts 작성
- [ ] LoginPage.ts 작성
- [ ] SearchPage.ts 작성
- [ ] ProductPage.ts 작성
- [ ] CartPage.ts 작성
- [ ] 모든 UI 테스트 POM 패턴으로 리팩토링

### Phase 3: 문서화 (2-3일)
- [ ] README.md 개선 (400-500줄)
  - [ ] 프로젝트 요약
  - [ ] 프로젝트 특징
  - [ ] 프로젝트 통계
  - [ ] Tech Stack 상세
  - [ ] 빠른 시작 가이드
  - [ ] 테스트 커버리지 표
  - [ ] 프로젝트 구조
  - [ ] 주요 기능 설명
  - [ ] CI/CD 워크플로우
  - [ ] 데모 영상
- [ ] README.en.md 작성
- [ ] SETUP.md 작성

### Phase 4: 추가 개선 (2-3일)
- [ ] tests/data/ 폴더에 테스트 데이터 분리
- [ ] Allure Report GitHub Pages 배포
- [ ] CI/CD 워크플로우 개선
- [ ] 배지(Badge) 추가

### Phase 5: 최종 점검 (1일)
- [ ] 모든 테스트 실행 및 통과 확인
- [ ] README 링크 확인
- [ ] GitHub Pages 배포 확인
- [ ] 코드 품질 최종 검토

**총 예상 기간**: 9-14일

---

## 📚 참고 자료

### Desktop/QATEST에서 참고할 파일
```
Desktop/QATEST/
├── README.md                    # README 구조, 내용 참고
├── README.en.md                 # 영문 문서 참고
├── SETUP.md                     # 설치 가이드 참고
├── REFACTORING_LOG.md           # 리팩토링 이력 참고
├── src/pages/
│   ├── base_page.py            # BasePage 로직 참고
│   ├── kurly_login_page.py     # LoginPage 구조 참고
│   └── ...
└── .github/workflows/
    └── Test_Automation.yaml    # CI/CD 워크플로우 참고
```

### 외부 참고 자료
- [Playwright 공식 문서 - Page Object Model](https://playwright.dev/docs/pom)
- [Allure Report 가이드](https://docs.qameta.io/allure/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## 📊 리팩토링 전후 비교

| 항목 | Before | After |
|------|--------|-------|
| **README** | 48줄 | 400-500줄 |
| **POM 패턴** | ❌ 없음 | ✅ 적용 (6개 Page 클래스) |
| **테스트 코드 품질** | console.log 과다, 중복 | ✅ 정리됨 |
| **주석 처리 테스트** | ui_login.spec.ts 비활성화 | ✅ 모두 활성화 |
| **테스트 데이터** | 하드코딩 | ✅ JSON/CSV 분리 |
| **Allure Report** | 로컬만 | ✅ GitHub Pages 배포 |
| **문서화** | README만 | ✅ README + SETUP + 영문 |
| **코드 재사용성** | 낮음 | ✅ 높음 (POM) |
| **유지보수성** | 어려움 | ✅ 쉬움 |

---

## 💡 리팩토링 팁

### 1. POM 패턴 적용 시 주의사항
- Page 클래스는 **한 페이지의 요소와 동작만** 포함
- 비즈니스 로직은 테스트 파일에, UI 상호작용은 Page 클래스에
- Locator는 private으로, 메서드는 public으로

### 2. README 작성 팁
- Desktop/QATEST README를 템플릿으로 활용
- 스크린샷/GIF 추가하면 가독성 향상
- 배지(Badge)로 프로젝트 상태 표시
- 목차(TOC)로 탐색 편의성 제공

### 3. 커밋 메시지 컨벤션
```
feat: POM 패턴 적용 - LoginPage 클래스 추가
fix: api_popular_movie.spec.ts console.log 정리
docs: README 프로젝트 요약 섹션 추가
refactor: ui_search.spec.ts POM 패턴으로 리팩토링
test: 검색 테스트 케이스 추가
```

### 4. 단계별 커밋
- 한 번에 모든 변경사항 커밋 ❌
- 의미 있는 단위로 커밋 ✅
- 각 Phase별로 커밋 분리

---

## 🎯 최종 목표

**Desktop/QATEST 수준의 완성도 높은 포트폴리오 프로젝트**

리팩토링 완료 후:
- ✅ 체계적인 POM 패턴
- ✅ 상세한 문서화
- ✅ 깔끔한 코드
- ✅ CI/CD 자동화
- ✅ 실시간 Allure Report

→ **포트폴리오로 제출 가능!**

---

**작성자**: Claude Code
**문서 버전**: 1.0
**최종 수정일**: 2026-01-04
