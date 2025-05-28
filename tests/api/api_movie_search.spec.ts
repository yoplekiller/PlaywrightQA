import { test, expect, request } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY!;

test('🔍 TMDB API 디버깅 테스트', async () => {
  console.log("🌐 BASE_URL:", BASE_URL);
  console.log("🔑 API_KEY 존재 여부:", !!API_KEY);
  console.log("🔑 API_KEY 앞 6글자:", API_KEY?.slice(0, 6));

  const apiContext = await request.newContext({ baseURL: BASE_URL });
  const endpoint = `3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

  console.log("📡 최종 요청 URL:", BASE_URL + endpoint);
  const response = await apiContext.get(endpoint);
  const status = response.status();
  const contentType = response.headers()['content-type'];
  const rawBody = await response.text();

  console.log("✅ 상태 코드:", status);
  console.log("📦 Content-Type:", contentType);
  console.log("📄 응답 본문 앞 300자:\n", rawBody.slice(0, 300));

  expect(status).toBe(200); // 강제 실패 감지용
});
