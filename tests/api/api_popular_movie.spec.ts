// tests/api/test_popular_movies.spec.ts
import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

test('🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인', async () => {
  const apiContext = await request.newContext({
    baseURL: BASE_URL,
  });

  const response = await apiContext.get(`/movie/popular?api_key=${API_KEY}`);
  expect(response.status()).toBe(200);

  const data = await response.json();

  // 응답 구조 확인
  expect(data).toHaveProperty('results');
  expect(Array.isArray(data.results)).toBeTruthy();
  expect(data.results.length).toBeGreaterThan(0);

  // 실패 시 디버깅용 출력
  console.log(`✅ 인기 영화 ${data.results.length}개 조회됨`);
});
