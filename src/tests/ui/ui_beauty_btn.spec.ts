import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('🔘 뷰티컬리 버튼 동작 테스트', async ({ page }) => {
    // 페이지 객체 생성
    const mainPage = new MainPage(page);

    // 마켓컬리 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');

    // 뷰티컬리 버튼 클릭
    await mainPage.clickBeautyButton();

    // 뷰티컬리 페이지로 이동했는지 확인
    await expect(page).toHaveURL('https://www.kurly.com/main/beauty');
    await page.waitForTimeout(2000);

    // 스크린샷 저장
    const screenshotPath = 'screenshots/beauty_kurly_click.png';
    await page.screenshot({ path: screenshotPath });
});
