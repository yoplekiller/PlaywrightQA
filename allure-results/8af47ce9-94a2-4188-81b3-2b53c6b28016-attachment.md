# Test info

- Name: 🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\api_movie_search.spec.ts:10:5

# Error details

```
SyntaxError: Unexpected token '<', "<html>
<h"... is not valid JSON
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\api_movie_search.spec.ts:16:16
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | import { allure } from 'allure-playwright';
   3 | import dotenv from 'dotenv';
   4 |
   5 | dotenv.config();
   6 |
   7 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   8 | const API_KEY = process.env.TMDB_API_KEY!;
   9 |
  10 | test('🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인', async () => {
  11 |   const apiContext = await request.newContext({ baseURL: BASE_URL });
  12 |
  13 |   const endpoint = `/movie/popular?api_key=${API_KEY}`;
  14 |   const response = await apiContext.get(endpoint);
  15 |   const status = response.status();
> 16 |   const data = await response.json();
     |                ^ SyntaxError: Unexpected token '<', "<html>
  17 |
  18 |   // ✅ 테스트 검증
  19 |   expect(status).toBe(200);
  20 |   expect(data).toHaveProperty('results');
  21 |   expect(Array.isArray(data.results)).toBe(true);
  22 |   expect(data.results.length).toBeGreaterThan(0);
  23 |
  24 |   // ✅ Allure 첨부
  25 |   allure.attachment('인기 영화 목록 응답', JSON.stringify(data, null, 2), 'application/json');
  26 |
  27 |   // ✅ 결과 콘솔 출력
  28 |   console.log(`🎉 인기 영화 ${data.results.length}건 조회됨`);
  29 | });
  30 |
```