# Test info

- Name: 🔐 로그인 요청 시 정상 응답 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:17:29
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('🔐 로그인 요청 시 정상 응답 확인', async () => {
   4 |   const baseURL = 'https://reqres.in/api';
   5 |   const apiContext = await request.newContext();
   6 |
   7 |   const response = await apiContext.post(`${baseURL}/login`, {
   8 |     headers: {
   9 |       'Content-Type': 'application/json'
  10 |     },
  11 |     data: { 
  12 |       email: 'eve.holt@reqres.in',
  13 |       password: 'cityslicka'
  14 |     }
  15 |   });
  16 |
> 17 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  18 |
  19 |   const data = await response.json();
  20 |   console.log(data); // ✅ { token: 'QpwL5tke4Pnpja7X4' }
  21 |   expect(data).toHaveProperty('token');
  22 | });
  23 |
```