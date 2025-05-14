// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://www.kurly.com/main');
//   await page.locator('a').filter({ hasText: '로그인' }).click();
//   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).click();
//   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill('dlaaslek');
//   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).press('Tab');
//   await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill('!test132456');
//   await page.getByRole('button', { name: '로그인' }).click();

//   await expect(page.getByRole('button', { name:'마켓컬리'})).toBeVisible();
//   await expect(page.getByRole('button', { name:'뷰티컬리'})).toBeVisible();
// });