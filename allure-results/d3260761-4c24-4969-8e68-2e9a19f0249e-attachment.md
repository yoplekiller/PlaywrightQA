# Test info

- Name: 🔍 TMDB API 디버깅 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_search.spec.ts:8:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_search.spec.ts:28:18
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | import { allure } from 'allure-playwright';
   3 | import dotenv from 'dotenv';
   4 |
   5 | dotenv.config();
   6 |
   7 |
   8 | test('🔍 TMDB API 디버깅 테스트', async () => {
   9 |   const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3/';
  10 |   const API_KEY = process.env.TMDB_API_KEY!;
  11 |   console.log("🌐 BASE_URL:", BASE_URL);
  12 |   console.log("🔑 API_KEY 존재 여부:", !!API_KEY);
  13 |   console.log("🔑 API_KEY 앞 6글자:", API_KEY?.slice(0, 6));
  14 |
  15 |   const apiContext = await request.newContext({ baseURL: BASE_URL });
  16 |   const endpoint = `movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  17 |
  18 |   console.log("📡 최종 요청 URL:", BASE_URL + endpoint);
  19 |   const response = await apiContext.get(endpoint);
  20 |   const status = response.status();
  21 |   const contentType = response.headers()['content-type'];
  22 |   const rawBody = await response.text();
  23 |
  24 |   console.log("✅ 상태 코드:", status);
  25 |   console.log("📦 Content-Type:", contentType);
  26 |   console.log("📄 응답 본문 앞 300자:\n", rawBody.slice(0, 300));
  27 |
> 28 |   expect(status).toBe(200); // 강제 실패 감지용
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  29 | });
  30 |
```