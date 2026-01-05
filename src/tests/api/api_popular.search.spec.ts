import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api,themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY!;


test('✅ 인기 영화 응답 검증 및 평점 필터링', async()=> {

    const apiContext = await request.newContext({ baseURL: BASE_URL });
    const endpoint = '3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1';

    const response = await apiContext.get(endpoint);
    const status = response.status();
    const contestType = response.headers()['content-type']

    const data = await response.json();
    console.log(data.results);
    
    const hasHighRateMovie = data.results.some((movie) => movie.vote_average >= 7);
    console.log('평점 7이상 존재 여부:', hasHighRateMovie);
    expect(data.results.length).toBeGreaterThan(0);

    expect(status).toBe(200);


});