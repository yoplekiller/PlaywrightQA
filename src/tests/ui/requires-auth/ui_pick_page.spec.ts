import { test, expect } from '../../../fixtures/pages';

test.skip(process.env.CI === 'true', 'Skip in CI');
test.describe('Pick(찜하기) 버튼 기능 테스트', () => {

    test('Pick 버튼 클릭 테스트 @auth @regression', async ({ page, mainPage }) => {
        // 마켓컬리 메인 페이지 접속
        await page.goto('/main');
        await expect(page.getByRole('link', { name: /.+님$/i })).toBeVisible({ timeout: 10000 });

        // 찜하기 버튼 클릭
        await mainPage.clickLikeButton();

        // Pick 페이지로 이동 확인
        await expect(page).toHaveURL(/\/pick\//, { timeout: 10000 });
    });
});
