// import { test, expect, request } from '@playwright/test';
// import dotenv from 'dotenv';
// import { allure } from 'allure-playwright';
// dotenv.config();

// const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
// const API_KEY = process.env.TMDB_API_KEY!;

// test.describe('🎬 TMDB 영화 API 테스트', () => {
//   test('인기 영화 목록 조회 - 200 응답 및 결과 확인', async () => {
//     const apiContext = await request.newContext({ baseURL: BASE_URL });

//     const response = await apiContext.get(`/movie/popular?api_key=${API_KEY}`);
//     const status = response.status();
//     const body = await response.json();

//     // Allure 첨부 (응답 전문 JSON)
//     allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');

//     // 테스트 검증
//     expect(status).toBe(200);
//     expect(body).toHaveProperty('results');
//     expect(Array.isArray(body.results)).toBe(true);
//     expect(body.results.length).toBeGreaterThan(0);

//     console.log(`✅ 인기 영화 수: ${body.results.length}`);
//   });
// });
