import { test, expect, request } from '@playwright/test';

// ✅ 성공 케이스
test('🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://reqres.in/api/login', {
    headers: { 'Content-Type': 'application/json' },
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

// ✅ 실패 케이스 (password 누락)
test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://reqres.in/api/login', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: 'eve.holt@reqres.in'
      // password 누락
    }
  });

  const status = response.status();
  const data = await response.json();

  console.log('🔁 응답 상태 코드:', status);
  console.log('✅ 응답 데이터:', data);

  expect(status).toBe(400);
  expect(data).toHaveProperty('error', 'Missing password');
});

// ❌ 이메일 형식 검증은 지원하지 않음
test.skip('🔐 [POST] 로그인 시 잘못된 이메일 형식으로 400 응답', async () => {
  // reqres는 이메일 형식 검사를 하지 않음
});
