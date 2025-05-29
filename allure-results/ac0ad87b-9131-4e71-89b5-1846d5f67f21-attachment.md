# Test info

- Name: 🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_search.spec.ts:10:5

# Error details

```
SyntaxError: Unexpected token '<', "<html>
<h"... is not valid JSON
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_movie_search.spec.ts:16:16
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
  17 |   // 💬 테스트 설명 추가
  18 |   allure.description('TMDB API를 통해 인기 영화 목록을 조회하고 응답 상태 및 결과 리스트를 검증합니다.');
  19 |   allure.label('severity', 'blocker'); // 중요도 레이블 추가
  20 |   allure.label('epic', 'TMDB API'); // 에픽 레이블 추가
  21 |   allure.label('feature', '영화 목록 조회'); // 기능 레이블 추가
  22 |   allure.label('story', '인기 영화 목록 조회'); // 스토리 레이블 추가
  23 |   allure.label('tag', 'api'); // 태그 레이블 추가
  24 |   allure.label('testType', 'API'); // 테스트 유형 레이블 추가
  25 |   allure.label('testId', 'TMDB-001'); // 테스트 ID 레이블 추가
  26 |   allure.label('testName', '인기 영화 목록 조회'); // 테스트 이름 레이블 추가
  27 |   allure.label('testDescription', 'TMDB API를 통해 인기 영화 목록을 조회하고 응답 상태 및 결과 리스트를 검증합니다.'); // 테스트 설명 레이블 추가
  28 |   
  29 |
  30 |   // ✅ 테스트 검증
  31 |   expect(status).toBe(200);
  32 |   expect(data).toHaveProperty('results');
  33 |   expect(Array.isArray(data.results)).toBe(true);
  34 |   expect(data.results.length).toBeGreaterThan(0);
  35 |
  36 |   // ✅ Allure 첨부
  37 |   allure.attachment('인기 영화 목록 응답', JSON.stringify(data, null, 2), 'application/json');
  38 |
  39 |   // ✅ 결과 콘솔 출력
  40 |   console.log(`🎉 인기 영화 ${data.results.length}건 조회됨`);
  41 | });
  42 |
```