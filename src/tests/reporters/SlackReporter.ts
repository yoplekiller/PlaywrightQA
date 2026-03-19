import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface ProjectStat {
  passed: Set<string>;
  failed: Set<string>;
  skipped: Set<string>;
}

class SlackReporter implements Reporter {
  private webhookUrl: string;
  // 전체 집계: 최악 결과 우선 (HTML 리포트와 동일)
  private passedKeys = new Set<string>();
  private failedKeys = new Set<string>();
  private skippedKeys = new Set<string>();
  // 프로젝트별 독립 집계
  private projectStats = new Map<string, ProjectStat>();
  private startTime: string = '';
  private failedDetails: { title: string, file: string, error?: string }[] = [];

  constructor(options: { webhookUrl: string }) {
    this.webhookUrl = options.webhookUrl;
    console.log("🚀 SlackReporter 초기화됨");
    console.log("📡 웹훅 URL 설정됨:", this.webhookUrl ? "✅" : "❌");
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    console.log("📝 테스트 시작");
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const failedStatuses = ['failed', 'timedOut', 'interrupted', 'crashed'];

    // 실패 상태의 중간 retry만 제외
    if (failedStatuses.includes(result.status) && result.retry < test.retries) {
      return;
    }

    const key = test.location.file + '>' + test.title;
    const projectName = test.titlePath()[0] || 'unknown';

    // 프로젝트별 통계 초기화
    if (!this.projectStats.has(projectName)) {
      this.projectStats.set(projectName, {
        passed: new Set(),
        failed: new Set(),
        skipped: new Set(),
      });
    }
    const pStat = this.projectStats.get(projectName)!;

    if (result.status === 'passed') {
      // 프로젝트별: 이전에 실패한 적 없으면 passed
      if (!pStat.failed.has(key)) {
        pStat.passed.add(key);
      }
      // 전체: 다른 프로젝트에서 실패하지 않은 경우만 passed
      if (!this.failedKeys.has(key)) {
        this.passedKeys.add(key);
      }
    } else if (failedStatuses.includes(result.status)) {
      // 프로젝트별
      pStat.failed.add(key);
      pStat.passed.delete(key);
      // 전체: 어느 브라우저든 1번이라도 실패하면 실패 확정
      this.failedKeys.add(key);
      this.passedKeys.delete(key);

      if (!this.failedDetails.find(d => d.file === test.location.file && d.title === test.title)) {
        this.failedDetails.push({
          title: test.title,
          file: test.location?.file || '',
          error: result.errors?.[0]?.message?.split('\n')[0] || ''
        });
      }
    } else if (result.status === 'skipped') {
      // 프로젝트별
      if (!pStat.passed.has(key) && !pStat.failed.has(key)) {
        pStat.skipped.add(key);
      }
      // 전체
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
    console.log("📊 테스트 완료 - 결과 집계:");
    console.log("- 전체:", total, "성공:", passed, "실패:", failed, "스킵:", skipped);

    const status = result.status.toUpperCase();
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const emoji = status === 'PASSED' ? '✅' : '❌';
    const playwrightUrl = process.env.PLAYWRIGHT_REPORT_URL || '';

    // 프로젝트별 결과 텍스트 생성
    const projectLines = Array.from(this.projectStats.entries())
      .map(([name, stat]) => {
        const p = stat.passed.size;
        const f = stat.failed.size;
        const s = stat.skipped.size;
        const projectEmoji = f > 0 ? '❌' : '✅';
        const skipText = s > 0 ? ` / ⚠️ ${s}` : '';
        return `${projectEmoji} *${name}*: ✅ ${p} / ❌ ${f}${skipText}`;
      })
      .join('\n');

    const blocks: any[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${emoji} Playwright 테스트 완료`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*상태:*\n${status}` },
          { type: 'mrkdwn', text: `*총 소요:*\n${Math.round(result.duration / 1000)}초` },
          { type: 'mrkdwn', text: `*시작:*\n${this.startTime}` },
          { type: 'mrkdwn', text: `*종료:*\n${now}` }
        ]
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*✅ 성공:*\n${passed}` },
          { type: 'mrkdwn', text: `*❌ 실패:*\n${failed}` },
          { type: 'mrkdwn', text: `*⚠️ 스킵:*\n${skipped}` },
          { type: 'mrkdwn', text: `*📊 총 테스트:*\n${total}` }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📋 브라우저별 결과:*\n${projectLines}`
        }
      },
      { type: 'divider' }
    ];

    if (playwrightUrl) {
      blocks.push({
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📊 Playwright Report', emoji: true },
            url: playwrightUrl,
            style: 'primary'
          }
        ]
      });
    }

    const message = {
      blocks,
      text: `${emoji} Playwright 테스트 완료 - ${status} (성공: ${passed}, 실패: ${failed}, 총: ${total})`
    };

    try {
      await axios.post(this.webhookUrl, message);
      console.log('✅ Slack 메시지 전송 완료!');
    } catch (error) {
      console.error('❌ Slack 전송 실패:', error);
    }
  }
}

export default SlackReporter;
