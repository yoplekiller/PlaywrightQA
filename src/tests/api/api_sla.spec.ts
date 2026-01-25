import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = process.env.CI === 'true';
const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';

const API_KEY = process.env.API_KEY || '';
const SLA_SECONDS = 3;
const SLA_MILLISECONDS = SLA_SECONDS * 1000;

const endpoints = [
    `/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`,
    `/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
];

test.describe('🎬 영화 페이지 SLA 응답 시간 테스트', () => {
    for (const endpoint of endpoints) {
        test(`🔄 ${endpoint} 응답 시간 확인`, async ({ request }) => {
            const start = Date.now();
            const response = await request.get(`${BASE_URL}${endpoint}`);
            const elapsed = (Date.now() - start) / 1000;

            console.log(`📡 요청 주소: ${BASE_URL}${endpoint}`);
            console.log(`⏱️ 응답 시간: ${elapsed.toFixed(3)}초`);
            console.log(`✅ 응답 상태: ${response.status()}`);

            expect(response.status()).toBe(401);
            expect(elapsed).toBeLessThanOrEqual(SLA_SECONDS);
        });
    }
});
