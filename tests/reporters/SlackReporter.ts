import type { Reporter, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

class SlackReporter implements Reporter {
  private webhookUrl: string;

  constructor(options: { webhookUrl: string }) {
    this.webhookUrl = options.webhookUrl;
  }

  async onEnd(result: FullResult) {
    const message = {
      text: `Test run completed with ${result.status}.`,
      attachments: [
        {
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
      console.log('Message sent to Slack');
    } catch (error) {
      console.error('Error sending message to Slack:', error);
    }
  }
}

module.exports = SlackReporter;