import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { loadExcelFile } from './src/utils/excel_loader';
import fs from 'fs';
import path from 'path';


dotenv.config();

async function globalSetup(config: FullConfig) {
    const email = process.env.KURLY_EMAIL || '';
    const password = process.env.KURLY_PASSWORD || '';
    const searchCase = await loadExcelFile(path.resolve(__dirname, 'src/tests/data/test_case.xlsx'));
    fs.writeFileSync(
        path.resolve(__dirname, 'searchCases.json'),
        JSON.stringify(searchCase, null, 2)
    );

    if (!email || !password) {
        return;
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.kurly.com/main');

    // 로그인 버튼 클릭
    await page.getByText('로그인').click();

    // 이메일과 비밀번호 입력 (LoginPage POM과 동일한 셀렉터 사용)
    await page.getByRole('textbox', { name: /아이디를 입력해주세요/i }).fill(email);
    await page.getByRole('textbox', { name: /비밀번호를 입력해주세요/i }).fill(password);
    await page.getByRole('button', { name: /로그인/i }).click();

    // 로그인 성공 대기
    await page.waitForSelector('a:has-text("님")', { state: 'visible', timeout: 10000 });

    // 로그인 상태 저장
    await context.storageState({ path: 'storageState.json' });
    await browser.close();
}
export default globalSetup;
