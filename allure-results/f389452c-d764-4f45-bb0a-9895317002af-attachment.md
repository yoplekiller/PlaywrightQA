# Test info

- Name: 🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:9:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:15:29
```

# Test source

```ts
   1 |
   2 | import { test, expect, request } from '@playwright/test';
   3 | import dotenv from 'dotenv';
   4 | dotenv.config();
   5 |
   6 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   7 | const API_KEY = process.env.TMDB_API_KEY;
   8 |
   9 | test('🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인', async () => {
  10 |   const apiContext = await request.newContext({
  11 |     baseURL: BASE_URL,
  12 |   });
  13 |
  14 |   const response = await apiContext.get(`/movie/popular?api_key=${API_KEY}`);
> 15 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  16 |
  17 |   const data = await response.json();
  18 |
  19 |   // 응답 구조 확인
  20 |   expect(data).toHaveProperty('results');
  21 |   expect(Array.isArray(data.results)).toBeTruthy();
  22 |   expect(data.results.length).toBeGreaterThan(0);
  23 |
  24 |   // 실패 시 디버깅용 출력
  25 |   console.log(`✅ 인기 영화 ${data.results.length}개 조회됨`);
  26 | });
  27 |
```