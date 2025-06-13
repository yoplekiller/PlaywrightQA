import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY 환경 변수가 설정되지 않았습니다.');
}

test.describe('TMDB API 파라미터 검증', () => {
    test('필수 파라미터 검증', async () => {
        const apiContext = await request.newContext({ baseURL: BASE_URL });
        const response = await apiContext.get(`3/movie/popular?language=ko-KR&page=1`);

        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body).toHaveProperty('status_code');
        expect(body.status_code).toBe(7);

    })
});