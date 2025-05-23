# Test info

- Name: 🎥 영화 ID 550 → "Fight Club" 상세 조회
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_test.spec.ts:18:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_test.spec.ts:24:31
```

# Test source

```ts
   1 | // tests/api/test_movie_details.spec.ts
   2 | import { test, expect, request } from '@playwright/test';
   3 | import dotenv from 'dotenv';
   4 | dotenv.config();
   5 |
   6 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   7 | const API_KEY = process.env.TMDB_API_KEY;
   8 |
   9 | // 🎬 테스트 데이터
  10 | const movieCases = [
  11 |   { movie_id: 238, expected_title: "The Godfather" },
  12 |   { movie_id: 550, expected_title: "Fight Club" },
  13 |   { movie_id: 603, expected_title: "The Matrix" },
  14 |   { movie_id: 157336, expected_title: "Interstellar" },
  15 | ];
  16 |
  17 | for (const { movie_id, expected_title } of movieCases) {
  18 |   test(`🎥 영화 ID ${movie_id} → "${expected_title}" 상세 조회`, async () => {
  19 |     const apiContext = await request.newContext({
  20 |       baseURL: BASE_URL,
  21 |     });
  22 |
  23 |     const response = await apiContext.get(`/movie/${movie_id}?api_key=${API_KEY}`);
> 24 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  25 |
  26 |     const data = await response.json();
  27 |     expect(data.id).toBe(movie_id);
  28 |     expect(data.title).toBe(expected_title);
  29 |
  30 |     // 콘솔 출력 (선택적)
  31 |     console.log(`✅ ${data.title} 조회 완료`);
  32 |   });
  33 | }
  34 |
```