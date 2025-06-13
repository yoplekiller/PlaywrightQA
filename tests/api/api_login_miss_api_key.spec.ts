import {test, expect, request} from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config();

test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환',async()=>{
    allure.label('feature', 'API');
    allure.label('story', '로그인 실패 테스트');
    allure.description('로그인 API 호출 시 API 키가 누락된 경우의 실패 테스트');
    const apiContext = await request.newContext();

    const response = await apiContext.post('https://reqres.in/api/login',{
        headers: {'Content-Type': 'application/json'},
        data: {
            email:'eve.holt@reqres.in',
            password: 'cityslicka'

        }
    });

    const status = response.status();
    const data = await response.json();

    console.log('🔁 응답 상태 코드:', status);
    console.log('✅ 응답 데이터:', data);

    expect(status).toBe(401);
    expect(data).toHaveProperty('error', 'Missing API key.');

    allure.attachment('응답 JSON', JSON.stringify(data, null, 2), 'application/json');
    allure.attachment('요청 URL', response.url(), 'text/plain');

})