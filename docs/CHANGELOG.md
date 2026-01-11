# Changelog

## [2026-01-05] Slack 알람 및 Allure Reporter 수정

### 🐛 해결된 문제

#### 1. Slack 알람에서 테스트 결과가 0으로 표시되는 문제
**원인:**
- `allure-playwright` 패키지가 설치되지 않아 테스트 실행 중 오류 발생
- 테스트가 제대로 시작되지 않으면 SlackReporter의 카운터가 초기값(0)으로 유지됨
- `onBegin()` 메서드가 호출되지 않아 `total`, `passed`, `failed`, `skipped` 값이 모두 0

**해결:**
- `package.json`에 `allure-playwright` 의존성 추가
- `playwright.config.ts`에 allure reporter 설정 추가

#### 2. GitHub Actions Artifact 이름 충돌
**원인:**
- `ui-test`와 `api-test` 두 작업이 동일한 artifact 이름 사용:
  - `playwright-screenshots`
  - `playwright-video`
  - `playwright-logs`
  - `playwright-test-results`
- 두 작업이 병렬로 실행되면 나중에 완료되는 작업이 먼저 업로드된 artifact를 덮어씀

**해결:**
- UI 테스트: `ui-playwright-*` 접두사 추가
- API 테스트: `api-playwright-*` 접두사 추가

#### 3. API 테스트 실패 시 Allure Report가 생성되지 않음
**원인:**
- `api-test` 작업의 "Generate Allure Report" 단계에 `if: always()` 조건이 없음
- 테스트가 실패하면 해당 단계가 건너뛰어짐

**해결:**
- `if: always()` 조건 추가하여 테스트 실패 여부와 관계없이 리포트 생성

---

### 📝 변경된 파일

#### 1. `package.json`
**추가된 의존성:**
```json
{
  "devDependencies": {
    "allure-playwright": "^3.0.3"
  }
}
```

#### 2. `playwright.config.ts`
**추가된 reporter 설정:**
```typescript
const reporters: [string, any?][] = [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],  // ✅ 추가
];
```

#### 3. `.github/workflows/playwright-test.yaml`

**변경 전:**
```yaml
# UI Test Job
- name: Upload screenshots
  with:
    name: playwright-screenshots  # ❌ 충돌

# API Test Job
- name: Upload screenshots
  with:
    name: playwright-screenshots  # ❌ 충돌

- name: Generate Allure Report  # ❌ if: always() 없음
  run: |
    npm install -g allure-commandline
```

**변경 후:**
```yaml
# UI Test Job
- name: Upload screenshots
  with:
    name: ui-playwright-screenshots  # ✅ 고유한 이름

- name: Upload videos
  with:
    name: ui-playwright-video

- name: Upload logs
  with:
    name: ui-playwright-logs

- name: Upload test result files
  with:
    name: ui-playwright-test-results

# API Test Job
- name: Upload screenshots
  with:
    name: api-playwright-screenshots  # ✅ 고유한 이름

- name: Upload videos
  with:
    name: api-playwright-video

- name: Upload logs
  with:
    name: api-playwright-logs

- name: Upload test result files
  with:
    name: api-playwright-test-results

- name: Generate Allure Report
  if: always()  # ✅ 추가됨
  run: |
    npm install -g allure-commandline
```

---

### 🔄 업데이트 후 필요한 작업

#### 로컬 환경
```bash
# 1. 새로운 의존성 설치
npm install

# 2. 테스트 실행
npx playwright test tests/ui/ --config=playwright.config.ts
npx playwright test tests/api/ --config=playwright.config.ts

# 3. Allure 리포트 생성 및 확인
npm install -g allure-commandline
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```

#### GitHub Actions
```bash
# 변경사항 커밋 및 푸시
git add .
git commit -m "Fix: Slack 알람 0 표시 문제 및 artifact 충돌 해결

- allure-playwright 의존성 추가
- playwright.config.ts에 allure reporter 설정 추가
- GitHub Actions artifact 이름 충돌 해결 (ui-*, api-* 접두사)
- API test Allure report 생성에 if: always() 추가"

git push origin main
```

---

### 🎯 기대 효과

1. **Slack 알람 정상화**
   - ✅ 실제 테스트 결과 (passed, failed, skipped) 정확히 표시
   - ✅ 테스트가 실행되지 않는 경우에만 0으로 표시

2. **Artifact 관리 개선**
   - ✅ UI와 API 테스트 결과를 별도로 다운로드 가능
   - ✅ 두 작업이 병렬 실행되어도 결과물 덮어쓰기 방지

3. **리포트 안정성 향상**
   - ✅ 테스트 실패 시에도 Allure 리포트 생성
   - ✅ 실패 원인 분석을 위한 리포트 항상 확인 가능

---

### 📊 Allure Reporter 기능

Allure는 다음과 같은 상세한 리포트를 제공합니다:

- 📈 테스트 실행 통계 (성공률, 실패율)
- 📊 시간별 테스트 실행 추이
- 🔍 각 테스트의 상세 정보 (단계별 실행, 스크린샷, 로그)
- 📝 실패한 테스트의 에러 메시지 및 스택 트레이스
- 🏷️ 카테고리별 테스트 분류

**리포트 접근:**
- UI 테스트: https://yoplekiller.github.io/PlaywrightQA/allure-report-ui/
- API 테스트: https://yoplekiller.github.io/PlaywrightQA/allure-report-api/

---

### 📚 참고 문서

- [Allure Playwright Documentation](https://www.npmjs.com/package/allure-playwright)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

---

### 🔍 트러블슈팅

#### Q: 로컬에서 Allure 리포트가 생성되지 않아요
```bash
# allure-commandline이 설치되어 있는지 확인
allure --version

# 없다면 설치
npm install -g allure-commandline

# 리포트 생성
allure generate ./allure-results --clean -o ./allure-report
```

#### Q: GitHub Actions에서 여전히 Slack 알람이 0으로 나와요
1. GitHub Actions 로그 확인
2. "Install dependencies" 단계에서 `allure-playwright` 설치 확인
3. "Run UI Tests" 또는 "Run API Tests" 단계에서 에러 확인
4. SLACK_WEBHOOK_TS 환경변수가 제대로 설정되어 있는지 확인

#### Q: Artifact를 찾을 수 없어요
- 이전 artifact 이름(`playwright-screenshots`)으로 검색하지 말고
- 새 이름(`ui-playwright-screenshots`, `api-playwright-screenshots`)으로 검색하세요

---

## 이전 버전 호환성

이 변경사항은 **Breaking Change가 아닙니다**:
- 기존 테스트 코드 수정 불필요
- 기존 Slack reporter 동작 유지
- 추가 reporter(Allure)만 추가됨
- `npm install`만 실행하면 정상 작동
