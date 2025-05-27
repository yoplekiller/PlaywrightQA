import { test, expect, request } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';
dotenv.config();

const isCI = process.env.CI === 'true';
const BASE_URL = isCI
    ? 'https://api.themoviedb.org/3'
    : 'http://localhost:3000';

const API_KEY = process.env.API_KEY || '';
const SLA_SECONDS = 2;
const SLA_MILLISECONDS = SLA_SECONDS * 1000;

const endpoints = [
    '/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1',
    '/genre/movie/list?api_key=${API_KEY}&language=ko-KR',

];

test.describe('🎬 영화 페이지 SLA 응답 시간 테스트',()=>{
    for (const endpoint of endpoints){
        test(`🔄 ${endpoint} 응답 시간 확인`, async ({ request }) => {
             allure.label('feature', '영화 목록 API 테스트');
             allure.story('영화 페이지 SLA 응답 시간 테스트');
             allure.description('SLA 응답 시간 테스트: ${endpoint}');
             allure.severity('critical');
             allure.epic('API 응답 시간 검증');

             const start = Date.now();
             const response = await request.get('${BASE_URL}${endpoint}');
             const elapsed = (Date.now() -start)/1000; // 초 단위로 변환

             console.log(`📡 요청 주소: ${BASE_URL}${endpoint}`);
             console.log(`⏱️ 응답 시간: ${elapsed}초`);
             console.log(`✅ 응답 상태: ${response.status()}`);
            // console.log(`📄 응답 본문: ${await response.text()}`);

             expect(response.status()).toBe(200);
             expect(elapsed).toBeLessThanOrEqual(SLA_SECONDS);

        });
    }
});

