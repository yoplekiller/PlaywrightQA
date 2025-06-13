# Test info

- Name: TMDB API 파라미터 검증 >> 필수 파라미터 검증
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_param_validation.spec.ts:12:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_param_validation.spec.ts:16:35
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
  11 | test.describe('TMDB API 파라미터 검증', () => {
  12 |     test('필수 파라미터 검증', async () => {
  13 |         const apiContext = await request.newContext({ baseURL: BASE_URL });
  14 |         const response = await apiContext.get(`3/movie/popular?language=ko-KR&page=1`);
  15 |
> 16 |         expect(response.status()).toBe(400);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  17 |         const body = await response.json();
  18 |         expect(body).toHaveProperty('status_code');
  19 |         expect(body.status_code).toBe(7);
  20 |
  21 |     })
  22 | });
```