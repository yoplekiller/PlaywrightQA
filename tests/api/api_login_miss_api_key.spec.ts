import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환',async()=>{
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

})