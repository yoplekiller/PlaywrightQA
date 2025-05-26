import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import { allure } from 'allure-playwright';
dotenv.config();


const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY!;


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

    // Allure 첨부 (응답 전문 JSON)
    allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');

    // 테스트 검증
    expect(status).toBe(200);
    expect(body).toHaveProperty('results');
    expect(Array.isArray(body.results)).toBe(true);
    expect(body.results.length).toBeGreaterThan(0);
    
    // 결과 콘솔 출력
    console.log(`🎉 인기 영화 ${body.results.length}건 조회됨`)
    console.log(`✅ 응답 상태 코드: ${status}`);
    console.log(`✅ 응답 데이터 타입: ${typeof body}`);
    console.log(`✅ 응답 데이터: ${JSON.stringify(body, null, 2)}`);
    console.log(`✅ 응답 데이터 길이: ${body.results.length}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 제목: ${body.results[0].title}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 ID: ${body.results[0].id}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 포스터 경로: ${body.results[0].poster_path}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 개봉일: ${body.results[0].release_date}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 평점: ${body.results[0].vote_average}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 개요: ${body.results[0].overview}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 언어: ${body.results[0].original_language}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 장르: ${body.results[0].genre_ids}`);
    console.log(`✅ 응답 데이터 첫 번째 영화 포스터 URL: https://image.tmdb.org/t/p/w500${body.results[0].poster_path}`);
  
    

    // Allure 첨부 (응답 전문 JSON)
    allure.attachment('응답 JSON', JSON.stringify(body, null, 2), 'application/json');

  });
});