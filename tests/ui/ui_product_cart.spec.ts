import { test, expect } from '@playwright/test';
import{ getNowString } from '../../src/utils/dataFormat';

test(' 검색 후  장바구니 담기까지 확인', async ({page}, testInfo) =>{
    await page.goto('https://www.kurly.com/main');

    const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
    await searchBox.click();
    await searchBox.fill('과자');
    await searchBox.press('Enter');
    await page.waitForTimeout(2000);

    // 상품 카드 셀렉터 수정: 공백 → 점으로 연결
    const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    const cartButton = page.locator('button:has-text("장바구니 담기")');
    await expect(cartButton).toBeVisible();
    await cartButton.click();
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change

    await page.goto('https://www.kurly.com/cart');
    await expect(page).toHaveURL('https://www.kurly.com/cart');
    
    const cartProduct = page.locator('text=[오리온] 초코칩쿠키 256g');
    await expect(cartProduct.first()).toBeVisible();

    // cartItems, cartItemCount 부분은 주석 처리 또는 필요시 텍스트 기반으로 수정
    // const cartItems = page.locator('.css-1dry2r1.e1c07x485');
    // const cartItemCount = await cartItems.count();
    // expect(cartItemCount).toBeGreaterThan(0);
    const now = getNowString();
    const browserName = testInfo.project.name;
    await page.screenshot({ path: `screenshots/cart_${browserName}_${now}.png` });
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change

})
