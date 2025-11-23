import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY || 'your_api_key_here';
if (!process.env.TMDB_API_KEY){
    console.warn('TMDB_API_KEY 환경 변수가 설정되지 않았습니다. 기본값을 사용합니다.');
}
test.describe('TMDB API 응답 스키마 검증', () => {
    test('응답 스키마가 예상과 일치하는지 확인', async () => {
        const apiContext = await request.newContext({ baseURL: BASE_URL });
        const response = await apiContext.get(`3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
        
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        expect(body).toHaveProperty('page');
        expect(body).toHaveProperty('results');
        expect(Array.isArray(body.results)).toBe(true);
        expect(body).toHaveProperty('total_results');
        expect(body).toHaveProperty('total_pages');

        // 각 영화 객체의 필수 속성 검증
        body.results.forEach(movie => {
            expect(movie).toHaveProperty('id');
            expect(movie).toHaveProperty('title');
            expect(movie).toHaveProperty('vote_average');
            expect(movie).toHaveProperty('release_date');
            expect(movie).toHaveProperty('overview');
            expect(movie).toHaveProperty('poster_path');
        });
        // 첫 번째 영화의 속성 검증
        expect(body.results.length).toBeGreaterThan(0); 
        const firstMovie = body.results[0];
        expect(firstMovie).toHaveProperty('id');
        expect(firstMovie).toHaveProperty('title');
        expect(firstMovie).toHaveProperty('vote_average');
        expect(firstMovie).toHaveProperty('release_date');
        expect(firstMovie).toHaveProperty('overview');
        expect(firstMovie).toHaveProperty('poster_path');
    });
});
