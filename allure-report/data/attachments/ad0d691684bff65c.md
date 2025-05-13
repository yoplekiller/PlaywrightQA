# Test info

- Name: 홈페이지 타이틀 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\sample.spec.ts:3:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\sample.spec.ts:4:16
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';  
  2 |
  3 | test('홈페이지 타이틀 확인', async({page}) =>{
> 4 |     await page.goto('/');
    |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  5 |     await expect(page).toHaveTitle(/마켓컬리/);
  6 | } )
```