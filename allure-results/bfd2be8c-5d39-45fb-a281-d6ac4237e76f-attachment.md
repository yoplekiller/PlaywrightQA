# Test info

- Name: 🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:8:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_popular_movie.spec.ts:24:29
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 | dotenv.config();
   4 |
   5 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   6 | const API_KEY = process.env.TMDB_API_KEY;
   7 |
   8 | test('🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인', async () => {
   9 |   console.log('BASE_URL:', BASE_URL);
  10 |   console.log('API_KEY:', API_KEY);
  11 |
  12 |   const apiContext = await request.newContext({
  13 |     baseURL: BASE_URL,
  14 |   });
  15 |
  16 |   const url = `/movie/popular?api_key=${API_KEY}`;
  17 |   console.log('Request URL:', BASE_URL + url);
  18 |
  19 |   const response = await apiContext.get(url);
  20 |   console.log('Status:', response.status());
  21 |   const text = await response.text();
  22 |   console.log('Raw response:', text);
  23 |
> 24 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  25 |
  26 |   const data = JSON.parse(text);
  27 |
  28 |   expect(data).toHaveProperty('results');
  29 |   expect(Array.isArray(data.results)).toBeTruthy();
  30 |   expect(data.results.length).toBeGreaterThan(0);
  31 |
  32 |   console.log(`✅ 인기 영화 ${data.results.length}개 조회됨`);
  33 | });
```