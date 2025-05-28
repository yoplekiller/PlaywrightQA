import type { Reporter, FullResult } from '@playwright/test/reporter';
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
  }

  onBegin(config, suite) {
    this.startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    this.total = suite.allTests().length;
  }

  onTestEnd(test, result) {
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
    const status = result.status.toUpperCase();
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const emoji = status === 'PASSED' ? '✅' : '❌';
    const allureUrl = process.env.ALLURE_REPORT_URL || '';
    const playwrightUrl = process.env.PLAYWRIGHT_REPORT_URL || '';
    const reportLink = allureUrl ? `\n*🔗 Allure 리포트: <${allureUrl}|바로가기>*` : '';
    const playwrightReportLink = playwrightUrl ? `\n*📊 Playwright 리포트: <${playwrightUrl}|결과 보기>*` : '';
    let failedList = '';
    if (this.failedDetails.length > 0) {
      failedList = [
        '',
        '*❌ 실패 테스트 목록:*',
        ...this.failedDetails.map((t, i) => `${i + 1}. [${t.file}] ${t.title}${t.error ? `\n   - Error: ${t.error}` : ''}`)
      ].join('\n');
    }

    const lines = [
      `${emoji} *Playwright 테스트 완료*`,
      '',
      `*📝결과:* ${status}`,
      `*⏲️시작:* ${this.startTime}`,
      `*⏲️종료:* ${now}`,
      `*⏳총 소요:* ${Math.round(result.duration / 1000)}초`,
      '',
      `*총 테스트:* ${this.total} | *성공:* ${this.passed} | *실패:* ${this.failed} | *스킵:* ${this.skipped}`,
      failedList,
      reportLink,
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
          text: `${reportLink}${playwrightReportLink}`,
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