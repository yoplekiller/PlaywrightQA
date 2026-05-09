import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

type ImpactLevel = 'critical' | 'serious' | 'moderate' | 'minor';

const IMPACT_LEVELS: ImpactLevel[] = ['critical', 'serious', 'moderate', 'minor'];

test('메인 페이지 접근성 검사', async ({ page }, testInfo) => {
    await page.goto('/main');

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    const summary = IMPACT_LEVELS.reduce((acc, level) => {
        acc[level] = results.violations.filter(v => v.impact === level).length;
        return acc;
    }, { critical: 0, serious: 0, moderate: 0, minor: 0 });

    const violations = results.violations.flatMap(violation =>
        violation.nodes.map(node => ({
            url: page.url(),
            selector: node.target.join(' > '),
            ruleId: violation.id,
            impact: violation.impact ?? 'minor',
        }))
    );

    const report = {
        url: page.url(),
        timestamp: new Date().toISOString(),
        summary: {
            total: results.violations.length,
            ...summary,
        },
        violations,
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

    // 위반사항이 없어야 접근성 기준 통과
    expect(results.violations.length).toBe(0);
});
