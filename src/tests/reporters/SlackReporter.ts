import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface ProjectStat {
  passed: Set<string>;
  failed: Set<string>;
  skipped: Set<string>;
}

type FailureCategory = 'product' | 'automation' | 'environment';

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
const MAX_FAILURE_DETAILS = 3;

const CATEGORY_LABELS: Record<FailureCategory, string> = {
  product: '제품 결함 가능성',
  automation: '자동화 코드 점검',
  environment: '환경 이슈 가능성',
};

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
          { type: 'mrkdwn', text: `*소요 시간:*\n${Math.round(result.duration / 1000)}초` },
          { type: 'mrkdwn', text: `*성공/실패/스킵:*\n${passed} / ${failed} / ${skipped}` },
          { type: 'mrkdwn', text: `*총 테스트:*\n${total}` },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `시작 ${this.startTime} · 종료 ${now}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*프로젝트별 결과*\n${this.createProjectLines() || '결과 없음'}`,
        },
      },
    ];

    if (this.failedDetails.length > 0) {
      blocks.push({ type: 'divider' });
      blocks.push(...this.createFailureSummaryBlocks());
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

  private createFailureSummaryBlocks(): any[] {
    const counts = this.getFailureCategoryCounts();
    const categorySummary = (Object.keys(CATEGORY_LABELS) as FailureCategory[])
      .filter(category => counts[category] > 0)
      .map(category => `${CATEGORY_LABELS[category]} ${counts[category]}건`)
      .join(' · ');

    const topFailures = this.failedDetails
      .slice(0, MAX_FAILURE_DETAILS)
      .map((detail, index) => {
        const fileName = this.getFileName(detail.file);
        return [
          `*${index + 1}. ${this.cleanTitle(detail.title)}*`,
          `${CATEGORY_LABELS[detail.guide.category]} · ${fileName} · ${this.cleanError(detail.error || detail.status)}`,
          `조치: ${detail.guide.action}`,
        ].join('\n');
      })
      .join('\n\n');

    const hiddenCount = this.failedDetails.length - MAX_FAILURE_DETAILS;
    const hiddenText = hiddenCount > 0 ? `\n\n추가 실패 ${hiddenCount}건은 Playwright Report에서 확인하세요.` : '';

    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*실패 분석 요약*\n총 ${this.failedDetails.length}건 · ${categorySummary}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: this.truncateSlackText(`*우선 확인할 실패 ${Math.min(this.failedDetails.length, MAX_FAILURE_DETAILS)}건*\n${topFailures}${hiddenText}`),
        },
      },
    ];
  }

  private getFailureCategoryCounts(): Record<FailureCategory, number> {
    return this.failedDetails.reduce<Record<FailureCategory, number>>(
      (counts, detail) => {
        counts[detail.guide.category] += 1;
        return counts;
      },
      { product: 0, automation: 0, environment: 0 },
    );
  }

  private getErrorSummary(result: TestResult): string {
    const error = result.errors[0]?.message || result.error?.message || '';
    const firstLine = error.split('\n').find(line => line.trim().length > 0)?.trim() || result.status;
    return this.stripAnsi(firstLine);
  }

  private getFailureGuide(test: TestCase, result: TestResult, error: string): FailureGuide {
    const source = `${test.title} ${test.location.file} ${result.status} ${error}`.toLowerCase();

    if (result.status === 'timedOut' || this.includesAny(source, ['timeouterror', 'timeout', 'waiting for'])) {
      return {
        category: 'automation',
        likelyCause: '화면 로딩, selector 변경, 또는 대기 조건 부족',
        action: 'locator와 wait 조건을 실제 UI 상태 기준으로 점검',
      };
    }

    if (this.includesAny(source, ['locator', 'strict mode violation', 'resolved to 0 elements', 'element is not visible'])) {
      return {
        category: 'automation',
        likelyCause: 'DOM 구조 또는 selector 변경',
        action: 'Page Object locator를 최신 DOM 기준으로 수정',
      };
    }

    if (this.includesAny(source, ['tohaveurl'])) {
      return {
        category: 'automation',
        likelyCause: '검색/이동 후 URL 변경 대기 조건이 실제 동작과 맞지 않음',
        action: 'URL regex와 검색 완료 기준을 현재 서비스 동작에 맞게 조정',
      };
    }

    if (this.includesAny(source, ['tobelessthanorequal', 'tobegreaterthanorequal'])) {
      return {
        category: 'product',
        likelyCause: '정렬 결과가 기대 순서와 다르거나 가격 파싱 로직이 실제 표시값과 다름',
        action: '실제 정렬 동작 확인 후, 결함이면 등록하고 표시값 이슈면 가격 파싱 로직 점검',
      };
    }

    if (this.includesAny(source, ['tohavetext', 'tohavevalue', 'expected', 'received'])) {
      return {
        category: 'product',
        likelyCause: '실제 화면 값이 기대 결과와 다름',
        action: '요구사항 기준으로 실제 결과 확인 후 기대값 또는 테스트 데이터 갱신 여부 판단',
      };
    }

    if (this.includesAny(source, ['snapshot', 'screenshot', 'visual', 'pixel'])) {
      return {
        category: 'product',
        likelyCause: 'UI가 기준 이미지와 달라짐',
        action: '의도된 디자인 변경인지 확인 후 snapshot 갱신 또는 UI 회귀 결함 등록',
      };
    }

    if (this.includesAny(source, ['401', '403', 'storagestate', 'login', 'auth', 'unauthorized', 'forbidden'])) {
      return {
        category: 'environment',
        likelyCause: '로그인 세션 만료 또는 인증/권한 문제',
        action: 'storageState/auth 파일과 CI 환경 변수, 테스트 계정 권한 확인',
      };
    }

    if (this.includesAny(source, ['500', '502', '503', '504', 'network', 'net::', 'econnreset', 'enotfound'])) {
      return {
        category: 'environment',
        likelyCause: '서버, 네트워크, 외부 API 상태 불안정',
        action: '재실행으로 재현성 확인 후 서버 로그와 네트워크 상태 점검',
      };
    }

    return {
      category: 'automation',
      likelyCause: '자동 분류 규칙에 걸리지 않은 실패',
      action: 'trace, screenshot, video로 실패 직전 화면 확인',
    };
  }

  private includesAny(source: string, keywords: string[]): boolean {
    return keywords.some(keyword => source.includes(keyword));
  }

  private cleanTitle(title: string): string {
    return title.replace(/:[a-z0-9_+-]+:/gi, '').replace(/\s+/g, ' ').trim();
  }

  private cleanError(error: string): string {
    return this.stripAnsi(error)
      .replace(/^Error:\s*/i, '')
      .replace(/\s+/g, ' ')
      .slice(0, 120);
  }

  private getFileName(filePath: string): string {
    return filePath.split(/[\\/]/).pop() || filePath;
  }

  private stripAnsi(text: string): string {
    return text
      .replace(/\u001b\[[0-9;]*m/g, '')
      .replace(/\[[0-9;]*m/g, '')
      .replace(/\[(3[0-9]|9[0-7]|2|22|39)m/g, '');
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
