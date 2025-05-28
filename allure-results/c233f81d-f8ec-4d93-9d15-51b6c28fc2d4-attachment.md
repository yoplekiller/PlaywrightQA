# Test info

- Name: 🔐 [POST] 로그인 성공 시 200 응답 + 토큰 반환
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:4:5

# Error details

```
Error: expect(received).toHaveProperty(path)

Matcher error: expected path must not be an empty array

Expected has type:  array
Expected has value: []
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:22:16
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
  21 |   expect(status).toBe(401);
> 22 |   expect(data).toHaveProperty([]);
     |                ^ Error: expect(received).toHaveProperty(path)
  23 | });
  24 |
```