# Test info

- Name: 🎬 영화 페이지 SLA 응답 시간 테스트 >> 🔄 /movie/popular?api_key=your_api_key_here&language=ko-KR&page=1 응답 시간 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_sla.spec.ts:22:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_sla.spec.ts:38:33
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | import { allure } from 'allure-playwright';
   3 | import dotenv from 'dotenv';
   4 |
   5 | dotenv.config();
   6 |
   7 | const isCI = process.env.CI === 'true';
   8 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
   9 |
  10 | const API_KEY = process.env.API_KEY || '';
  11 | const SLA_SECONDS = 2;
  12 | const SLA_MILLISECONDS = SLA_SECONDS * 1000;
  13 |
  14 | // ✅ 템플릿 문자열은 백틱(`) 안에서 써야 값이 삽입됨
  15 | const endpoints = [
  16 |   `/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`,
  17 |   `/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  18 | ];
  19 |
  20 | test.describe('🎬 영화 페이지 SLA 응답 시간 테스트', () => {
  21 |   for (const endpoint of endpoints) {
  22 |     test(`🔄 ${endpoint} 응답 시간 확인`, async ({ request }) => {
  23 |       // Allure 메타데이터
  24 |       allure.label('feature', '영화 목록 API 테스트');
  25 |       allure.story('영화 페이지 SLA 응답 시간 테스트');
  26 |       allure.description(`SLA 응답 시간 테스트: ${endpoint}`);
  27 |       allure.severity('critical');
  28 |       allure.epic('API 응답 시간 검증');
  29 |
  30 |       const start = Date.now();
  31 |       const response = await request.get(`${BASE_URL}${endpoint}`);
  32 |       const elapsed = (Date.now() - start) / 1000;
  33 |
  34 |       console.log(`📡 요청 주소: ${BASE_URL}${endpoint}`);
  35 |       console.log(`⏱️ 응답 시간: ${elapsed.toFixed(3)}초`);
  36 |       console.log(`✅ 응답 상태: ${response.status()}`);
  37 |
> 38 |       expect(response.status()).toBe(200);
     |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  39 |       expect(elapsed).toBeLessThanOrEqual(SLA_SECONDS);
  40 |     });
  41 |   }
  42 | });
  43 |
```