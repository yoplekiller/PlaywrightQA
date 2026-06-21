import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const authFile = 'playwright/.auth/user.json';
const isListMode = process.argv.includes('--list');

const reporters: [string, any?][] = [
    ['list'],
];

if (!isListMode) {
    reporters.push(['html', { outputFolder: 'playwright-report', open: 'never' }]);
    reporters.push(['json', { outputFile: 'playwright-report/results.json' }]);
}

if (!isListMode && process.env.SLACK_WEBHOOK_TS) {
    reporters.push([
        './src/tests/reporters/SlackReporter.ts',
        { webhookUrl: process.env.SLACK_WEBHOOK_TS },
    ]);
}

export default defineConfig({
    timeout: 70_000,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: process.env.CI ? 'off' : 'retain-on-failure',
        baseURL: 'https://www.kurly.com',
    },
    reporter: reporters as any,
    projects: [
        {
            name: 'setup',
            testMatch: '**/setup/*.setup.ts',
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            testIgnore: ['**/requires-auth/**', '**/setup/**'],
        },
        {
            name: 'chromium-auth',
            use: {
                ...devices['Desktop Chrome'],
                storageState: authFile,
            },
            testMatch: '**/requires-auth/**',
            dependencies: ['setup'],
        },
        {
            name: 'Edge',
            use: { ...devices['Desktop Edge'] },
            testIgnore: ['**/requires-auth/**', '**/setup/**'],
        },
    ],
});
