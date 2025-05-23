# Test info

- Name: 🎥 영화 ID 157336 → "Interstellar" 상세 조회
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\api_movie_search.spec.ts:17:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\api_movie_search.spec.ts:31:31
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
   8 | // 🎬 테스트 데이터
   9 | const movieCases = [
  10 |   { movie_id: 238, expected_title: "The Godfather" },
  11 |   { movie_id: 550, expected_title: "Fight Club" },
  12 |   { movie_id: 603, expected_title: "The Matrix" },
  13 |   { movie_id: 157336, expected_title: "Interstellar" },
  14 | ];
  15 |
  16 | for (const { movie_id, expected_title } of movieCases) {
  17 |   test(`🎥 영화 ID ${movie_id} → "${expected_title}" 상세 조회`, async () => {
  18 |     const apiContext = await request.newContext({
  19 |       baseURL: BASE_URL,
  20 |     });
  21 |
  22 |     const url = `/movie/${movie_id}?api_key=${API_KEY}`;
  23 |     console.log('Request URL:', BASE_URL + url);
  24 |     console.log('API KEY:', API_KEY);
  25 |
  26 |     const response = await apiContext.get(url);
  27 |     console.log('Status:', response.status());
  28 |     const text = await response.text();
  29 |     console.log('Raw response:', text);
  30 |
> 31 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |
  33 |     const data = JSON.parse(text);
  34 |     expect(data.id).toBe(movie_id);
  35 |     expect(data.title).toBe(expected_title);
  36 |
  37 |     console.log(`✅ ${data.title} 조회 완료`);
  38 |   });
  39 | }
```