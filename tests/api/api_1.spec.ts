import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as XLSX from 'xlsx';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY!;

interface MovieTestCase {
  movie_id: number;
  expectedTitle: string;
  expectedReleaseDate?: string;
  expectedVoteAverage?: number;
  expectedOverview?: string;
}

// 1. 엑셀에서 테스트케이스 로드
const workbook = XLSX.readFile('tests/data/api_movie.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const movieCases: MovieTestCase[] = XLSX.utils.sheet_to_json(sheet);

test.describe('🎬 영화 상세정보 API 테스트', () => {
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
      const res = await apiContext.get(`/movie/${movie.movie_id}?api_key=${API_KEY}`);
     
      expect(res.status()).toBe(200);

      console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id}`);
  
      const data = await res.json();
      expect(data.id).toBe(movie.movie_id);
      expect(data.title).toBe(title);
  
      if (movie.expectedReleaseDate) {
        expect(data.release_date).toBe(movie.expectedReleaseDate);
      }
  
      if (movie.expectedVoteAverage !== undefined) {
        expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
      }
  
      if (movie.expectedOverview) {
        expect(data.overview).toContain(movie.expectedOverview);
      }
  
      console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
      
    });
  }
});
