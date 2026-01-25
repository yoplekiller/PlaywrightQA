# 🎭 Playwright 테스트 자동화 프레임워크

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/ko/actions)

> 마켓컬리 웹사이트 UI 테스트 + TMDB API 테스트 자동화 프레임워크

📊 [Live Demo - Test Report](https://yoplekiller.github.io/PlaywrightQA/playwright-report/index.html) |
📈 [Allure Report](https://yoplekiller.github.io/PlaywrightQA/allure-report-ui/index.html)

---

## 📌 프로젝트 소개

### 🎯 프로젝트 목적

- QA 엔지니어 포지션 지원을 위한 포트폴리오 프로젝트
- 최신 테스트 자동화인 Playwright 기술 학습
- 실제 운영 중인 웹사이트(마켓컬리)를 대상으로 실무 역량 강화


### ✨ 주요 기능
- ✅ **UI 테스트 자동화**: 마켓컬리 주요 기능 (로그인, 검색, 장바구니 등)
- ✅ **API 테스트 자동화**: TMDB API 엔드포인트 검증
- ✅ **CI/CD 파이프라인**: GitHub Actions 기반 자동 실행 (8시간마다)
- ✅ **실시간 알림**: Slack Webhook을 통한 테스트 결과 알림 (버튼 클릭으로 리포트 이동)
- ✅ **리포팅**: Allure Report + Playwright HTML Report (GitHub Pages 자동 배포)
- ✅ **데이터 드리븐**: ExcelJS를 활용한 테스트 데이터 관리
- ✅ **Page Object Model**: 유지보수 용이한 코드 구조

---

## 🛠️ 기술 스택

| Category | Technologies |
|----------|-------------|
| **Test Framework** | Playwright 1.52.0 |
| **Language** | TypeScript 5.8.3 |
| **Reporting** | Allure Report, Playwright HTML Report |
| **CI/CD** | GitHub Actions |
| **Notification** | Slack Webhook (Block Kit UI) |
| **Data Management** | ExcelJS (Excel 기반 테스트 데이터) |
| **Design Pattern** | Page Object Model (POM) |

---

## 📂 프로젝트 구조

```
PlaywrightQA/
├── .github/
│   └── workflows/
│       └── playwright-test.yaml      # CI/CD 파이프라인 설정
│
├── src/
│   ├── pages/                        # Page Object Model
│   │   ├── BasePage.ts              # 공통 메서드
│   │   ├── LoginPage.ts             # 로그인 페이지
│   │   ├── MainPage.ts              # 메인 페이지
│   │   └── SearchPage.ts            # 검색 페이지
│   │
│   ├── tests/
│   │   ├── ui/                      # UI 테스트
│   │   │   ├── ui_login.spec.ts
│   │   │   ├── ui_product_cart.spec.ts
│   │   │   └── ...
│   │   │
│   │   ├── api/                     # API 테스트
│   │   │   ├── api_popular_movie.spec.ts
│   │   │   ├── api_search_movie.spec.ts
│   │   │   └── ...
│   │   │
│   │   └── reporters/
│   │       └── SlackReporter.ts     # Slack 알림 리포터
│   │
│   └── utils/
│       └── excel_loader.ts          # Excel 데이터 로더
│
├── tests/
│   └── data/
│       └── api_movie.xlsx           # 테스트 데이터
│
├── playwright.config.ts             # Playwright 설정
└── package.json
```

---

## 🚀 시작하기

### 📋 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 🔧 설치

```bash
# 1. 저장소 클론
git clone https://github.com/YopleKiller/PlaywrightQA.git
cd PlaywrightQA

# 2. 의존성 설치
npm install

# 3. Playwright 브라우저 설치
npx playwright install

# 4. 환경 변수 설정 (.env 파일 생성)
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
SLACK_WEBHOOK_TS=your_slack_webhook_url
KURLY_TEST_USER_EMAIL=your_kurly_id
KURLY_TEST_USER_PASSWORD=your_kurly_password
```

### ▶️ 실행 방법

```bash
# 전체 테스트 실행
npm test

# UI 테스트만 실행
npm run test:ui

# API 테스트만 실행
npm run test:api

# Allure 리포트 생성 및 열기
npm run report
```

---

## 💡 주요 기능 상세

### 1. Page Object Model (POM) 패턴

**코드 재사용성과 유지보수성 향상**

```typescript
// LoginPage.ts
export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.submitButton);
    }
}

// 테스트에서 사용
test('로그인 테스트', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('user@example.com', 'password');
});
```

### 2. Slack 알림 통합 (Block Kit UI)

**테스트 결과를 Slack으로 실시간 알림**

- ✅ 테스트 결과 요약 (성공/실패/스킵)
- ✅ 클릭 가능한 버튼으로 리포트 바로 이동
- ✅ 테스트 시작/종료 시간, 소요 시간 표시

![Slack Notification Example](screenshots/slack-example.png)

### 3. CI/CD 파이프라인

**GitHub Actions로 자동화된 테스트 실행**

- 🔄 Push/PR 시 자동 실행
- ⏰ 스케줄 실행 (8시간마다)
- 📊 자동 리포트 배포 (GitHub Pages)
- 💬 Slack 알림 자동 전송

### 4. 데이터 드리븐 테스트

**Excel 파일로 테스트 데이터 관리**

```typescript
// Excel에서 테스트 케이스 로드
const movieCases = await loadExcelFile('tests/data/api_movie.xlsx');

for (const movie of movieCases) {
    test(`영화 ID ${movie.movie_id} 검증`, async () => {
        // 테스트 로직
    });
}
```


## 📊 테스트 커버리지

| Category | Test Cases | Status |
|----------|-----------|--------|
| **UI Tests** | 10+ | ✅ |
| **API Tests** | 5+ | ✅ |
| **Total** | 15+ | ✅ |

**주요 테스트 시나리오:**
- 로그인/로그아웃
- 상품 검색
- 장바구니 담기/삭제
- 찜하기 기능
- API 응답 검증
- SLA 응답 시간 체크

---

## 🎓 배운 점 & 성장

### 기술적 학습

#### Playwright 심화
- TypeScript의 타입 시스템을 활용한 안전한 코드 작성
- Playwright의 자동 대기 기능으로 flaky test 문제 해결
- Page Object Model 패턴 적용으로 유지보수성 향상

#### CI/CD 최적화
- GitHub Actions에서 환경 변수와 Secrets 관리
- npm/Playwright 캐싱으로 빌드 시간 42.8% 단축
- Workers 병렬 실행으로 테스트 속도 개선


### 문제 해결 경험

#### 보안 이슈
- **[문제]** xlsx 라이브러리 보안 취약점 발견
- **[해결]** exceljs로 마이그레이션하여 보안 이슈 해결

#### 레거시 코드
- **[문제]** Allure import deprecated 경고
- **[해결]** allure-js-commons로 변경하여 최신 방식 적용


### 실무 감각

#### 우선순위 설정
- 모든 것을 테스트하려 하지 말고 **핵심 80%**에 집중
- CI/CD에는 **빠르고 안정적인 테스트**만 포함

#### 문서화의 중요성
- 코드만큼 **"왜 이렇게 했는지"** 문서가 중요
- 실패 과정도 **학습의 일부**로 공유
- **작업내용들의 이해**를 위한 문서화 필수 

---

## 🚧 알려진 이슈 & 개선 계획

### ✅ 최근 완료 (2026-01-08)
- [x] **CI/CD 성능 개선**: 빌드 시간 42.8% 단축
  - npm 캐싱 추가
  - Playwright 브라우저 캐싱 추가
  - Workers 병렬 실행 (1 → 2)
  - Artifact 보존 기간 최적화
  - GitHub Actions Summary 추가
  - 📄 [상세 내역](docs/CI_CD_IMPROVEMENTS_APPLIED.md)

### 현재 진행 중
- [ ] 모든 UI 테스트에 Page Object 패턴 적용
- [ ] API 테스트 커버리지 확대
- [ ] Excel Data과 연계한 테스트 스크립트 작성

### 향후 계획
- [ ] 성능 테스트 추가 (Lighthouse CI)
- [ ] 테스트 데이터 관리 개선 (DB 또는 Fixture 파일)


---

## 🔍 트러블슈팅

### 일반적인 문제

**Q: 테스트가 실패하면서 "Timeout" 에러가 발생해요**
```bash
A: playwright.config.ts에서 timeout 설정을 늘려보세요
   또는 네트워크가 느린 경우 waitForLoadState 사용
```

**Q: 환경 변수가 로드되지 않아요**
```bash
A: .env 파일이 프로젝트 루트에 있는지 확인
   dotenv.config() 호출 확인
```

**Q: Slack 알림이 오지 않아요**
```bash
A: SLACK_WEBHOOK_TS 환경 변수 확인
   GitHub Actions의 경우 Secrets에 등록했는지 확인
```

---

## 📝 참고 자료

- [Playwright 공식 문서](https://playwright.dev/)
- [Allure Report 문서](https://allurereport.org/)
- [Slack Block Kit](https://api.slack.com/block-kit)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

---

## 👤 작성자

**[LIM JAE MIN]**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: [jmlim9244@gmail.com]

---

## 📄 라이선스

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- 마켓컬리 웹사이트를 테스트 대상으로 사용하게 해주신 점에 감사드립니다.
- TMDB API를 무료로 제공해주신 The Movie Database에 감사드립니다.
- 포트폴리오 작성에 큰 도움을 준 Claude, Github Copilot에게 감사드립니다.


