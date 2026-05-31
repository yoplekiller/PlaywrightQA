import { test, expect } from '../../../fixtures/pages';

test.skip(process.env.CI === 'true', 'Skip in CI');
test('저장된 로그인 상태 확인 테스트 @auth @smoke', async ({ page }) => {
    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 로그인 성공 여부 확인
    await expect(page.getByRole('link', { name: /.+님$/i })).toBeVisible({ timeout: 10000 });
});
