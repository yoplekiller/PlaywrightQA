import type { Reporter, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

class SlackReporter implements Reporter {
  private webhookUrl: string;
  private passed = 0;
  private failed = 0;
  private skipped = 0;
  private failedTests: string[] = [];

  // 테스트 시작 시각 저장 (onBegin에서)
  // 전체 테스트 수 저장 (onBegin에서)
  // 실패 테스트의 파일명, 에러 메시지 저장 (onTestEnd에서)

  // --- onBegin 추가 ---
  private startTime: string = '';
  private total: number = 0;
  onBegin(config, suite) {
    this.startTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    this.total = suite.allTests().length;
  }


  private failedDetails: { title: string, file: string, error?: string }[] = [];
  onTestEnd(test, result) {
    if (result.status === 'passed') {
      this.passed++;
    } else if (result.status === 'failed') {
      this.failed++;
      this.failedTests.push(test.title);
      this.failedDetails.push({
        title: test.title,
        file: test.location?.file || '',
        error: result.errors && result.errors[0]?.message ? result.errors[0].message.split('\n')[0] : ''
      }); 
    } else if (result.status === 'skipped') {
      this.skipped++;
    } 
  }

  // --- onEnd 수정 ---
  async onEnd(result: FullResult): Promise<void> {
    const status = result.status.toUpperCase();
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const emoji = status === 'PASSED' ? '✅' : '❌';
    const allureUrl = process.env.ALLURE_REPORT_URL || '';
    const reportLink = allureUrl ? `\n*🔗 Allure 리포트: <${allureUrl}|바로가기>*` : '';
    let failedList = '';
    if (this.failedDetails.length > 0) {
      failedList = '\n\n*❌ 실패 테스트 목록:*\n' +
        this.failedDetails.map((t, i) => `${i + 1}. [${t.file}] ${t.title}${t.error ? `\n   - Error: ${t.error}` : ''}`).join('\n');
    }
    // 텍스트 조립을 별도 변수로 분리하여 가독성 개선
    const text =
      `${emoji} *Playwright 테스트 완료*\n\n` +
      `*📝결과:* ${status}\n` +
      `*⏲️시작:* ${this.startTime}\n` +
      `*⏲️종료:* ${now}\n` +
      `*⏳총 소요:* ${Math.round(result.duration / 1000)}초\n` +
      `\n*총 테스트:* ${this.total} | *성공:* ${this.passed} | *실패:* ${this.failed} | *스킵:* ${this.skipped}` +
      failedList +
      reportLink;
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