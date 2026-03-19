# 로그인 필요 테스트 (Requires Authentication)

## 개요

이 폴더의 테스트는 **로그인이 필요한 기능**을 검증합니다.
마켓컬리의 보안 정책(CAPTCHA, 봇 탐지)으로 인해 CI/CD 환경에서 자동 실행이 불가능하여 따로 분리한 코드들 입니다.

## 포함된 테스트

| 파일 | 설명 |
|------|------|
| `ui_login.spec.ts` | 로그인 기능 검증 |
| `ui_favorite_toggle.spec.ts` | 상품 찜하기 토글 |
| `ui_pick_page.spec.ts` | 찜 목록 페이지 |
| `ui_goods_add_and_verify.spec.ts` | 상품 장바구니 담기 및 확인 |

## CI/CD 제외 설정

`playwright.config.ts`에서 이 폴더를 제외합니다:

```typescript
projects: [
  {
    name: 'chromium',
    testIgnore: '**/requires-auth/**',
  },
  {
    name: name: 'Edge',
    testIgnore: '**/requires-auth/**',
  },
]
```
