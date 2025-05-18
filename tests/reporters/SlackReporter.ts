import type { Reporter, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

class SlackReporter implements Reporter {
  private webhookUrl: string;

  constructor(options: { webhookUrl: string }) {
    this.webhookUrl = options.webhookUrl;
  }

  async onEnd(result: FullResult): Promise<void> {
    const status = result.status.toUpperCase();
    const emoji = status === 'PASSED' ? '✅' : '❌';


    const message = {
      text: `${emoji} *Playwright 테스트 완료*\n\n` +
            `*상태:* ${status}\n` +
            `*총 실행 시간:* ${Math.round(result.duration / 1000)}초`,
      attachments: [
        {
          color: status === 'PASSED' ? 'good' : 'danger',
          title: 'Test Results',
          fields: [
            { title: 'Passed', value: `${result.status === 'passed' ? 1 : 0}`, short: true },
            { title: 'Failed', value: `${result.status === 'failed' ? 1 : 0}`, short: true },
            { title: 'Skipped', value: `${result.status === 'timedout' ? 1 : 0}`, short: true },
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