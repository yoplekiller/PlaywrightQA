import {test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('🔐 로그인 API 테스트', () => {
test('[POST] 비밀번호 누락으로 인한 로그인 실패 테스트', async() =>{
    const apiContext = await request.newContext(
        {
            baseURL: 'https://reqres.in',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'x-api-key': 'reqres-free-v1'  // ✅ API 키
            }
        }
    );

    const response = await apiContext.post('/api/login', {
    data: {
      email: 'eve.holt@reqres.in',
      //password:  // 비밀번호 누락
    }
  });


    const status = response.status();
    const data = await response.json();
    console.log('🔁 응답 상태 코드:', status);
    console.log('✅ 응답 데이터:', data);

    expect(status).toBe(400);
    expect(data).toHaveProperty('error','Missing password');
    expect(data.error).toBe('Missing password');
            expect(data).toEqual({
                error: 'Missing password'
            });
    });
});