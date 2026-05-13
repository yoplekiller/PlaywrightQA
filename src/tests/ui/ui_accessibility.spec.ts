import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

test('메인 페이지 접근성 검사', async ({ page }, testInfo) => {
    await page.goto('/main');

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    // 위반사항이 없어야 접근성 기준 통과
    expect(results.violations.length).toBe(0);

    const repeatedViolations = results.violations
        .map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            count: v.nodes.length,
            sampleSelectors: v.nodes
                .map(node => node.target?.[0])
                .filter((target): target is string => Boolean(target))
                .slice(0, 3),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const report = {
        url: page.url(),
        timestamp: new Date().toISOString(),
        summary: {
            total: results.violations.length,
            critical: results.violations.filter(v => v.impact === 'critical').length,
            serious: results.violations.filter(v => v.impact === 'serious').length,
            moderate: results.violations.filter(v => v.impact === 'moderate').length,
        },
        repeatedViolationsTop5: repeatedViolations,
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
    const reportPath = path.join(reportDir, 'accessibility-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    await testInfo.attach('접근성 검사 보고서', {
        path: reportPath,
        contentType: 'application/json',
    });
});
