  import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
  import dotenv from 'dotenv';
  import axios from 'axios';

  dotenv.config();

  class SlackReporter implements Reporter {
    private webhookUrl: string;
    private passed = 0;
    private failed = 0;
    private skipped = 0;
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

      // 실패 상태의 중간 retry만 제외 (skipped는 retry 안 하므로 항상 처리)
      if (failedStatuses.includes(result.status) && result.retry < test.retries) {
        return;
      }

      if (result.status === 'passed') {
        this.passed++;
      } else if (failedStatuses.includes(result.status)) {
        this.failed++;
        // 실패 상세 정보는 중복 없이 (같은 테스트가 여러 프로젝트에서 실패해도 1번만)
        if (!this.failedDetails.find(d => d.file === test.location.file && d.title === test.title)) {
          this.failedDetails.push({
            title: test.title,
            file: test.location?.file || '',
            error: result.errors?.[0]?.message?.split('\n')[0] || ''
          });
        }
      } else if (result.status === 'skipped') {
        this.skipped++;
      }
    }
    async onEnd(result: FullResult): Promise<void> {
      const passed = this.passed;
      const failed = this.failed;
      const skipped = this.skipped;
      const total = passed + failed + skipped;
      console.log("📊 테스트 완료 - 결과 집계:");
      console.log("- 전체:", total, "성공:", passed, "실패:", failed, "스킵:", skipped);

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
              text: `*✅ 성공:*\n${passed}`
            },
            {
              type: 'mrkdwn',
              text: `*❌ 실패:*\n${failed}`
            },
            {
              type: 'mrkdwn',
              text: `*⚠️ 스킵:*\n${skipped}`
            },
            {
              type: 'mrkdwn',
              text: `*📊 총 테스트:*\n${total}`
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