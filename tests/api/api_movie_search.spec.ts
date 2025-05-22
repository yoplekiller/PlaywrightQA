// // tests/api/test_movie_details.spec.ts
// import { test, expect, request } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();

// const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
// const API_KEY = process.env.TMDB_API_KEY;

// // 🎬 테스트 데이터
// const movieCases = [
//   { movie_id: 238, expected_title: "The Godfather" },
//   { movie_id: 550, expected_title: "Fight Club" },
//   { movie_id: 603, expected_title: "The Matrix" },
//   { movie_id: 157336, expected_title: "Interstellar" },
// ];

// for (const { movie_id, expected_title } of movieCases) {
//   test(`🎥 영화 ID ${movie_id} → "${expected_title}" 상세 조회`, async () => {
//     const apiContext = await request.newContext({
//       baseURL: BASE_URL,
//     });

//     const response = await apiContext.get(`/movie/${movie_id}?api_key=${API_KEY}`);
//     expect(response.status()).toBe(200);

//     const data = await response.json();
//     expect(data.id).toBe(movie_id);
//     expect(data.title).toBe(expected_title);

//     // 콘솔 출력 (선택적)
//     console.log(`✅ ${data.title} 조회 완료`);
//   });
// }
