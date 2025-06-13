import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/';
const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY 환경 변수가 설정되지 않았습니다.');
}
