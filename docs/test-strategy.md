# 테스트 전략 문서

## 📖 목차
1. [테스트 전략 개요](#테스트-전략-개요)
2. [테스트 피라미드](#테스트-피라미드)
3. [주소 검색 테스트 전략](#주소-검색-테스트-전략)
4. [CI/CD 전략](#cicd-전략)
5. [권장 사항](#권장-사항)

---

## 테스트 전략 개요

### 기본 원칙

1. **빠른 피드백**: CI/CD에서 5-10분 내 결과 확인
2. **안정성 우선**: Flaky Test 최소화 (성공률 95% 이상)
3. **핵심 집중**: 비즈니스 크리티컬한 기능 우선
4. **유지보수 고려**: 복잡도 최소화, 문서화 철저

---

## 테스트 피라미드

### 이상적인 비율

```
        ┌──────────────┐
        │  E2E (10%)   │  ← Smoke Test, Critical Path
        │  느림, 깨짐  │     실행 시간: 5-10분
        ├──────────────┤
        │Integration   │  ← API Test, DB Test
        │   (30%)      │     실행 시간: 2-5분
        ├──────────────┤
        │  Unit Test   │  ← Component Test, Logic
        │   (60%)      │     실행 시간: < 1분
        └──────────────┘
```

### 주소 검색 기능 적용

| 레벨 | 테스트 유형 | 범위 | 목적 | 속도 |
|------|------------|------|------|------|
| **E2E** | Simple E2E | 팝업 연동 확인 | Smoke Test | 10초 |
| **Integration** | API Test | 주소 저장 로직 | 핵심 비즈니스 | 2초 |
| **Unit** | Component Test | 입력 필드 검증 | UI 로직 | < 1초 |

---

## 주소 검색 테스트 전략

### 전체 플로우

```
사용자 플로우:
주소 검색 버튼 클릭
  → 팝업 열림 (다음 우편번호)
  → 주소 검색
  → 주소 선택
  → 상세주소 입력
  → 저장
```

### 테스트 계층별 접근

#### 1. E2E Layer (10% - Smoke Test만)

**목적**: 핵심 플로우가 작동하는지만 확인

```typescript
// ✅ Simple E2E - CI에 포함
test('주소 검색 팝업 연동 확인', async ({ page }) => {
    // 팝업이 열리고 다음 우편번호 서비스인지만 확인
    const popup = await page.waitForEvent('popup');
    expect(popup.url()).toContain('postcode');
});
```

**범위:**
- 팝업 연동 확인만
- 전체 플로우는 테스트 안 함 (너무 느리고 불안정)

**실행 환경:**
- ✅ CI/CD: 매 배포 전
- ✅ Schedule: 매일 밤 12시
- ✅ PR: Pull Request 생성 시

---

#### 2. Integration Layer (30% - API Test)

**목적**: 핵심 비즈니스 로직 검증

```typescript
// ✅ API Test - CI의 메인 검증
test('주소 저장 API 검증', async ({ request }) => {
    const response = await request.post('/api/user/address', {
        data: {
            zipcode: '13536',
            roadAddress: '경기 성남시 분당구 판교역로 6-3',
            detailAddress: '101동 101호'
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.address.zipcode).toBe('13536');
    expect(data.address.roadAddress).toContain('판교역로');
});
```

**범위:**
- 주소 저장/수정/삭제 API
- 주소 유효성 검증
- 에러 케이스 (잘못된 우편번호, 필수값 누락 등)

**실행 환경:**
- ✅ CI/CD: 매 커밋
- ✅ Local: 개발 중 수시로

---

#### 3. Unit Layer (60% - Component Test)

**목적**: 개별 컴포넌트 검증

```typescript
// ✅ Component Test
test('상세주소 입력 필드 검증', async ({ page }) => {
    await page.goto('/address/new');

    const detailInput = page.locator('input[name="detailAddress"]');

    // 빈 값 검증
    await expect(detailInput).toBeEmpty();

    // 입력 검증
    await detailInput.fill('101동 101호');
    await expect(detailInput).toHaveValue('101동 101호');

    // 최대 길이 검증
    const longText = 'a'.repeat(101);
    await detailInput.fill(longText);
    await expect(detailInput).toHaveValue(longText.substring(0, 100));
});
```

**범위:**
- 입력 필드 검증 (빈 값, 최대 길이, 특수문자 등)
- 버튼 활성화/비활성화
- 에러 메시지 표시

**실행 환경:**
- ✅ Local: 개발 중
- ✅ CI/CD: 선택적

---

### 복잡한 Full E2E는?

#### Full E2E (iframe 처리 포함)

```typescript
// ⚠️ Full E2E - CI에서 제외, 수동 실행만
test.skip('주소 검색 전체 플로우 E2E', async ({ page }) => {
    // iframe 처리 + 전체 플로우
    // 너무 복잡하고 깨지기 쉬움
});
```

**왜 CI에서 제외?**
1. **너무 느림**: 45초 (Simple E2E의 4.5배)
2. **불안정함**: iframe 타이밍 이슈, 외부 서비스 의존
3. **유지보수 어려움**: 다음 우편번호 UI 변경 시 깨짐

**언제 실행?**
- 수동 테스트: 월 1회
- 릴리즈 전: 주요 배포 전
- 문제 발생 시: 디버깅 목적

---

## CI/CD 전략

### GitHub Actions 파이프라인

```yaml
# .github/workflows/playwright-test.yaml

name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # 매일 자정

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2]  # 병렬 실행

    steps:
      # 1. Checkout & Setup
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      # 2. Install
      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      # 3. Run Tests
      - name: Run API Tests
        run: npm run test:api  # 항상 실행 (빠름, 안정적)

      - name: Run Simple E2E Tests
        run: npm run test:smoke  # Smoke Test만

      # Full E2E는 제외!
      # - name: Run Full E2E Tests
      #   run: npm run test:e2e:full

      # 4. Upload Results
      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: allure-results
          path: allure-results/

      # 5. Slack Notification
      - name: Send Slack Notification
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 테스트 실행 시간 목표

| 단계 | 목표 시간 | 현재 시간 | 상태 |
|------|----------|----------|------|
| API Test | < 5분 | 2분 | ✅ |
| Simple E2E | < 3분 | 10초 | ✅ |
| **Total** | **< 8분** | **2분 10초** | ✅✅ |

### 실패 시 대응

```
실패 케이스별 대응:

1. API Test 실패
   → 배포 중단 (Critical!)
   → 즉시 Slack 알림
   → 개발팀 확인 필요

2. Simple E2E 실패
   → 배포 중단
   → 연동 이슈 확인
   → 다음 우편번호 서비스 상태 확인

3. Full E2E 실패 (수동 실행 시)
   → 배포 진행 (블로커 아님)
   → 이슈 생성
   → 다음 스프린트에 수정
```

---

## 권장 사항

### ✅ DO

1. **테스트 피라미드 준수**
   - E2E 10%, Integration 30%, Unit 60%

2. **빠른 테스트 우선**
   - API Test를 CI의 메인으로
   - E2E는 Smoke Test만

3. **외부 의존성 최소화**
   - 외부 서비스는 연동만 확인
   - 핵심 로직은 API로 검증

4. **명시적 대기 사용**
   - `waitForSelector()` 사용
   - timeout 충분히 설정

5. **실패 시 스크린샷/Trace**
   - 디버깅 용이하도록 자동 저장

### ❌ DON'T

1. **모든 것을 E2E로 테스트**
   - E2E는 느리고 불안정함

2. **고정 대기 시간 남용**
   - `waitForTimeout()`은 최소화
   - `waitForSelector()` 선호

3. **복잡한 테스트를 CI에 포함**
   - CI는 빠르고 안정적인 테스트만

4. **외부 서비스 내부 테스트**
   - 다음 우편번호 서비스는 다음이 테스트함
   - 우리는 연동만 확인

5. **Flaky Test 방치**
   - 3회 연속 실패 시 즉시 수정 또는 skip

---

## 측정 지표

### 테스트 품질 지표

| 지표 | 목표 | 현재 | 측정 방법 |
|------|------|------|----------|
| **커버리지** | 80% | 75% | Jest/Istanbul |
| **성공률** | 95% | 97% | CI 로그 분석 |
| **실행 시간** | < 10분 | 2분 10초 | GitHub Actions |
| **Flaky Rate** | < 5% | 2% | 재실행 횟수 |

### 주간 리포트

```markdown
## 주간 테스트 리포트 (2026-01-06 ~ 2026-01-12)

### 통계
- 총 실행 횟수: 142회
- 성공: 138회 (97.2%)
- 실패: 4회 (2.8%)
- 평균 실행 시간: 2분 15초

### 주요 실패 케이스
1. API Test: 주소 저장 500 에러 (2회)
   → 원인: DB 타임아웃
   → 해결: Connection Pool 증설

2. Simple E2E: 팝업 열리지 않음 (1회)
   → 원인: 네트워크 일시적 장애
   → 해결: 재실행으로 통과

### 개선 사항
- [ ] API Test timeout 5초 → 10초로 증가
- [ ] 네트워크 에러 재시도 로직 추가
```

---

## 체크리스트

### 새 테스트 작성 시

- [ ] 테스트 피라미드에서 적절한 레벨인가?
- [ ] CI 실행 시간 고려했는가? (< 10분)
- [ ] 외부 의존성 최소화했는가?
- [ ] 명시적 대기를 사용했는가?
- [ ] 실패 시 스크린샷/Trace 설정했는가?
- [ ] 테스트 이름이 명확한가?
- [ ] 문서화했는가? (README, 주석)

### CI/CD 통합 전

- [ ] Local에서 10회 연속 성공하는가?
- [ ] 다양한 환경에서 테스트했는가?
- [ ] 성능 임팩트 분석했는가?
- [ ] Flaky Test 가능성 검토했는가?
- [ ] Rollback 계획이 있는가?

---

## 참고 자료

- [테스트 피라미드 - Martin Fowler](https://martinfowler.com/bliki/TestPyramid.html)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [주소 검색 가이드](./address-search-guide.md)
- [iframe 처리 문서](./iframe-challenge.md)
- [실무 vs 포트폴리오](./실무-vs-포트폴리오.md)

---

**작성일**: 2026-01-11
**버전**: 1.0
**다음 리뷰**: 2026-02-11
