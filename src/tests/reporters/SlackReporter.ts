import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface ProjectStat {
  passed: Set<string>;
  failed: Set<string>;
  skipped: Set<string>;
}

type FailureCategory = 'Product Bug 가능성' | 'Automation Issue 가능성' | 'Environment Issue 가능성';

interface FailureGuide {
  category: FailureCategory;
  likelyCause: string;
  action: string;
}

interface FailedDetail {
  title: string;
  file: string;
  projectName: string;
  status: TestResult['status'];
  error: string;
  guide: FailureGuide;
}

const FAILED_STATUSES: TestResult['status'][] = ['failed', 'timedOut', 'interrupted'];
const MAX_FAILURE_DETAILS = 5;

class SlackReporter implements Reporter {
  private webhookUrl: string;
  private passedKeys = new Set<string>();
  private failedKeys = new Set<string>();
  private skippedKeys = new Set<string>();
  private projectStats = new Map<string, ProjectStat>();
  private startTime = '';
  private failedDetails: FailedDetail[] = [];

  constructor(options: { webhookUrl: string }) {
    this.webhookUrl = options.webhookUrl;
    console.log('SlackReporter initialized');
    console.log('Slack webhook configured:', this.webhookUrl ? 'yes' : 'no');
  }

  onBegin(_config: FullConfig, _suite: Suite) {
    this.startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    console.log('Playwright test run started');
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (FAILED_STATUSES.includes(result.status) && result.retry < test.retries) {
      return;
    }

    const key = `${test.location.file}>${test.title}`;
    const projectName = test.parent.project()?.name || 'unknown';
    const projectStat = this.getProjectStat(projectName);

    if (result.status === 'passed') {
      if (!projectStat.failed.has(key)) {
        projectStat.passed.add(key);
      }

      if (!this.failedKeys.has(key)) {
        this.passedKeys.add(key);
      }

      projectStat.skipped.delete(key);
      this.skippedKeys.delete(key);
      return;
    }

    if (FAILED_STATUSES.includes(result.status)) {
      projectStat.failed.add(key);
      projectStat.passed.delete(key);
      projectStat.skipped.delete(key);

      this.failedKeys.add(key);
      this.passedKeys.delete(key);
      this.skippedKeys.delete(key);

      if (!this.failedDetails.find(detail => detail.file === test.location.file && detail.title === test.title)) {
        const error = this.getErrorSummary(result);

        this.failedDetails.push({
          title: test.title,
          file: test.location.file,
          projectName,
          status: result.status,
          error,
          guide: this.getFailureGuide(test, result, error),
        });
      }

      return;
    }

    if (result.status === 'skipped') {
      if (!projectStat.passed.has(key) && !projectStat.failed.has(key)) {
        projectStat.skipped.add(key);
      }

      if (!this.passedKeys.has(key) && !this.failedKeys.has(key)) {
        this.skippedKeys.add(key);
      }
    }
  }

