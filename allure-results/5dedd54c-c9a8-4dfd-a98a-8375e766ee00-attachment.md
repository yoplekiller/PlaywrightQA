# Test info

- Name: TMDB API 영화 감독 정보 검증 >> 영화 감독 정보가 올바르게 반영되는지 검증
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_director_inform.spec.ts:12:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "David Fincher"
Received: "데이비드 핀처"
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_director_inform.spec.ts:26:31
```

# Test source

```ts
   1 | import {test, expect, request} from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 | dotenv.config();
   4 |
   5 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
   6 | const API_KEY = process.env.TMDB_API_KEY;
   7 | if (!API_KEY) {
   8 |   throw new Error('TMDB_API_KEY 환경 변수가 설정되지 않았습니다.');
   9 | }
  10 |
  11 | test.describe('TMDB API 영화 감독 정보 검증', () => {
  12 |     test('영화 감독 정보가 올바르게 반영되는지 검증', async() => {
  13 |         const apiContext = await request.newContext({ baseURL: BASE_URL });
  14 |         const movieID = 550;
  15 |         // credits 엔드포인트로 요청
  16 |         const response = await apiContext.get(`3/movie/${movieID}/credits?api_key=${API_KEY}&language=ko-KR`);
  17 |
  18 |         expect(response.status()).toBe(200);
  19 |         const body = await response.json();
  20 |
  21 |         expect(Array.isArray(body.crew)).toBe(true);
  22 |
  23 |         const director = body.crew.find(member => member.job === 'Director');
  24 |         expect(director).toBeDefined();
  25 |         expect(director).toHaveProperty('name');
> 26 |         expect(director.name).toBe('David Fincher'); // Fight Club의 감독 이름
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  27 |     });
  28 | });
```