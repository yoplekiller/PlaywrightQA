import type { Reporter, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

class SlackReporter implements Reporter {
  private webhookUrl: string;
  private passed = 0;
  private failed = 0;
  private skipped = 0;

  constructor(options: { webhookUrl: string }) {
    this.webhookUrl = options.webhookUrl;
  }

  onTestEnd(test, result){
    if (result.status === 'passed') {
      this.passed++;
    } else if (result.status === 'failed') {
      this.failed++;
    } else if (result.status === 'skipped') {
      this.skipped++;
    } 
  }

  async onEnd(result: FullResult): Promise<void> {
    const status = result.status.toUpperCase();
    const emoji = status === 'PASSED' ? '✅' : '❌';


    const message = {
      text: `${emoji} *Playwright 테스트 완료*\n\n` +
            `*📝테스트 결과:* ${status}\n` +
            `*⏲️총 실행 시간:* ${Math.round(result.duration / 1000)}초`,
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