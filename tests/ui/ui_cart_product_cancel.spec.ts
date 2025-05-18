import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://www.kurly.com/main');
  // 더 견고하게: 버튼 텍스트로 찾기 (뷰티컬리)
  const myButton = page.locator('button:has-text("뷰티컬리")');
  await expect(myButton).toBeVisible({ timeout: 7000 });
  await myButton.click();

  await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
  await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
  
  // XPath로 '담기' 버튼을 첫 번째로 찾기
  const targetButton = page.locator("xpath=(//button[@type='button'][contains(text(),'담기')])[1]");
  await expect(targetButton).toBeVisible({ timeout: 7000 });
  await targetButton.click();


  const nextBtn = page.locator("xpath=(//button[@aria-label='수량올리기'])[1]");
  await expect(nextBtn).toBeVisible({ timeout: 7000 });
  await nextBtn.click();

  const cartAddBtn = page.locator("xpath=(//button[@class='css-ahkst0 e4nu7ef3'])[1]");
  await expect(cartAddBtn).toBeVisible({ timeout: 7000 });
  await cartAddBtn.click();


  const cartBtn = page.locator("xpath=(//button[@class='css-g25h97 e14oy6dx1'])")
  await expect(cartBtn).toBeVisible({ timeout: 7000 });
  await cartBtn.click();

  await expect(page).toHaveURL('https://www.kurly.com/cart');

  // await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByText('전체선택 1/').click();
  await page.getByText('전체선택 0/').click();
  await page.getByRole('button', { name: '선택삭제' }).click();
  await page.getByRole('button', { name: 'confirm-button' }).click();
  await expect(page.getByText("전체선택 0/0선택삭제장바구니에 담긴 상품이 없습니다")).toBeVisible();
});