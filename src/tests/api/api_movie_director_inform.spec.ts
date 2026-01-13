import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('TMDB API 영화 감독 정보 검증', () => {
    test('영화 감독 정보가 올바르게 반영되는지 검증', async() => {
        
        const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
        const API_KEY = process.env.TMDB_API_KEY;
        if (!API_KEY) {
        throw new Error('TMDB_API_KEY 환경 변수가 설정되지 않았습니다.');
        }

        const apiContext = await request.newContext({ baseURL: BASE_URL });
        const movieID = 550;
        // credits 엔드포인트로 요청
        const response = await apiContext.get(`3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`);

        expect(response.status()).toBe(200);
        const body = await response.json();

        
        expect(Array.isArray(body.crew)).toBe(true);

        const director = body.crew.find(member => member.job === 'Director');
        expect(director).toBeDefined();
        expect(director).toHaveProperty('name');
        expect(director.name).toBe('David Fincher'); // Fight Club의 감독 이름
    });
});