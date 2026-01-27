import { test, expect, request, APIRequestContext } from '@playwright/test';
import ExcelJS from 'exceljs';
import dotenv from 'dotenv';
import { ApiClient } from '../../utils/api_client';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY;

//  TMDB_API_KEY 환경 변수가 설정되지 않은 경우 오류 발생
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
async function loadMovieCases(): Promise<MovieTestCase[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('tests/data/api_movie.xlsx');
  const worksheet = workbook.worksheets[0];

  const movieCases: MovieTestCase[] = [];
  const headers: string[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => {
        headers.push(cell.value?.toString() ?? '');
      });
    } else {
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) {
          rowData[header] = cell.value;
        }
      });
      movieCases.push({
        movie_id: Number(rowData.movie_id),
        expectedTitle: rowData.expectedTitle?.toString() ?? '',
        expectedReleaseDate: rowData.expectedReleaseDate?.toString(),
        expectedVoteAverage: rowData.expectedVoteAverage ? Number(rowData.expectedVoteAverage) : undefined,
      });
    }
  });

  return movieCases;
}

let movieCases: MovieTestCase[] = [];

test.describe('🎬 영화 상세정보 API 테스트( Dark Night는 잘못된 ID값)', () => {
  let apiContext: APIRequestContext;

  // 2. 공통 API context 생성 및 엑셀 데이터 로드
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({ baseURL: BASE_URL });
    movieCases = await loadMovieCases();
  });

  test('🔍 영화 상세 정보 검증 (Excel 기반)', async () => {
    // Filter out cases with undefined or invalid movie_id
    const validMovieCases = movieCases.filter(
      (movie, idx, arr) =>
        typeof movie.movie_id === 'number' &&
        !isNaN(movie.movie_id) &&
        arr.findIndex(m => m.movie_id === movie.movie_id && (m.expectedTitle || 'Unknown') === (movie.expectedTitle || 'Unknown')) === idx
    );

    for (const movie of validMovieCases) {
      const title = movie.expectedTitle || 'Unknown';
      console.log(`🎬 테스트 대상 movie_id: ${movie.movie_id} - "${title}"`);

      const res = await apiContext.get(`3/movie/${movie.movie_id}?api_key=${API_KEY}&language=ko-US`);
      expect(res.status()).toBe(200);

      const data = await res.json();
      expect(data.id).toBe(movie.movie_id);
      expect(data.original_title).toBe(title);

      if (movie.expectedReleaseDate) {
        const expectedDate =
          typeof movie.expectedReleaseDate === 'string'
            ? movie.expectedReleaseDate.replace(/^"|"$/g, '') // Remove quotes if present
            : excelDataToISO(Number(movie.expectedReleaseDate));
        expect(data.release_date).toBe(expectedDate);
      }

      if (movie.expectedVoteAverage !== undefined) {
        expect(data.vote_average).toBeCloseTo(movie.expectedVoteAverage, 1);
      }

      console.log(`✅ [${data.id}] ${data.title} 검증 성공`);
    }
  });
});
