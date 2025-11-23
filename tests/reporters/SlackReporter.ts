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
    this.total = suite.allTests().length;
    console.log("📝 테스트 시작 - 총 테스트 수:", this.total);
  }

  onTestEnd(test: TestCase, result: TestResult) {
  const failedStatuses = ['failed', 'timedOut', 'interrupted', 'crashed'];

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
    const allureUrl = process.env.ALLURE_REPORT_URL || '';
    const playwrightUrl = process.env.PLAYWRIGHT_REPORT_URL || '';
    const playwrightReportLink = playwrightUrl ? `\n*📊 Playwright 리포트: <${playwrightUrl}|결과 보기>*` : '';
    const lines = [
      '*Playwright 테스트 완료*',
      `*상태:* ${emoji} ${status}`,
      `*📝결과:* ${status}`,
      `*⏲️시작:* ${this.startTime}`,
      `*⏲️종료:* ${now}`,
      `*⏳총 소요:* ${Math.round(result.duration / 1000)}초`,
      '',
      `*총 테스트:* ${this.total} | *성공:* ${this.passed} | *실패:* ${this.failed} | *스킵:* ${this.skipped}`,
      playwrightReportLink,
      
    ];
    const text = lines.filter(Boolean).join('\n');

    const message = {
      text,
      attachments: [
        {
          color: status === 'PASSED' ? 'good' : 'danger',
          title: 'Test Results',
          fields: [
            { title: '✅Passed', value: `${this.passed}`, short: true },
            { title: '❌Failed', value: `${this.failed}`, short: true },
            { title: '⚠️Skipped', value: `${this.skipped}`, short: true },
          ],
        },
      ],
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