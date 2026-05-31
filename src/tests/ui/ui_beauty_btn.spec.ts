import { test, expect } from '../../fixtures/pages';

test('뷰티컬리 버튼 동작 테스트 @regression', async ({ page, mainPage }) => {
        // 마켓컬리 메인 페이지 접속
        await page.goto('/main');

        // 뷰티컬리 버튼 클릭
        await mainPage.clickBeautyButton();

        // 뷰티컬리 페이지로 이동했는지 확인
        await expect(page).toHaveURL('/main/beauty');


        // 스크린샷 저장
        const screenshotPath = 'screenshots/beauty_kurly_click.png';
        await page.screenshot({ path: screenshotPath });
    });
