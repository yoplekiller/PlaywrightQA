# Test info

- Name: [POST] 비밀번호 누락으로 인한 로그인 실패 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_miss_pw.spec.ts:7:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_miss_pw.spec.ts:31:20
```

# Test source

```ts
   1 | import {test, expect, request} from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 |
   4 | dotenv.config();
   5 |
   6 |
   7 | test('[POST] 비밀번호 누락으로 인한 로그인 실패 테스트', async() =>{
   8 |     const apiContext = await request.newContext(
   9 |         {
  10 |             baseURL: 'https://reqres.in',
  11 |             extraHTTPHeaders: {
  12 |                 'Content-Type': 'application/json',
  13 |                 'x-api-key': 'reqres-free-v1'  // ✅ API 키
  14 |             }
  15 |         }
  16 |     );
  17 |
  18 |     const response = await apiContext.post('/api/login', {
  19 |     data: {
  20 |       email: 'eve.holt@reqres.in',
  21 |       password: ' ' // 비밀번호 누락
  22 |     }
  23 |   });
  24 |
  25 |
  26 |     const status = response.status();
  27 |     const data = await response.json();
  28 |     console.log('🔁 응답 상태 코드:', status);
  29 |     console.log('✅ 응답 데이터:', data);
  30 |
> 31 |     expect(status).toBe(401);
     |                    ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |     expect(data).toHaveProperty('error','Missing password');
  33 |     expect(data.error).toBe('Missing password');
  34 |             expect(data).toEqual({
  35 |                 error: 'Missing password'
  36 |             });
  37 |     });
```