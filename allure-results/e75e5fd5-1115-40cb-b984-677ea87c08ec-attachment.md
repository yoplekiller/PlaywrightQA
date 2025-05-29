# Test info

- Name: 🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:3:5

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
   3 | test('🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환', async () => {
   4 |   const apiContext = await request.newContext();
   5 |
   6 |   const response = await apiContext.post('https://reqres.in/api/login', {
   7 |     headers: {
   8 |       'Content-Type': 'application/json'
   9 |     },
  10 |     body: JSON.stringify({
  11 |       email: 'eve.holt@reqres.in',
  12 |       password: 'cityslicka'
  13 |     })
  14 |   });
  15 |
  16 |   const status = response.status();
  17 |   console.log('🔁 응답 상태 코드:', status);
  18 |   const data = await response.json();
  19 |   console.log('✅ 응답 데이터:', data);
  20 |
> 21 |   expect(status).toBe(200);
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  22 |   expect(data).toHaveProperty('token');
  23 | });
  24 | test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환', async () => {
  25 |   const apiContext = await request.newContext();
  26 |
  27 |   const response = await apiContext.post('https://reqres.in/api/login', {
  28 |     headers: {
  29 |       'Content-Type': 'application/json'
  30 |     },
  31 |     body: JSON.stringify({
  32 |       email: 'peter@klaven'
  33 |       // password 필드가 없음
  34 |     })
  35 |   });
  36 |
  37 |   const status = response.status();
  38 |   console.log('🔁 응답 상태 코드:', status);
  39 |   const data = await response.json();
  40 |   console.log('✅ 응답 데이터:', data);
  41 |
  42 |   expect(status).toBe(400);
  43 |   expect(data).toHaveProperty('error', 'Missing password');
  44 | });
  45 | test('🔐 [POST] 로그인 시 잘못된 이메일 형식으로 400 응답', async () => {
  46 |   const apiContext = await request.newContext();
  47 |
  48 |   const response = await apiContext.post('https://reqres.in/api/login', {
  49 |     headers: {
  50 |       'Content-Type': 'application/json'
  51 |     },
  52 |     body: JSON.stringify({
  53 |       email: 'invalid-email-format',
  54 |       password: 'cityslicka'
  55 |     })
  56 |   });
  57 |
  58 |   const status = response.status();
  59 |   console.log('🔁 응답 상태 코드:', status);
  60 |   const data = await response.json();
  61 |   console.log('✅ 응답 데이터:', data);
  62 |
  63 |   expect(status).toBe(400);
  64 |   expect(data).toHaveProperty('error', 'Invalid email format');
  65 | });
```