# Test info

- Name: 🎬 영화 상세정보 API 테스트 >> 🔍 영화 ID 157336 - "Interstellar" 상세 정보 검증
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:43:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:46:28
```

# Test source

```ts
   1 | import { test, expect, request, APIRequestContext } from '@playwright/test';
   2 | import * as XLSX from 'xlsx';
   3 | import dotenv from 'dotenv';
   4 |
   5 | dotenv.config();
   6 |
   7 | const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
   8 | const API_KEY = process.env.TMDB_API_KEY!;
   9 |
  10 | interface MovieTestCase {
  11 |   movie_id: number;
  12 |   expectedTitle: string;
  13 |   expectedReleaseDate?: string;
  14 |   expectedVoteAverage?: number;
  15 |   expectedOverview?: string;
  16 | }
  17 |
  18 | // 1. 엑셀에서 테스트케이스 로드
  19 | const workbook = XLSX.readFile('tests/data/api_movie.xlsx');
  20 | const sheet = workbook.Sheets[workbook.SheetNames[0]];
  21 | const movieCases: MovieTestCase[] = XLSX.utils.sheet_to_json(sheet);
  22 |
  23 | test.describe('🎬 영화 상세정보 API 테스트', () => {
  24 |   let apiContext: APIRequestContext;
  25 |
  26 |   // 2. 공통 API context 생성
  27 |   test.beforeAll(async ({ playwright }) => {
  28 |     apiContext = await request.newContext({ baseURL: BASE_URL });
  29 |   });
  30 |
  31 |   // Filter out cases with undefined or invalid movie_id to avoid duplicate/invalid test titles
  32 |   const validMovieCases = movieCases.filter(
  33 |     (movie, idx, arr) =>
  34 |       typeof movie.movie_id === 'number' &&
  35 |       !isNaN(movie.movie_id) &&
  36 |       arr.findIndex(m => m.movie_id === movie.movie_id && (m.expectedTitle || 'Unknown') === (movie.expectedTitle || 'Unknown')) === idx
  37 |   );
  38 |   
  39 |   
  40 |   for (const movie of validMovieCases) {
  41 |     const title = movie.expectedTitle || 'Unknown';
  42 |   
  43 |     test(`🔍 영화 ID ${movie.movie_id} - "${title}" 상세 정보 검증`, async () => {
  44 |       const res = await apiContext.get(`/movie/${movie.movie_id}?api_key=${API_KEY}`);
  45 |      
> 46 |       expect(res.status()).toBe(200);
     |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  47 |
  48 |       console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id}`);
  49 |   
  50 |       const data = await res.json();
  51 |       expect(data.id).toBe(movie.movie_id);
  52 |       expect(data.title).toBe(title);
  53 |   
  54 |       if (movie.expectedReleaseDate) {
  55 |         expect(data.release_date).toBe(movie.expectedReleaseDate);
  56 |       }
  57 |   
  58 |       if (movie.expectedVoteAverage !== undefined) {
  59 |         expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
  60 |       }
  61 |   
  62 |       if (movie.expectedOverview) {
  63 |         expect(data.overview).toContain(movie.expectedOverview);
  64 |       }
  65 |   
  66 |       console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
  67 |       
  68 |     });
  69 |   }
  70 | });
  71 |
```