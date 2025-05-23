# Test info

- Name: 🎬 TMDB 영화 API 테스트 >> 인기 영화 목록 조회 - 200 응답 및 결과 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:10:7

# Error details

```
SyntaxError: Unexpected token '<', "<html>
<h"... is not valid JSON
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:15:18
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 | import { allure } from 'allure-playwright';
   4 | dotenv.config();
   5 |
   6 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   7 | const API_KEY = process.env.TMDB_API_KEY!;
   8 |
   9 | test.describe('🎬 TMDB 영화 API 테스트', () => {
  10 |   test('인기 영화 목록 조회 - 200 응답 및 결과 확인', async () => {
  11 |     const apiContext = await request.newContext({ baseURL: BASE_URL });
  12 |
  13 |     const response = await apiContext.get(`/movie/popular?api_key=${API_KEY}`);
  14 |     const status = response.status();
> 15 |     const body = await response.json();
     |                  ^ SyntaxError: Unexpected token '<', "<html>
  16 |
  17 |     // Allure 첨부 (응답 전문 JSON)
  18 |     allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');
  19 |
  20 |     // 테스트 검증
  21 |     expect(status).toBe(200);
  22 |     expect(body).toHaveProperty('results');
  23 |     expect(Array.isArray(body.results)).toBe(true);
  24 |     expect(body.results.length).toBeGreaterThan(0);
  25 |
  26 |     console.log(`✅ 인기 영화 수: ${body.results.length}`);
  27 |   });
  28 | });
  29 |
```