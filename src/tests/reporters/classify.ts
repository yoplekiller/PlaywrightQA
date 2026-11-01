import type { TestCase } from '@playwright/test/reporter';

// 실행 결과를 "어떻게 대응해야 하는지" 기준으로 나눈다.
// Playwright 기본 집계(passed/failed)만 보면 known issue(test.fail)와 재시도 통과(flaky)가 섞여서,
// 매일 빨간불이 떠도 새 회귀인지 이미 아는 문제인지 구분이 안 됐다.
export type Bucket = 'passed' | 'flaky' | 'knownIssue' | 'failed' | 'skipped';

export const BUCKET_LABELS: Record<Bucket, string> = {
  passed: '✅ 통과',
  flaky: '🔁 Flaky (재시도 후 통과)',
  knownIssue: '📌 Known issue (예상된 실패)',
  failed: '❌ 실패',
  skipped: '⏭️ 스킵',
};

export const BUCKET_MEANINGS: Record<Bucket, string> = {
  passed: '',
  flaky: '첫 시도 실패 후 재시도로 통과 — 안정화 대상',
  knownIssue: 'test.fail() 로 표시한 실사이트 결함 — 예상대로 실패함',
  failed: '새 회귀 또는 테스트 코드 결함 — 확인 필요',
  skipped: '',
};

export interface ClassifiedTest {
  test: TestCase;
  bucket: Bucket;
  reason: string;
}

export function classify(test: TestCase): ClassifiedTest {
  const outcome = test.outcome();
  const lastResult = test.results[test.results.length - 1];
  const failAnnotation = test.annotations.find(a => a.type === 'fail')?.description ?? '';

  if (outcome === 'skipped') {
    return { test, bucket: 'skipped', reason: test.annotations.find(a => a.type === 'skip')?.description ?? '' };
  }
  if (outcome === 'flaky') {
    return { test, bucket: 'flaky', reason: firstErrorLine(test.results.find(r => r.status !== 'passed')?.errors[0]?.message) };
  }
  if (outcome === 'expected') {
    return test.expectedStatus === 'failed'
      ? { test, bucket: 'knownIssue', reason: failAnnotation }
      : { test, bucket: 'passed', reason: '' };
  }
  // unexpected
  if (test.expectedStatus === 'failed') {
    // known issue 로 표시했는데 통과함 → 사이트가 고쳤을 가능성. test.fail() 제거 대상.
    return { test, bucket: 'failed', reason: `known issue 가 예상외로 통과함 — 사이트 수정 여부 확인 후 test.fail() 제거 (${failAnnotation})` };
  }
  return { test, bucket: 'failed', reason: firstErrorLine(lastResult?.errors[0]?.message ?? lastResult?.status) };
}

export function classifyAll(tests: TestCase[]): ClassifiedTest[] {
  return tests.map(classify);
}

export function countBuckets(items: ClassifiedTest[]): Record<Bucket, number> {
  const counts: Record<Bucket, number> = { passed: 0, flaky: 0, knownIssue: 0, failed: 0, skipped: 0 };
  for (const item of items) counts[item.bucket] += 1;
  return counts;
}

export function testLabel(test: TestCase): string {
  const project = test.parent.project()?.name ?? '';
  const file = test.location.file.split(/[\\/]/).pop();
  return `${project ? `[${project}] ` : ''}${file} › ${test.title}`;
}

export function stripAnsi(text: string): string {
  return text.replace(/\u001b\[[0-9;]*m/g, '');
}

function firstErrorLine(message: string | undefined): string {
  if (!message) return '';
  const line = stripAnsi(message).split('\n').find(l => l.trim().length > 0) ?? '';
  return line.replace(/^Error:\s*/i, '').trim().slice(0, 160);
}
