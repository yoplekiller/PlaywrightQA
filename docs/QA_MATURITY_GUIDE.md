# QA Maturity Guide

이 프로젝트는 포트폴리오용 Playwright QA 자동화 프로젝트이므로, 실무에서 자주 쓰는 구조를 과하지 않게 반영한다.

## Test Tags

| Tag | Purpose | Command |
| --- | --- | --- |
| `@smoke` | PR에서 빠르게 깨짐 여부를 확인하는 핵심 플로우 | `npm run test:smoke` |
| `@regression` | main 반영 후 주요 기능을 넓게 확인 | `npm run test:regression` |
| `@auth` | 로그인 상태가 필요한 테스트 | `npm run test:auth` |
| `@visual` | 스냅샷 기반 UI 변경 감지 | `npm run test:visual` |
| `@a11y` | axe-core 접근성 검사 | `npm run test:a11y` |
| `@responsive` | 모바일/태블릿/데스크톱 레이아웃 확인 | `npm run test:responsive` |

## CI Strategy

- Pull Request: `typecheck` 후 `@smoke`만 실행한다.
- main push, manual run, schedule: `typecheck` 후 `@regression`을 실행한다.
- 인증 테스트는 계정/secret 의존성이 있으므로 기본 CI에서 분리하고 `test:auth`로 별도 실행한다.

## Data Strategy

- 반복 검색어는 `src/tests/data/products.ts`에서 관리한다.
- smoke 검색 케이스는 `src/tests/data/searchCases.ts`에 모은다.
- 외부 라이브 사이트 상태에 따라 변동성이 큰 테스트는 핵심 검증만 남기고 과한 assertion을 피한다.
- 메인 배너/프로모션처럼 자주 바뀌는 영역은 visual snapshot 대상에서 제외한다.

## Next Candidates

- PR용 smoke와 nightly regression workflow를 파일 단위로 분리
- API mocking 또는 route interception 도입
- 실패 원인 라벨링을 Slack reporter와 README에 일관되게 반영

## Locator Diagnostics

테스트 실패 시 `locator-diagnostics.json`을 Playwright report에 첨부한다.

- 실패 URL, 페이지 제목, 에러 요약을 남긴다.
- 실패 유형, 담당 힌트, 추천 액션을 함께 남긴다.
- 화면에 남아 있는 주요 `button`, `a`, `input`, `role`, `aria-label`, `data-testid` 후보를 기록한다.
- 자동으로 locator를 수정하지는 않는다. 잘못된 요소를 클릭하고도 테스트가 통과하는 위험을 막기 위해, 후보만 제안하고 수정은 사람이 리뷰한다.

분류 예시는 다음과 같다.

| Failure Type | Owner Hint | Meaning |
| --- | --- | --- |
| `locator-or-wait-condition` | `automation` | locator 변경, wait 조건 불안정 |
| `visual-baseline` | `product` | 의도된 UI 변경 또는 visual regression |
| `navigation-or-routing` | `automation` | URL 기대값 또는 라우팅 변경 |
| `auth-or-session` | `environment` | 로그인 세션, storageState, secret 문제 |
| `network-or-server` | `environment` | 서버 응답 또는 네트워크 문제 |
| `assertion-data-mismatch` | `needs-triage` | 기대값, 테스트 데이터, 실제 결과 불일치 |
