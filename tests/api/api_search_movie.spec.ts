import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as XLSX from 'xlsx';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY environment variable is not set.');
}


interface MovieTestCase {
  movie_id: number;
  expectedTitle: string;
  expectedReleaseDate?: string;
  expectedVoteAverage?: number;
  // expectedOverview?: string;
}

function excelDataToISO(dataSerial: number): string {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // 엑셀 날짜 시작점
  const date = new Date(excelEpoch.getTime() + (dataSerial * 24 * 60 * 60 * 1000));
  return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
}

// 1. 엑셀에서 테스트케이스 로드
const workbook = XLSX.readFile('tests/data/api_movie.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const movieCases: MovieTestCase[] = XLSX.utils.sheet_to_json(sheet);

test.describe('🎬 영화 상세정보 API 테스트( Dark Night는 잘못된 ID값)', () => {
  let apiContext: APIRequestContext;

  // 2. 공통 API context 생성
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({ baseURL: BASE_URL });
  });

  // Filter out cases with undefined or invalid movie_id to avoid duplicate/invalid test titles
  const validMovieCases = movieCases.filter(
    (movie, idx, arr) =>
      typeof movie.movie_id === 'number' &&
      !isNaN(movie.movie_id) &&
      arr.findIndex(m => m.movie_id === movie.movie_id && (m.expectedTitle || 'Unknown') === (movie.expectedTitle || 'Unknown')) === idx
  );
  
  
  for (const movie of validMovieCases) {
    const title = movie.expectedTitle || 'Unknown';
  
    test(`🔍 영화 ID ${movie.movie_id} - "${title}" 상세 정보 검증`, async () => {
      const res = await apiContext.get(`3/movie/${movie.movie_id}?api_key=${ API_KEY }&language=ko-US`);
     
      expect(res.status()).toBe(200);

      console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id}`);
  
      const data = await res.json();
      expect(data.id).toBe(movie.movie_id);
      expect(data.original_title).toBe(title);
  
      if (movie.expectedReleaseDate) {
        const expectedDate = 
          typeof movie.expectedReleaseDate === 'string'
            ? movie.expectedReleaseDate.replace(/^"|"$/g, '') // Remove quotes if present
            : excelDataToISO(movie.expectedReleaseDate);
        expect(data.release_date).toBe(expectedDate);
      }

      if (movie.expectedVoteAverage !== undefined) {
        expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
      }
  
      // if (movie.expectedOverview) {
      //   expect(data.overview).toContain(movie.expectedOverview);
      // }

      console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
    });
  }
});
