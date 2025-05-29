# Test info

- Name: 🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:4:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:21:18
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | // ✅ 성공 케이스
   4 | test('🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환', async () => {
   5 |   const apiContext = await request.newContext();
   6 |
   7 |   const response = await apiContext.post('https://reqres.in/api/login', {
   8 |     headers: { 'Content-Type': 'application/json' },
   9 |     data: {
  10 |       email: 'eve.holt@reqres.in',
  11 |       password: 'cityslicka'
  12 |     }
  13 |   });
  14 |
  15 |   const status = response.status();
  16 |   const data = await response.json();
  17 |
  18 |   console.log('🔁 응답 상태 코드:', status);
  19 |   console.log('✅ 응답 데이터:', data);
  20 |
> 21 |   expect(status).toBe(200);
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  22 |   expect(data).toHaveProperty('token');
  23 | });
  24 |
  25 | // ✅ 실패 케이스 (password 누락)
  26 | test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환', async () => {
  27 |   const apiContext = await request.newContext();
  28 |
  29 |   const response = await apiContext.post('https://reqres.in/api/login', {
  30 |     headers: { 'Content-Type': 'application/json' },
  31 |     data: {
  32 |       email: 'eve.holt@reqres.in'
  33 |       // password 누락
  34 |     }
  35 |   });
  36 |
  37 |   const status = response.status();
  38 |   const data = await response.json();
  39 |
  40 |   console.log('🔁 응답 상태 코드:', status);
  41 |   console.log('✅ 응답 데이터:', data);
  42 |
  43 |   expect(status).toBe(401);
  44 |   expect(data).toHaveProperty('error', 'Missing password');
  45 | });
  46 |
  47 | // ❌ 이메일 형식 검증은 지원하지 않음
  48 | test.skip('🔐 [POST] 로그인 시 잘못된 이메일 형식으로 400 응답', async () => {
  49 |   // reqres는 이메일 형식 검사를 하지 않음
  50 | });
  51 |
```