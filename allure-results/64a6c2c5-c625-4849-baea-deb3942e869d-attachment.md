# Test info

- Name: 🔐 [POST] 로그인 시 잘못된 이메일 형식으로 400 응답
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:48:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:66:18
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 | // 로그인 API 테스트
   3 | // reqres.in은 테스트용으로 공개된 API로, 로그인 기능을 제공
   4 |
   5 | test('🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환', async () => {
   6 |   const apiContext = await request.newContext();
   7 |
   8 |   const response = await apiContext.post('https://reqres.in/api/login', {
   9 |     headers: {
  10 |       'Content-Type': 'application/json',
  11 |        'x-api-key': 'reqres-free-v1'
  12 |     },
  13 |     json: { // ✅ body → json
  14 |       username: 'kminchelle',
  15 |       password: '0lelplR'
  16 |     }
  17 |   });
  18 |
  19 |   const status = response.status();
  20 |   console.log('🔁 응답 상태 코드:', status);
  21 |   const data = await response.json();
  22 |   console.log('✅ 응답 데이터:', data);
  23 |
  24 |   expect(status).toBe(200);
  25 |   expect(data).toHaveProperty('token');
  26 | });
  27 | test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환', async () => {
  28 |   const apiContext = await request.newContext();
  29 |
  30 |   const response = await apiContext.post('https://reqres.in/api/login', {
  31 |     headers: {
  32 |       'Content-Type': 'application/json'
  33 |     },
  34 |     json: { // ✅ body → json
  35 |       username: 'kminchelle',
  36 |       password: ""
  37 |     }
  38 |   });
  39 |
  40 |   const status = response.status();
  41 |   console.log('🔁 응답 상태 코드:', status);
  42 |   const data = await response.json();
  43 |   console.log('✅ 응답 데이터:', data);
  44 |
  45 |   expect(status).toBe(401);
  46 |   expect(data).toHaveProperty('error', 'Missing password');
  47 | });
  48 | test('🔐 [POST] 로그인 시 잘못된 이메일 형식으로 400 응답', async () => {
  49 |   const apiContext = await request.newContext();
  50 |
  51 |   const response = await apiContext.post('https://reqres.in/api/login', {
  52 |     headers: {
  53 |       'Content-Type': 'application/json'
  54 |     },
  55 |     body: JSON.stringify({
  56 |       email: 'invalid-email-format',
  57 |       password: 'cityslicka'
  58 |     })
  59 |   });
  60 |
  61 |   const status = response.status();
  62 |   console.log('🔁 응답 상태 코드:', status);
  63 |   const data = await response.json();
  64 |   console.log('✅ 응답 데이터:', data);
  65 |
> 66 |   expect(status).toBe(400);
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  67 |   expect(data).toHaveProperty('error', 'Invalid email format');
  68 | }); 
  69 | // Compare this snippet from tests/api/api_movie_search.spec.ts:
  70 | // import { test, expect, request } from '@playwright/test';
  71 | // import XLSX from 'xlsx';
  72 |     
```