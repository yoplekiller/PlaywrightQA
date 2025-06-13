# Test info

- Name: [POST] 비밀번호 누락으로 인한 로그인 실패 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_miss_pw.spec.ts:7:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 401
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_miss_pw.spec.ts:23:20
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
   8 |     const apiContext = await request.newContext();
   9 |     const response = await apiContext.post('https://reqres.in/api/login', {
  10 |         headers: {'Content-Type': 'application/json'},
  11 |         data: {
  12 |             email:'eve.holt@reqres.in',
  13 |             password: '' // 비밀번호 누락
  14 |         }
  15 |     });
  16 |
  17 |
  18 |     const status = response.status();
  19 |     const data = await response.json();
  20 |     console.log('🔁 응답 상태 코드:', status);
  21 |     console.log('✅ 응답 데이터:', data);
  22 |
> 23 |     expect(status).toBe(400);
     |                    ^ Error: expect(received).toBe(expected) // Object.is equality
  24 |     expect(data).toHaveProperty('error','Missing password');
  25 |     expect(data.error).toBe('Missing password');
  26 |             expect(data).toEqual({
  27 |                 error: 'Missing password'
  28 |             });
  29 |     });
```