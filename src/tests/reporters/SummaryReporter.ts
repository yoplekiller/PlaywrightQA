import type { FullResult, Reporter, Suite } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';
import { BUCKET_LABELS, BUCKET_MEANINGS, Bucket, ClassifiedTest, classifyAll, countBuckets, testLabel } from './classify';

const BUCKET_ORDER: Bucket[] = ['failed', 'flaky', 'knownIssue', 'passed', 'skipped'];

// 실행 결과를 통과 / flaky / known issue / 실패 / 스킵 으로 분류해 마크다운 표로 남긴다.
// - CI: GITHUB_STEP_SUMMARY 에 붙여서 Actions 실행 요약 화면에 바로 보이게
// - 로컬/CI 공통: test-results/summary.md, 콘솔 출력
class SummaryReporter implements Reporter {
  private rootSuite?: Suite;

  onBegin(_config: unknown, suite: Suite) {
    this.rootSuite = suite;
  }

  onEnd(result: FullResult) {
    if (!this.rootSuite) return;
    const items = classifyAll(this.rootSuite.allTests());
    const markdown = this.toMarkdown(items, result);

    const outFile = path.resolve('test-results', 'summary.md');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, markdown);

    if (process.env.GITHUB_STEP_SUMMARY) {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + '\n');
    }

    const counts = countBuckets(items);
    console.log(
      `\n[분류] ${BUCKET_ORDER.map(b => `${BUCKET_LABELS[b]} ${counts[b]}`).join(' · ')}  (자세히: test-results/summary.md)`,
    );
  }

  private toMarkdown(items: ClassifiedTest[], result: FullResult): string {
    const counts = countBuckets(items);
    const lines = [
      `## Playwright 실행 결과 분류 (${result.status.toUpperCase()}, ${Math.round(result.duration / 1000)}초)`,
      '',
      '| 분류 | 개수 | 의미 |',
      '|---|---:|---|',
      ...BUCKET_ORDER.map(b => `| ${BUCKET_LABELS[b]} | ${counts[b]} | ${BUCKET_MEANINGS[b]} |`),
      '',
    ];

    for (const bucket of ['failed', 'flaky', 'knownIssue'] as Bucket[]) {
      const group = items.filter(i => i.bucket === bucket);
      if (!group.length) continue;
      lines.push(`### ${BUCKET_LABELS[bucket]}`, '');
      for (const item of group) {
        lines.push(`- ${escapeMd(testLabel(item.test))}${item.reason ? ` — ${escapeMd(item.reason)}` : ''}`);
      }
      lines.push('');
    }

    // 통과했지만 기준선(known) 위반을 품고 있는 테스트 (예: 접근성 기준선)
    const knownNotes = items.flatMap(i =>
      i.test.annotations.filter(a => a.type === 'known-issue' || a.type === 'baseline-outdated')
        .map(a => `- ${escapeMd(testLabel(i.test))} — ${a.type === 'baseline-outdated' ? '⚠️ ' : ''}${escapeMd(a.description ?? '')}`),
    );
    if (knownNotes.length) {
      lines.push('### 📎 통과 테스트에 기록된 기준선 이슈', '', ...knownNotes, '');
    }
    return lines.join('\n');
  }
}

function escapeMd(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export default SummaryReporter;
