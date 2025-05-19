import { test, expect } from '@playwright/test';

test('10주년 팝업 기능', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).getByRole('link').click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('10주년 굿즈')).toBeVisible();
  
  
  });
  

