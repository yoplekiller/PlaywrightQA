import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate Kurly user', async ({ page }) => {
  const email = process.env.KURLY_TEST_USER_EMAIL || process.env.KURLY_EMAIL;
  const password = process.env.KURLY_TEST_USER_PASSWORD || process.env.KURLY_PASSWORD;

  setup.skip(!email || !password, 'KURLY test credentials are not configured.');
  if (!email || !password) {
    return;
  }

  await page.goto('/main');
  await page.getByText('로그인').click();
  await page.getByRole('textbox', { name: /아이디를 입력해주세요/i }).fill(email);
  await page.getByRole('textbox', { name: /비밀번호를 입력해주세요/i }).fill(password);
  await page.getByRole('button', { name: /로그인/i }).click();
  await expect(page.getByRole('link', { name: /.+님$/i })).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: authFile });
});
