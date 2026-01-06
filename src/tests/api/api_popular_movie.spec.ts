import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import * as allure from 'allure-js-commons';
dotenv.config();


const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY 환경 변수가 설정되지 않았습니다.');
}



test.describe('🎬 TMDB 영화 API 테스트', () => {

  test('인기 영화 목록 조회 - 200 응답 및 결과 확인', async () => {
    allure.label('feature', 'API');
    allure.label('story', '영화 목록 조회');
    allure.description('TMDB API를 활용한 영화 목록 조회 테스트');
    allure.epic('TMDB API 테스트');

    const apiContext = await request.newContext({ baseURL: BASE_URL });

    const response = await apiContext.get(`3/movie/popular?api_key=${API_KEY}`);
    const status = response.status();
    const body = await response.json();

    // 테스트 검증
    expect(status).toBe(200);
    expect(body).toHaveProperty('results');
    expect(Array.isArray(body.results)).toBe(true);
    expect(body.results.length).toBeGreaterThan(0);

    // 핵심 정보만 로깅
    console.log(`🎉 인기 영화 ${body.results.length}건 조회됨 - 첫 번째 영화: ${body.results[0].title}`);

    // Allure 리포트에 응답 데이터 첨부
    allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');

  });
});
