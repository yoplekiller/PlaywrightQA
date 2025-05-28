# Test info

- Name: 🎬 영화 상세정보 API 테스트 >> 🔍 영화 ID 157336 - "Interstellar" 상세 정보 검증
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:53:9

# Error details

```
Error: expect(세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 나사 소속 우주비행사였던 쿠퍼는 지구에 몰아친 식량난으로 옥수수나 키우며 살고 있다. 거센 황사가 몰아친 어느 날 알 수 없는 힘에 이끌려 딸과 함께 도착한 곳은 인류가 이주할 행성을 찾는 나사의 비밀본부. 이 때 시공간에 불가사의한 틈이 열리고, 이 곳을 탐험해 인류를 구해야 하는 임무를 위해 쿠퍼는 만류하는 딸을 뒤로한 채 우주선에 탑승하는데...).toContain(123) // indexOf

Matcher error: expected value must be a string if received value is a string

Expected has type:  number
Expected has value: 123
Received has type:  string
Received has value: "세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 나사 소속 우주비행사였던 쿠퍼는 지구에 몰아친 식량난으로 옥수수나 키우며 살고 있다. 거센 황사가 몰아친 어느 날 알 수 없는 힘에 이끌려 딸과 함께 도착한 곳은 인류가 이주할 행성을 찾는 나사의 비밀본부. 이 때 시공간에 불가사의한 틈이 열리고, 이 곳을 탐험해 인류를 구해야 하는 임무를 위해 쿠퍼는 만류하는 딸을 뒤로한 채 우주선에 탑승하는데..."
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_1.spec.ts:77:31
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
  22 | function excelDataToISO(dataSerial: number): string {
  23 |   const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // 엑셀 날짜 시작점
  24 |   const date = new Date(excelEpoch.getTime() + (dataSerial * 24 * 60 * 60 * 1000));
  25 |   return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
  26 | }
  27 |
  28 | // 1. 엑셀에서 테스트케이스 로드
  29 | const workbook = XLSX.readFile('tests/data/api_movie.xlsx');
  30 | const sheet = workbook.Sheets[workbook.SheetNames[0]];
  31 | const movieCases: MovieTestCase[] = XLSX.utils.sheet_to_json(sheet);
  32 |
  33 | test.describe('🎬 영화 상세정보 API 테스트', () => {
  34 |   let apiContext: APIRequestContext;
  35 |
  36 |   // 2. 공통 API context 생성
  37 |   test.beforeAll(async ({ playwright }) => {
  38 |     apiContext = await request.newContext({ baseURL: BASE_URL });
  39 |   });
  40 |
  41 |   // Filter out cases with undefined or invalid movie_id to avoid duplicate/invalid test titles
  42 |   const validMovieCases = movieCases.filter(
  43 |     (movie, idx, arr) =>
  44 |       typeof movie.movie_id === 'number' &&
  45 |       !isNaN(movie.movie_id) &&
  46 |       arr.findIndex(m => m.movie_id === movie.movie_id && (m.expectedTitle || 'Unknown') === (movie.expectedTitle || 'Unknown')) === idx
  47 |   );
  48 |   
  49 |   
  50 |   for (const movie of validMovieCases) {
  51 |     const title = movie.expectedTitle || 'Unknown';
  52 |   
  53 |     test(`🔍 영화 ID ${movie.movie_id} - "${title}" 상세 정보 검증`, async () => {
  54 |       const res = await apiContext.get(`3/movie/${movie.movie_id}?api_key=${ API_KEY }&language=ko-US`);
  55 |      
  56 |       expect(res.status()).toBe(200);
  57 |
  58 |       console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id}`);
  59 |   
  60 |       const data = await res.json();
  61 |       expect(data.id).toBe(movie.movie_id);
  62 |       expect(data.original_title).toBe(title);
  63 |   
  64 |       if (movie.expectedReleaseDate) {
  65 |         const expectedDate = 
  66 |           typeof movie.expectedReleaseDate === 'string'
  67 |             ? movie.expectedReleaseDate.replace(/^"|"$/g, '') // Remove quotes if present
  68 |             : excelDataToISO(movie.expectedReleaseDate);
  69 |         expect(data.release_date).toBe(expectedDate);
  70 |       }
  71 |
  72 |       if (movie.expectedVoteAverage !== undefined) {
  73 |         expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
  74 |       }
  75 |   
  76 |       if (movie.expectedOverview) {
> 77 |         expect(data.overview).toContain(movie.expectedOverview);
     |                               ^ Error: expect(세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 나사 소속 우주비행사였던 쿠퍼는 지구에 몰아친 식량난으로 옥수수나 키우며 살고 있다. 거센 황사가 몰아친 어느 날 알 수 없는 힘에 이끌려 딸과 함께 도착한 곳은 인류가 이주할 행성을 찾는 나사의 비밀본부. 이 때 시공간에 불가사의한 틈이 열리고, 이 곳을 탐험해 인류를 구해야 하는 임무를 위해 쿠퍼는 만류하는 딸을 뒤로한 채 우주선에 탑승하는데...).toContain(123) // indexOf
  78 |       }
  79 |
  80 |       console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
  81 |     });
  82 |   }
  83 | });
  84 |
```