import { test, expect } from '@playwright/test';

test('10주년 팝업 기능', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).getByRole('link').click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
  await expect(page).toHaveURL('https://event.kurly.com/lego/event/2023/0911/join/coupon');

  });
  

