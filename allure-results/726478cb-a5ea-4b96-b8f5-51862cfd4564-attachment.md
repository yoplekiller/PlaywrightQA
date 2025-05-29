# Test info

- Name: 🎬 영화 상세정보 API 테스트 >> 🔍 영화 ID 157336 - "인터스텔라" 상세 정보 검증
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:47:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "\"2014-11-05\""
Received: "2014-11-05"
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:59:35
```

# Test source

```ts
   1 | import { test, expect, request, APIRequestContext } from '@playwright/test';
   2 | import * as XLSX from 'xlsx';
   3 | import dotenv from 'dotenv';
   4 |
   5 | dotenv.config();
   6 |
   7 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
   8 | const API_KEY = process.env.TMDB_API_KEY;
   9 | if (!API_KEY) {
  10 |   throw new Error('TMDB_API_KEY environment variable is not set.');
  11 | }
  12 |
  13 |
  14 | interface MovieTestCase {
  15 |   movie_id: number;
  16 |   expectedTitle: string;
  17 |   expectedReleaseDate?: string;
  18 |   expectedVoteAverage?: number;
  19 |   expectedOverview?: string;
  20 | }
  21 |
  22 | // 1. 엑셀에서 테스트케이스 로드
  23 | const workbook = XLSX.readFile('tests/data/api_movie.xlsx');
  24 | const sheet = workbook.Sheets[workbook.SheetNames[0]];
  25 | const movieCases: MovieTestCase[] = XLSX.utils.sheet_to_json(sheet);
  26 |
  27 | test.describe('🎬 영화 상세정보 API 테스트', () => {
  28 |   let apiContext: APIRequestContext;
  29 |
  30 |   // 2. 공통 API context 생성
  31 |   test.beforeAll(async ({ playwright }) => {
  32 |     apiContext = await request.newContext({ baseURL: BASE_URL });
  33 |   });
  34 |
  35 |   // Filter out cases with undefined or invalid movie_id to avoid duplicate/invalid test titles
  36 |   const validMovieCases = movieCases.filter(
  37 |     (movie, idx, arr) =>
  38 |       typeof movie.movie_id === 'number' &&
  39 |       !isNaN(movie.movie_id) &&
  40 |       arr.findIndex(m => m.movie_id === movie.movie_id && (m.expectedTitle || 'Unknown') === (movie.expectedTitle || 'Unknown')) === idx
  41 |   );
  42 |   
  43 |   
  44 |   for (const movie of validMovieCases) {
  45 |     const title = movie.expectedTitle || 'Unknown';
  46 |   
  47 |     test(`🔍 영화 ID ${movie.movie_id} - "${title}" 상세 정보 검증`, async () => {
  48 |       const res = await apiContext.get(`3/movie/${movie.movie_id}?api_key=${ API_KEY }&language=ko-US`);
  49 |      
  50 |       expect(res.status()).toBe(200);
  51 |
  52 |       console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id}`);
  53 |   
  54 |       const data = await res.json();
  55 |       expect(data.id).toBe(movie.movie_id);
  56 |       expect(data.title).toBe(title);
  57 |   
  58 |       if (movie.expectedReleaseDate) {
> 59 |         expect(data.release_date).toBe(movie.expectedReleaseDate);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  60 |       }
  61 |   
  62 |       if (movie.expectedVoteAverage !== undefined) {
  63 |         expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
  64 |       }
  65 |   
  66 |       if (movie.expectedOverview) {
  67 |         expect(data.overview).toContain(movie.expectedOverview);
  68 |       }
  69 |   
  70 |       console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
  71 |       
  72 |     });
  73 |   }
  74 | });
  75 |
```