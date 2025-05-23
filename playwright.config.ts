import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const reporters: [string, any?][] = [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
];

if (process.env.SLACK_WEBHOOK_TS) {
    reporters.push([
        './tests/reporters/SlackReporter',
        { webhookUrl: process.env.SLACK_WEBHOOK_TS },
    ]);
}

export default defineConfig({
    timeout: 70_000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        trace: 'on',
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
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Edge',
            use: { ...devices['Desktop Edge'] },
        },
    ],
});