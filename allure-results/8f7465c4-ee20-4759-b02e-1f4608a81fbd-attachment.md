# Test info

- Name: 🔐 로그인 요청 시 정상 응답 요청
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post.spec.ts:16:31
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | test('🔐 로그인 요청 시 정상 응답 요청', async() => {
   4 |     const baseURL = 'https://reqres.in/api';
   5 |     const apiContext = await request.newContext();
   6 |
   7 |     const response = await apiContext.post(`${baseURL}/login`,
   8 |         {
   9 |             data:{
  10 |                 email: 'eve.holt@reqres.in',
  11 |                 password: 'cityslicka'
  12 |             }
  13 |         }
  14 |     );
  15 |
> 16 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  17 |
  18 |     const data = await response.json();
  19 |     console.log(data);
  20 |     expect(data).toHaveProperty('token');
  21 | });
```