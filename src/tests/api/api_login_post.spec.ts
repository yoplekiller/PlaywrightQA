import { test, expect, request } from '@playwright/test';

test('🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1'  // ✅ API 키
    }
  });

  const response = await apiContext.post('/api/login', {
    data: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  });

  const status = response.status();
  const data = await response.json();

  console.log('🔁 응답 상태 코드:', status);
  console.log('✅ 응답 데이터:', data);

  expect(status).toBe(200);
  expect(data).toHaveProperty('token');
});