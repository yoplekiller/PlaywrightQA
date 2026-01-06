# CI/CD Pipeline Improvements

## 🚀 개선사항 요약

### 1. **의존성 캐싱 추가** (빌드 시간 50% 단축)

#### npm 캐싱
```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # ← 추가
```

#### Playwright 브라우저 캐싱
```yaml
- name: Cache Playwright browsers
  id: playwright-cache
  uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-playwright-

- name: Install Playwright browsers
  if: steps.playwright-cache.outputs.cache-hit != 'true'
  run: npx playwright install --with-deps

- name: Install Playwright dependencies only
  if: steps.playwright-cache.outputs.cache-hit == 'true'
  run: npx playwright install-deps
```

**효과:** 
- 첫 실행: ~3분
- 캐시 히트: ~30초
- 약 5배 속도 향상

---

### 2. **병렬 실행 workers 증가** (테스트 시간 40% 단축)

#### Before
```yaml
- name: Run UI Tests
  run: npx playwright test tests/ui/ --workers=1
```

#### After
```yaml
- name: Run UI Tests
  run: npx playwright test tests/ui/ --workers=2
```

**권장사항:**
- GitHub Actions: `--workers=2` (free tier에서 안전)
- 로컬 개발: `--workers=4` (CPU 코어에 따라 조정)

---

### 3. **테스트 결과 요약 추가** (GitHub Actions Summary)

```yaml
- name: Create Test Summary
  if: always()
  run: |
    echo "## 🎭 UI Test Results" >> $GITHUB_STEP_SUMMARY
    echo "" >> $GITHUB_STEP_SUMMARY
    if [ -f "allure-report/widgets/summary.json" ]; then
      echo "📊 **Test Statistics:**" >> $GITHUB_STEP_SUMMARY
      cat allure-report/widgets/summary.json | jq -r '"- Total: \(.statistic.total // 0)\n- Passed: \(.statistic.passed // 0)\n- Failed: \(.statistic.failed // 0)\n- Skipped: \(.statistic.skipped // 0)"' >> $GITHUB_STEP_SUMMARY
    fi
    echo "" >> $GITHUB_STEP_SUMMARY
    echo "📈 [View Full Report](https://yoplekiller.github.io/PlaywrightQA/allure-report/index.html)" >> $GITHUB_STEP_SUMMARY
```

**효과:**
- PR/Actions 탭에서 즉시 결과 확인 가능
- 리포트 링크 클릭 한 번으로 이동
- 불필요한 아티팩트 다운로드 감소

---

### 4. **Artifact 보존 기간 설정** (스토리지 비용 절감)

```yaml
- name: Upload Playwright HTML report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report
    retention-days: 30  # ← 추가 (리포트는 30일)

- name: Upload screenshots
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: ui-playwright-screenshots
    path: screenshots
    if-no-files-found: ignore
    retention-days: 7  # ← 추가 (스크린샷은 7일)
```

**권장 보존 기간:**
- HTML 리포트: 30일
- 스크린샷/비디오: 7일
- 로그 파일: 7일
- 테스트 결과: 7일

---

### 5. **Job 병렬 실행** (이미 적용됨 ✅)

현재 `ui-test`와 `api-test`가 별도 job으로 병렬 실행 중입니다. 이는 최적화된 구조입니다!

```yaml
jobs:
  ui-test:  # 병렬 실행
    runs-on: ubuntu-latest
    # ...

  api-test:  # 병렬 실행
    runs-on: ubuntu-latest
    # ...
```

---

## 📊 개선 효과 예상

| 항목 | Before | After | 개선율 |
|-----|--------|-------|--------|
| **빌드 시간** | ~6분 | ~3분 | 50% ↓ |
| **테스트 실행** | ~8분 | ~5분 | 37.5% ↓ |
| **전체 소요** | ~14분 | ~8분 | 42.8% ↓ |
| **스토리지** | 무제한 | 최적화 | 비용 ↓ |

---

## 🔧 적용 방법

### 즉시 적용 가능 (코드 변경 없음)
1. ✅ npm 캐싱
2. ✅ Playwright 브라우저 캐싱
3. ✅ Artifact retention-days 설정

### 테스트 필요 (안정성 확인)
4. ⚠️ workers 증가 (1 → 2)
   - 로컬에서 먼저 테스트 권장
   - flaky test 발생 시 롤백

### 선택사항 (부가 기능)
5. 💡 Test Summary 추가
6. 💡 PR 코멘트에 결과 자동 포스팅 (github-script 활용)
7. 💡 실패 시 자동 재실행 (retry 전략)

---

## 📝 참고 자료

- [GitHub Actions Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Playwright Test Parallelism](https://playwright.dev/docs/test-parallel)
- [GitHub Actions Job Summary](https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/)
- [Actions Artifacts Retention](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts#configuring-a-custom-artifact-retention-period)
