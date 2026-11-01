import { test, expect } from '../../fixtures/pages';

// 로그인 실패(부정) 케이스. 실제 계정이 필요 없도록 존재할 수 없는 아이디를 매번 새로 만든다.
// (인증이 필요한 성공 케이스는 requires-auth/ 아래 chromium-auth 프로젝트에서 storageState 로 따로 돈다)
test.describe('로그인 실패', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/member/login');
    });

    test('존재하지 않는 계정으로 로그인하면 안내 메시지가 뜨고 로그인되지 않는다 @regression', async ({ page, loginPage }) => {
        const username = `qa_no_user_${Date.now()}`;
        await loginPage.login(username, 'WrongPassword!123');

        await loginPage.expectLoginFailedMessage();
        await expect(page).toHaveURL(/\/member\/login/);
        await expect(page.getByRole('link', { name: /.+님$/ })).toHaveCount(0);
    });

    test('아이디·비밀번호를 비우고 로그인하면 입력값 오류 안내가 뜬다 @regression', async ({ page, loginPage }) => {
        await loginPage.clickSubmit();

        await expect(page.getByRole('dialog')).toContainText('입력 값이 올바르지 않습니다', { timeout: 5000 });
        await expect(page).toHaveURL(/\/member\/login/);
    });
});
