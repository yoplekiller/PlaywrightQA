import { test, expect, request } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config();

const isCI = process.env.CI === 'true';
const BASE_URL = isCI
  ? 'https://api.themoviedb.org/3'
  : 'http://localhost:3000';
  
const API_KEY = process.env.TMDB_API_KEY!;

test('🎬 인기 영화 목록 조회 → 응답 200 및 결과 리스트 확인', async () => {
  const apiContext = await request.newContext({ baseURL: BASE_URL });

  const endpoint = `3/movie/popular?api_key=${API_KEY}`;
  const response = await apiContext.get(endpoint);
  const status = response.status();
  const data = await response.json();

  // ✅ 테스트 검증
  expect(status).toBe(200);
  expect(data).toHaveProperty('results');
  expect(Array.isArray(data.results)).toBe(true);
  expect(data.results.length).toBeGreaterThan(0);

  // ✅ Allure 첨부
  allure.attachment('인기 영화 목록 응답', JSON.stringify(data, null, 2), 'application/json');

  // ✅ 결과 콘솔 출력
  console.log(`🎉 인기 영화 ${data.results.length}건 조회됨`);
});
