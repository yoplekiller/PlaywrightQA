  import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
  import dotenv from 'dotenv';
  import axios from 'axios';

  dotenv.config();

  class SlackReporter implements Reporter {
    private webhookUrl: string;
    private passed = 0;
    private failed = 0;
    private skipped = 0;
    private failedTests: string[] = [];
    private startTime: string = '';
    private total: number = 0;
    private failedDetails: { title: string, file: string, error?: string }[] = [];

    constructor(options: { webhookUrl: string }) {
      this.webhookUrl = options.webhookUrl;
      console.log("🚀 SlackReporter 초기화됨");
      console.log("📡 웹훅 URL 설정됨:", this.webhookUrl ? "✅" : "❌");
    }

    onBegin(config: FullConfig, suite: Suite) {
      this.startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      // 고유 테스트 수 계산 (프로젝트 중복 제거)
      const uniqueTitles = new Set(suite.allTests().map(t => t.titlePath().join(' > ')));
      this.total = suite.allTests().length; // 프로젝트별 실행 수 그대로
    console.log("📝 테스트 시작 - 총 테스트 수:", this.total);
    }

    onTestEnd(test: TestCase, result: TestResult) {
      const failedStatuses = ['failed', 'timedOut', 'interrupted', 'crashed'];

      // 최종 시도만 카운트 (retry 중간 결과 제외)
      if (failedStatuses.includes(result.status) && result.retry < test.retries) {
        return;
      }

      if (result.status === 'passed') {
        this.passed++;
      } else if (failedStatuses.includes(result.status)) {
        this.failed++;
        this.failedTests.push(test.title);
        this.failedDetails.push({
          title: test.title,
          file: test.location?.file || '',
          error: result.errors?.[0]?.message?.split('\n')[0] || ''
        });
      } else if (result.status === 'skipped') {
        this.skipped++;
      }
    }
    async onEnd(result: FullResult): Promise<void> {
      console.log("📊 테스트 완료 - 결과 집계:");
      console.log("- 전체:", this.total, "성공:", this.passed, "실패:", this.failed, "스킵:", this.skipped);

      const status = result.status.toUpperCase();
      const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      const emoji = status === 'PASSED' ? '✅' : '❌';
      const playwrightUrl = process.env.PLAYWRIGHT_REPORT_URL || '';

      // Block Kit 메시지 구성
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
            {
              type: 'mrkdwn',
              text: `*상태:*\n${status}`
            },
            {
              type: 'mrkdwn',
              text: `*총 소요:*\n${Math.round(result.duration / 1000)}초`
            },
            {
              type: 'mrkdwn',
              text: `*시작:*\n${this.startTime}`
            },
            {
              type: 'mrkdwn',
              text: `*종료:*\n${now}`
            }
          ]
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*✅ 성공:*\n${this.passed}`
            },
            {
              type: 'mrkdwn',
              text: `*❌ 실패:*\n${this.failed}`
            },
            {
              type: 'mrkdwn',
              text: `*⚠️ 스킵:*\n${this.skipped}`
            },
            {
              type: 'mrkdwn',
              text: `*📊 총 테스트:*\n${this.total}`
            }
          ]
        },
        {
          type: 'divider'
        }
      ];

      // 버튼 액션 블록 추가
      const buttons: any[] = [];

      if (playwrightUrl) {
        buttons.push({
          type: 'button',
          text: {
            type: 'plain_text',
            text: '📊 Playwright Report',
            emoji: true
          },
          url: playwrightUrl,
          style: 'primary'
        });
      }

      if (buttons.length > 0) {
        blocks.push({
          type: 'actions',
          elements: buttons
        });
      }

      const message = {
        blocks,
        // Fallback text for notifications
        text: `${emoji} Playwright 테스트 완료 - ${status} (성공: ${this.passed}, 실패: ${this.failed})`
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