import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

// 마켓컬리 실사이트에 이미 있는 접근성 위반(사이트 측 결함, 코드로 고칠 수 없음).
// 2026-11-01 실측: button-name 8건, image-alt 1건(critical) / color-contrast 51건, link-name 3건(serious).
// 예전엔 test.fail() 로 "항상 실패 예상" 처리했는데, 그러면 페이지가 아예 안 떠서 실패해도 '예상된 실패'로 묻혀
// 테스트가 아무것도 지켜주지 못했다. 이제는 이 목록을 기준선(baseline)으로 두고
// "기준선에 없는 새 critical/serious 위반이 생기면 실패"로 바꿔서 접근성 회귀를 잡는다.
const KNOWN_VIOLATIONS: Record<string, string> = {
    'button-name': '헤더/배너 아이콘 버튼에 접근성 이름 없음',
    'image-alt': '배너 이미지 alt 누락',
    'color-contrast': '프로모션 배지 등 텍스트 대비 부족',
    'link-name': '이미지 링크에 텍스트 없음',
};

test('메인 페이지 접근성 검사 - 기준선 외 신규 위반 없음 @a11y @regression', async ({ page }, testInfo) => {
    await page.goto('/main');
    // 사전조건: 페이지가 실제로 그려졌는지 확인. 이게 없으면 빈 화면을 검사해 "위반 0건"으로 통과할 수 있다.
    await expect(page.getByRole('button', { name: /검색|submit/i }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('a[href*="/goods/"]').first()).toBeVisible({ timeout: 15000 });

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    const blocking = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    const knownFound = blocking.filter(v => v.id in KNOWN_VIOLATIONS);
    const newViolations = blocking.filter(v => !(v.id in KNOWN_VIOLATIONS));

    const report = {
        url: page.url(),
        timestamp: new Date().toISOString(),
        checkedRules: results.passes.length + results.violations.length,
        known: knownFound.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, note: KNOWN_VIOLATIONS[v.id] })),
        new: newViolations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, description: v.description })),
        fixedSinceBaseline: Object.keys(KNOWN_VIOLATIONS).filter(id => !blocking.some(v => v.id === id)),
    };

    const reportPath = testInfo.outputPath('accessibility-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    await testInfo.attach('접근성 검사 보고서', { path: reportPath, contentType: 'application/json' });

    // 기준선 위반은 known issue 로 리포트에 표시 (실패 분류 리포터가 annotation 을 읽는다)
    for (const v of report.known) {
        testInfo.annotations.push({ type: 'known-issue', description: `a11y ${v.id} ${v.nodes}건 — ${v.note}` });
    }
    // 기준선 항목이 사라졌으면 사이트가 고친 것 → 기준선에서 빼라는 신호만 남기고 실패시키지는 않음
    for (const id of report.fixedSinceBaseline) {
        testInfo.annotations.push({ type: 'baseline-outdated', description: `${id} 위반이 더 이상 없음 — KNOWN_VIOLATIONS 에서 제거 필요` });
    }

    expect(report.checkedRules, '검사된 규칙 수가 너무 적음 — 페이지가 정상 로드되지 않았을 수 있음').toBeGreaterThan(20);
    expect(report.new, `기준선에 없는 신규 critical/serious 위반: ${JSON.stringify(report.new)}`).toEqual([]);
});
