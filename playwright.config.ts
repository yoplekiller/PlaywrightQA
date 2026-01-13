import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const reporters: [string, any?][] = [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
];

console.log("🔍 환경변수 체크:");
console.log("- SLACK_WEBHOOK_TS:", process.env.SLACK_WEBHOOK_TS ? '설정됨' : '설정안됨');

if (process.env.SLACK_WEBHOOK_TS) {
    console.log("✅ SLACK_WEBHOOK_TS 감지됨 - SlackReporter 추가");
    reporters.push([
        './tests/reporters/SlackReporter.ts',
        { webhookUrl: process.env.SLACK_WEBHOOK_TS },
    ]);
} else {
    console.log("❌ SLACK_WEBHOOK_TS 없음 - SlackReporter 비활성화");
}




export default defineConfig({
    timeout: 70_000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.kurly.com/main',
    },
    reporter: reporters as any, // type assertion to avoid TS error
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        {
            name: 'Edge',
            use: { ...devices['Desktop Edge'] },
        },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // }

    ],
});