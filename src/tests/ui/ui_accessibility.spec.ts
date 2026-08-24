import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

test('메인 페이지 접근성 검사 @a11y @regression', async ({ page }, testInfo) => {
    await page.goto('/main');

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    const report = {
        url: page.url(),
        timestamp: new Date().toISOString(),
        summary: {
            total: results.violations.length,
            critical: results.violations.filter(v => v.impact === 'critical').length,
            serious: results.violations.filter(v => v.impact === 'serious').length,
            moderate: results.violations.filter(v => v.impact === 'moderate').length,
        },
        violations: results.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
        }))
    };

    // 리포트를 테스트 결과에 첨부
    const reportDir = path.resolve(__dirname, '../../test-results');
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    const reportPath = path.join(reportDir, `accessibility-report.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    await testInfo.attach('접근성 검사 보고서', {
        path: reportPath,
        contentType: 'application/json',
    });

    expect(report.summary.critical, `critical 위반: ${JSON.stringify(report.violations.filter(v => v.impact === 'critical'))}`).toBe(0);
    expect(report.summary.serious, `serious 위반: ${JSON.stringify(report.violations.filter(v => v.impact === 'serious'))}`).toBe(0);
});
