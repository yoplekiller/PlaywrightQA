# API Client 마이그레이션 (Python → TypeScript)

> 작성일: 2026-01-27
> 상태: 진행 중

---

## 목표

`src/utils/api_client.py` (Python) → `src/utils/api_client.ts` (TypeScript) 변환

---

## 현재 진행 상황

### 완료된 부분
- [x] 기본 클래스 구조 작성
- [x] GET 메서드 구현
- [x] POST 메서드 구현 (일부)

### 남은 작업
- [ ] POST 메서드 완성 (문법 오류 수정)
- [ ] BASE_URL 적용
- [ ] 환경변수 키 확인 및 수정
- [ ] 테스트 파일에서 사용해보기

---

## 현재 코드 (수정 필요)

```typescript
// src/utils/api_client.ts
import { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || "";
const API_KEY = process.env.TMDB_API_KEY || "";

export class ApiClient {
    constructor(private apiContext: APIRequestContext) {}

    async get(endpoint: string, params?: Record<string, string>, headers?: Record<string, string>) {
        const response = await this.apiContext.get(`${BASE_URL}${endpoint}`, {
            params,
            headers,
        });
        return response;
    }

    async post(endpoint: string, data?: object, headers?: Record<string, string>) {
        const response = await this.apiContext.post(`${BASE_URL}${endpoint}`, {
            data,
            headers,
        });
        return response;
    }
}
```

---

## 수정 포인트 요약

| 항목 | 문제 | 해결 |
|------|------|------|
| POST 메서드 | `);` 빠짐, `return` 빠짐 | 추가 필요 |
| BASE_URL | 선언만 하고 미사용 | endpoint 앞에 붙이기 |
| 환경변수 | `base_url` → `TMDB_BASE_URL` | .env 파일 키와 맞추기 |

---

## 사용 예시

```typescript
// 테스트 파일에서 사용
import { test, expect } from '@playwright/test';
import { ApiClient } from '../utils/api_client';

test('영화 검색 API', async ({ request }) => {
    const client = new ApiClient(request);

    const response = await client.get('/search/movie', {
        query: 'Inception',
        api_key: process.env.TMDB_API_KEY
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.results.length).toBeGreaterThan(0);
});
```

---

## 참고 자료

- [Playwright API Testing 공식 문서](https://playwright.dev/docs/api-testing)
- [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)

---

## 다음 단계

1. 위 코드를 `src/utils/api_client.ts`에 저장
2. 기존 API 테스트 파일 하나를 선택해서 적용해보기
3. 동작 확인 후 나머지 테스트에 적용
