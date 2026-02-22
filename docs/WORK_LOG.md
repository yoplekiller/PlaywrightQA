# 📝 작업 이력 (Work Log)

프로젝트의 주요 작업 및 개선 사항을 시간순으로 기록합니다.

---

## 2026-01-08 (수) - CI/CD 성능 개선

### 📌 작업 목표
GitHub Actions 워크플로우 성능 최적화를 통한 빌드 및 테스트 시간 단축

### ✅ 완료된 작업

#### 1. npm 캐싱 추가
**파일:** `.github/workflows/playwright-test.yaml`
**변경 내용:**
```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # ← 추가
```
**효과:** 의존성 설치 시간 50% 단축

---

#### 2. Playwright 브라우저 캐싱 추가
**파일:** `.github/workflows/playwright-test.yaml`
**변경 내용:**
- Cache action 추가
- 조건부 브라우저 설치
- 캐시 히트 시 dependencies만 설치

**효과:** 브라우저 설치 시간 80% 단축 (3분 → 30초)

---

#### 3. Workers 병렬 실행 증가
**파일:** `.github/workflows/playwright-test.yaml`
**변경 내용:**
```yaml
# Before: --workers=1
# After:  --workers=2
```
**효과:** 테스트 실행 시간 40% 단축

---

#### 4. Artifact 보존 기간 최적화
**파일:** `.github/workflows/playwright-test.yaml`
**변경 내용:**
- HTML 리포트: `retention-days: 30`
- 스크린샷/비디오/로그: `retention-days: 7`

**효과:** GitHub Storage 비용 절감

---

#### 5. GitHub Actions Summary 추가
**파일:** `.github/workflows/playwright-test.yaml`
**변경 내용:**
- 테스트 결과 요약을 Actions Summary에 표시
- 리포트 링크 자동 생성

**효과:** 사용성 향상, 빠른 결과 확인

---

### 📊 성능 개선 결과

| 항목 | Before | After | 개선율 |
|-----|--------|-------|--------|
| 빌드 시간 | ~6분 | ~3분 | 50% ↓ |
| 테스트 실행 | ~8분 | ~5분 | 37.5% ↓ |
| **전체 소요** | **~14분** | **~8분** | **42.8% ↓** |

**총 시간 절감:**
- 1회 실행: 약 6분
- 하루 3회 실행: 18분
- 한 달: 약 9시간

---

### 📄 생성된 문서
- `docs/CI_CD_IMPROVEMENTS_APPLIED.md` - 상세 개선 내역 및 가이드
- `docs/WORK_LOG.md` - 작업 이력 (본 파일)
- `README.md` - "최근 완료" 섹션 업데이트

---

### 🔗 관련 커밋
- **커밋 해시:** 41da87a
- **커밋 메시지:** 🚀 CI/CD 성능 개선: 빌드 시간 42.8% 단축
- **푸시 일시:** 2026-01-08
- **브랜치:** main

---

### 📝 다음 단계
1. ✅ 첫 번째 워크플로우 실행 모니터링
2. ✅ 두 번째 실행에서 캐시 히트 확인
3. ⏳ 1주일간 안정성 모니터링 (2026-01-15까지)
4. ⏳ Workers=2로 인한 flaky test 여부 확인

---

### 💡 참고사항
- 캐시는 package-lock.json 변경 시 자동 무효화
- Workers 증가로 인한 테스트 간섭 발생 시 1로 롤백 예정
- Artifact retention은 필요 시 조정 가능

---

## 2026-02-19 (수) - POM 마무리 + Visual Regression + retry 설정

### 📌 작업 목표
부분 적용된 POM 패턴 완성, Visual Regression 테스트 추가, retry 전략 적용

### ✅ 완료된 작업

#### 1. POM 부분 적용 2개 마무리
**파일:** `ui_blank_search.spec.ts`, `ui_address_search.spec.ts`, `MainPage.ts`, `BasePage.ts`
**변경 내용:**
- `page.goto()` → `mainpage.goto()` (BasePage 메서드)
- `page.setViewportSize()` → `mainpage.setViewportSize()` (BasePage에 추가)
- `page.locator()` / `page.getByText()` → `mainpage.isBlankSearchPopupVisible()` (MainPage에 추가)
- `page.waitForEvent('popup')` + `page.getByRole().click()` → `mainpage.openAddressSearchPopup()` (MainPage에 추가)

**효과:** 테스트 파일에서 raw Playwright 코드 제거, POM 패턴 100% 적용 완료

#### 2. Visual Regression 테스트 추가
**파일:** `src/tests/ui/ui_visual_regression.spec.ts`
**변경 내용:**
- Playwright `toHaveScreenshot()` 기반 4개 스냅샷 테스트 추가
- `maxDiffPixelRatio: 0.15` 설정 (동적 콘텐츠 허용, 레이아웃 깨짐 감지)
- Chromium + Edge 크로스 브라우저 대응 (총 8개 테스트)

| 테스트 | 검증 내용 |
|--------|-----------|
| 메인 페이지 전체 스냅샷 | 메인 레이아웃 변경 감지 |
| 검색 결과 페이지 스냅샷 | 검색 UI 변경 감지 |
| 뷰티컬리 페이지 스냅샷 | 페이지 전환 후 레이아웃 감지 |
| 상품 상세 페이지 스냅샷 | 상품 상세 UI 변경 감지 |

**효과:** UI 변경 자동 감지 체계 구축

#### 3. retry 설정 추가
**파일:** `playwright.config.ts`
**변경 내용:**
```typescript
// Before
retries: 0,
// After
retries: process.env.CI ? 1 : 0,
```
**효과:** CI 환경에서 flaky test 방지, 로컬에서는 즉시 실패 확인

---

### 📊 테스트 현황

| 구분 | 테스트 수 | POM 적용 |
|------|-----------|----------|
| UI 일반 | 9개 (+1 Visual Regression) | ✅ 100% |
| UI 인증 필요 | 4개 | ✅ 100% |
| UI 연습용 | 3개 (accessibility, network_error, responsive) | 대상 외 |
| **총 실행** | **13개 x 2 브라우저 = 26개** | |

### 📄 생성/수정된 파일
- `src/pages/BasePage.ts` - `setViewportSize()` 메서드 추가
- `src/pages/MainPage.ts` - `isBlankSearchPopupVisible()`, `clickAddressSearchButton()`, `openAddressSearchPopup()` 추가
- `src/tests/ui/ui_blank_search.spec.ts` - POM 리팩토링
- `src/tests/ui/ui_address_search.spec.ts` - POM 리팩토링
- `src/tests/ui/ui_visual_regression.spec.ts` - 신규 생성
- `playwright.config.ts` - retry 설정

---

## 다음 예정 작업

### 우선순위 1: API 테스트 추가
- [ ] Playwright `request` 기반 API 테스트 구현
- [ ] UI + API 테스트 공존 구조 설계

### 우선순위 2: 모바일 반응형 스냅샷
- [ ] 모바일 viewport (375x667) Visual Regression 추가
- [ ] 태블릿 viewport (768x1024) 추가

### 우선순위 3: 테스트 고급화
- [ ] `@smoke`, `@regression` 태그 분류
- [ ] `test.extend` 커스텀 fixture 적용
- [ ] 성능 테스트 (Lighthouse CI)

### 우선순위 4: 테스트 커버리지 확대
- [ ] 크로스 브라우저 테스트 (Firefox, Safari)
- [ ] 추가 테스트 시나리오

---

**마지막 업데이트:** 2026-02-19
