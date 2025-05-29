# Test info

- Name: 🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post_fail.spec.ts:6:5

# Error details

```
Error: expect(received).toHaveProperty(path, value)

Expected path: "error"

Expected value: "Missing API Key."
Received value: "Missing API key."
    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\api\api_login_post_fail.spec.ts:25:18
```

# Test source

```ts
   1 | import {test, expect, request} from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 |
   4 | dotenv.config();
   5 |
   6 | test('🔐 [POST] 로그인 실패 시 400 응답 + 에러 메시지 반환',async()=>{
   7 |     const apiContext = await request.newContext();
   8 |
   9 |     const response = await apiContext.post('https://reqres.in/api/login',{
  10 |         headers: {'Content-Type': 'application/json'},
  11 |         data: {
  12 |             email:'eve.holt@reqres.in',
  13 |             password: 'cityslicka'
  14 |
  15 |         }
  16 |     });
  17 |
  18 |     const status = response.status();
  19 |     const data = await response.json();
  20 |
  21 |     console.log('🔁 응답 상태 코드:', status);
  22 |     console.log('✅ 응답 데이터:', data);
  23 |
  24 |     expect(status).toBe(401);
> 25 |     expect(data).toHaveProperty('error', 'Missing API Key.');
     |                  ^ Error: expect(received).toHaveProperty(path, value)
  26 |
  27 | })
```