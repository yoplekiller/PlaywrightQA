import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const reporters: [string, any?][] = [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
];

if (process.env.SLACK_WEBHOOK_TS) {
    reporters.push([
        './src/tests/reporters/SlackReporter.ts',
        { webhookUrl: process.env.SLACK_WEBHOOK_TS },
    ]);
}

export default defineConfig({
    timeout: 70_000,
    retries: process.env.CI ? 1 : 0,
    globalSetup: './global.setup.ts',
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.kurly.com',
    },
    reporter: reporters as any,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            testIgnore: '**/requires-auth/**',
        },
        {
            name: 'chromium-auth',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'storageState.json',
            },
            testMatch: '**/requires-auth/**',
        },
        {
            name: 'Edge',
            use: { ...devices['Desktop Edge'] },
            testIgnore: '**/requires-auth/**',
        },
    ],
});