  async onEnd(result: FullResult): Promise<void> {
    const passed = this.passedKeys.size;
    const failed = this.failedKeys.size;
    const skipped = this.skippedKeys.size;
    const total = passed + failed + skipped;

    console.log('Playwright test run finished:', { total, passed, failed, skipped });

    const status = result.status.toUpperCase();
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const statusLabel = status === 'PASSED' ? '성공' : '실패';
    const playwrightUrl = process.env.PLAYWRIGHT_REPORT_URL || '';
    const projectLines = this.createProjectLines();

    const blocks: any[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `Playwright 테스트 ${statusLabel}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*상태:*\n${status}` },
          { type: 'mrkdwn', text: `*총 소요:*\n${Math.round(result.duration / 1000)}초` },
          { type: 'mrkdwn', text: `*시작:*\n${this.startTime}` },
          { type: 'mrkdwn', text: `*종료:*\n${now}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*성공:*\n${passed}` },
          { type: 'mrkdwn', text: `*실패:*\n${failed}` },
          { type: 'mrkdwn', text: `*스킵:*\n${skipped}` },
          { type: 'mrkdwn', text: `*총 테스트:*\n${total}` },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*프로젝트별 결과:*\n${projectLines || '결과 없음'}`,
        },
      },
    ];

    if (this.failedDetails.length > 0) {
      blocks.push({ type: 'divider' });
      blocks.push(...this.createFailureBlocks());
    }

    if (playwrightUrl) {
      blocks.push({
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Playwright Report', emoji: true },
            url: playwrightUrl,
            style: 'primary',
          },
        ],
      });
    }

    const message = {
      blocks,
      text: `Playwright 테스트 ${statusLabel} - ${status} (성공: ${passed}, 실패: ${failed}, 총 테스트: ${total})`,
    };

    try {
      await axios.post(this.webhookUrl, message);
      console.log('Slack message sent');
    } catch (error) {
      console.error('Failed to send Slack message:', error);
    }
  }

  private getProjectStat(projectName: string): ProjectStat {
    if (!this.projectStats.has(projectName)) {
      this.projectStats.set(projectName, {
        passed: new Set(),
        failed: new Set(),
        skipped: new Set(),
      });
    }

    return this.projectStats.get(projectName)!;
  }

  private createProjectLines(): string {
    return Array.from(this.projectStats.entries())
      .map(([name, stat]) => {
        const skipText = stat.skipped.size > 0 ? ` / 스킵 ${stat.skipped.size}` : '';
        return `*${name}*: 성공 ${stat.passed.size} / 실패 ${stat.failed.size}${skipText}`;
      })
      .join('\n');
  }

  private createFailureBlocks(): any[] {
    const visibleFailures = this.failedDetails.slice(0, MAX_FAILURE_DETAILS);
    const hiddenCount = this.failedDetails.length - visibleFailures.length;
    const blocks: any[] = visibleFailures.map(detail => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: this.truncateSlackText(
          [
            `*테스트 과제:* ${detail.title}`,
            `*실패 위치:* ${detail.file}`,
            `*프로젝트:* ${detail.projectName}`,
            `*분류:* ${detail.guide.category}`,
            `*오류:* ${detail.error || detail.status}`,
            `*원인 추정:* ${detail.guide.likelyCause}`,
            `*해결 가이드:* ${detail.guide.action}`,
          ].join('\n'),
        ),
      },
    }));

    if (hiddenCount > 0) {
      blocks.push({
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `추가 실패 ${hiddenCount}건은 Playwright Report에서 확인하세요.`,
          },
        ],
      });
    }

    return blocks;
  }

  private getErrorSummary(result: TestResult): string {
    const error = result.errors[0]?.message || result.error?.message || '';
    return error.split('\n').find(line => line.trim().length > 0)?.trim() || result.status;
  }

  private getFailureGuide(test: TestCase, result: TestResult, error: string): FailureGuide {
    const source = `${test.title} ${test.location.file} ${result.status} ${error}`.toLowerCase();

    if (result.status === 'timedOut' || this.includesAny(source, ['timeouterror', 'timeout', 'waiting for'])) {
      return {
        category: 'Automation Issue 가능성',
        likelyCause: '화면 로딩, selector 변경, 또는 대기 조건 부족으로 테스트가 제한 시간 안에 조건을 만족하지 못했을 수 있습니다.',
        action: '실제 화면에서 대상 요소가 노출되는지 확인하고 Page Object의 locator와 wait 조건을 UI 상태 기준으로 보강하세요.',
      };
    }

    if (this.includesAny(source, ['locator', 'strict mode violation', 'resolved to 0 elements', 'element is not visible'])) {
      return {
        category: 'Automation Issue 가능성',
        likelyCause: 'DOM 구조 또는 selector가 변경되어 자동화 코드가 올바른 요소를 찾지 못했을 가능성이 큽니다.',
        action: '관련 Page Object의 locator를 최신 DOM 기준으로 수정하고, 같은 역할의 요소가 여러 개인 경우 더 구체적인 selector를 사용하세요.',
      };
    }

    if (this.includesAny(source, ['tohavetext', 'tohaveurl', 'tohavevalue', 'expected', 'received'])) {
      return {
        category: 'Product Bug 가능성',
        likelyCause: '실제 화면 값이 기대 결과와 달라 기능 동작이나 테스트 데이터가 변경되었을 수 있습니다.',
        action: '요구사항 기준으로 실제 결과가 맞는지 먼저 확인하고, 서비스 변경이 의도된 것이라면 기대값과 테스트 데이터를 갱신하세요.',
      };
    }

    if (this.includesAny(source, ['snapshot', 'screenshot', 'visual', 'pixel'])) {
      return {
        category: 'Product Bug 가능성',
        likelyCause: 'UI가 기준 이미지와 달라졌습니다. 의도된 디자인 변경 또는 화면 깨짐일 수 있습니다.',
        action: '변경된 화면을 검토한 뒤 의도된 변경이면 snapshot을 갱신하고, 의도되지 않았다면 UI 회귀 결함으로 등록하세요.',
      };
    }

    if (this.includesAny(source, ['401', '403', 'storageState', 'login', 'auth', 'unauthorized', 'forbidden'])) {
      return {
        category: 'Environment Issue 가능성',
        likelyCause: '로그인 세션 만료, 인증 정보 누락, 또는 권한 문제로 테스트 전제 조건이 깨졌을 수 있습니다.',
        action: 'auth.json 또는 storageState.json을 재생성하고 CI/로컬 환경 변수와 테스트 계정 권한을 확인하세요.',
      };
    }

    if (this.includesAny(source, ['500', '502', '503', '504', 'network', 'net::', 'econnreset', 'enotfound'])) {
      return {
        category: 'Environment Issue 가능성',
        likelyCause: '테스트 대상 서버, 네트워크, 외부 API 상태가 불안정했을 가능성이 있습니다.',
        action: '같은 테스트를 재실행해 재현성을 확인하고, 서버 로그와 네트워크 상태를 함께 점검하세요.',
      };
    }

    return {
      category: 'Automation Issue 가능성',
      likelyCause: '자동 분류 규칙에 걸리지 않은 실패입니다. 테스트 코드, 테스트 데이터, 실제 기능 변경을 함께 확인해야 합니다.',
      action: 'Playwright trace, screenshot, video를 열어 실패 직전 화면 상태를 확인한 뒤 Product Bug인지 Automation Issue인지 확정하세요.',
    };
  }

  private includesAny(source: string, keywords: string[]): boolean {
    return keywords.some(keyword => source.includes(keyword));
  }

  private truncateSlackText(text: string): string {
    const maxLength = 2900;

    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength - 20)}...`;
  }
}

export default SlackReporter;
