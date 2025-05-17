import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const myButton = page.locator('button.css-4ypn7b.e17x72af0');
  await expect(myButton).toBeVisible({ timeout: 7000 }); // 최대 7초 대기
  await myButton.click();

  await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
  await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
  await page.getByRole('link', { name: '담기 샛별배송 [아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 커피와 잘 어울리는 아티장 비스킷 8,800원 188' }).getByRole('button').click();
  
  await page.locator('.css-4ypn7b.e17x72af0').click();
  await page.locator('.css-18y6jr4.e1hx75jb0').click();
  await page.locator('.css-ahkst0.e4nu7ef3').click();
  await page.locator('.css-g25h97.e14oy6dx1').click();
  await expect(page).toHaveURL('https://www.kurly.com/cart');

  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByText('전체선택 2/').click();
  await page.getByText('전체선택 0/').click();
  await page.getByRole('button', { name: '선택삭제' }).click();
  await page.getByRole('button', { name: 'confirm-button' }).click();
  await page.getByText('전체선택 0/').click();
  await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
});