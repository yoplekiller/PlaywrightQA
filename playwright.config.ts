import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    timeout: 150_000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.kurly.com/main',
    },
    reporter: [
        ['list'],
        ['allure-playwright'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['./tests/reporters/SlackReporter', { webhookUrl: process.env.SLACK_WEBHOOK_TS }],
    ],
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