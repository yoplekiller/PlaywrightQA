  import type { Reporter, FullResult, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
  import dotenv from 'dotenv';
  import axios from 'axios';

  dotenv.config();

  class SlackReporter implements Reporter {
    private webhookUrl: string;
    private passedKeys = new Set<string>();
    private failedKeys = new Set<string>();
    private skippedKeys = new Set<string>();
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
      // 프로젝트명 제외한 파일경로+테스트명 기준으로 유니크 카운트
      const uniqueKeys = new Set(suite.allTests().map(t => t.location.file + '>' + t.title));
      this.total = uniqueKeys.size;
      console.log("📝 테스트 시작 - 총 테스트 수:", this.total);
    }

    onTestEnd(test: TestCase, result: TestResult) {
      const failedStatuses = ['failed', 'timedOut', 'interrupted', 'crashed'];

      // 최종 시도만 카운트 (retry 중간 결과 제외)
      if (failedStatuses.includes(result.status) && result.retry < test.retries) {
        return;
      }

      // 프로젝트명 제외한 유니크 키 (멀티 브라우저 중복 방지)
      const key = test.location.file + '>' + test.title;

      if (result.status === 'passed') {
        this.passedKeys.add(key);
        this.failedKeys.delete(key); // 재시도 후 통과 시 실패에서 제거
      } else if (failedStatuses.includes(result.status)) {
        if (!this.passedKeys.has(key)) {
          this.failedKeys.add(key);
          if (!this.failedDetails.find(d => d.file === test.location.file && d.title === test.title)) {
            this.failedDetails.push({
              title: test.title,
              file: test.location?.file || '',
              error: result.errors?.[0]?.message?.split('\n')[0] || ''
            });
          }
        }
      } else if (result.status === 'skipped') {
        this.skippedKeys.add(key);
      }
    }
    async onEnd(result: FullResult): Promise<void> {
      const passed = this.passedKeys.size;
      const failed = this.failedKeys.size;
      const skipped = this.skippedKeys.size;
      console.log("📊 테스트 완료 - 결과 집계:");
      console.log("- 전체:", this.total, "성공:", passed, "실패:", failed, "스킵:", skipped);

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
        text: `${emoji} Playwright 테스트 완료 - ${status} (성공: ${passed}, 실패: ${failed})`
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