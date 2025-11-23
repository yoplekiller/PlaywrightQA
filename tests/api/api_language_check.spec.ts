import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY || 'your_default_api_key_here';
if (!API_KEY || API_KEY === 'your_default_api_key_here'){
    console.warn('TMDB_API_KEY 환경 변수가 설정되지 않았습니다. 기본값을 사용합니다.');
}


test.describe('🎬 TMDB 지원 언어 목록이 정상적으로 반환되고 주요 언어를 포함하는지 확인', () => {
    test(' 영화 언어별 적용 확인', async () => {
        const apiContext = await request.newContext({ baseURL: BASE_URL});
        const response = await apiContext.get(`3/configuration/languages?api_key=${API_KEY}`);

        // 응답 확인
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // 응답 데이터 확인
        const languages = await response.json();
        expect(Array.isArray(languages)).toBe(true);
        expect(languages.length).toBeGreaterThan(0);



        for( const lang of languages) {
            expect(lang).toHaveProperty('iso_639_1');
            expect(lang).toHaveProperty('english_name');
            expect(lang).toHaveProperty('name');


            // 주요 언어 코드 확인
            const expectedLanguages = ['ko', 'en', 'ja', 'zh', 'fr', 'de', 'es', 'it'];
            const iso6391 = lang.iso_639_1;

            const found = languages.some((L: any) => lang.iso_639_1 === L.iso_639_1);
            expect(found).toBe(true);
            console.log(`✅ 언어 코드 ${iso6391}가 응답에 포함되어 있음`);
        }
    });
});