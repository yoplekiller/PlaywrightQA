/**
 * 테스트 로깅 유틸리티
 * 테스트 실행 중 상세한 로그를 출력하고 디버깅을 지원합니다.
 */

import { TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * 로그 레벨 정의
 */
export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

/**
 * 로그 색상 (콘솔 출력용)
 */
const LogColors = {
    DEBUG: '\x1b[36m',   // Cyan
    INFO: '\x1b[34m',    // Blue
    WARN: '\x1b[33m',    // Yellow
    ERROR: '\x1b[31m',   // Red
    SUCCESS: '\x1b[32m', // Green
    RESET: '\x1b[0m'
};

/**
 * 로그 아이콘
 */
const LogIcons = {
    DEBUG: '🔍',
    INFO: 'ℹ️',
    WARN: '⚠️',
    ERROR: '❌',
    SUCCESS: '✅'
};

/**
 * 테스트 로거 클래스
 */
export class TestLogger {
    private testInfo?: TestInfo;
    private logFilePath?: string;
    private enableFileLogging: boolean = true;
    private enableConsoleLogging: boolean = true;

    constructor(testInfo?: TestInfo, options?: {
        enableFileLogging?: boolean;
        enableConsoleLogging?: boolean;
    }) {
        this.testInfo = testInfo;
        this.enableFileLogging = options?.enableFileLogging ?? true;
        this.enableConsoleLogging = options?.enableConsoleLogging ?? true;

        if (this.enableFileLogging && testInfo) {
            this.initializeLogFile();
        }
    }

    /**
     * 로그 파일 초기화
     */
    private initializeLogFile() {
        const logsDir = path.join(process.cwd(), 'logs');

        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const testTitle = this.testInfo?.title.replace(/[^a-zA-Z0-9]/g, '_') || 'test';
        this.logFilePath = path.join(logsDir, `${testTitle}_${timestamp}.log`);

        this.writeToFile(`=== Test Log Started ===`);
        this.writeToFile(`Test: ${this.testInfo?.title}`);
        this.writeToFile(`Started at: ${new Date().toISOString()}`);
        this.writeToFile(`${'='.repeat(60)}\n`);
    }

    /**
     * 파일에 로그 작성
     */
    private writeToFile(message: string) {
        if (this.enableFileLogging && this.logFilePath) {
            fs.appendFileSync(this.logFilePath, `${message}\n`, 'utf-8');
        }
    }

    /**
     * 현재 시간 포맷팅
     */
    private getTimestamp(): string {
        const now = new Date();
        const time = now.toLocaleTimeString('ko-KR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        return `${time}.${ms}`;
    }

    /**
     * 로그 메시지 포맷팅
     */
    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = this.getTimestamp();
        return `[${timestamp}] ${LogIcons[level]} ${level.padEnd(7)} | ${message}`;
    }

    /**
     * 콘솔에 로그 출력
     */
    private logToConsole(level: LogLevel, message: string) {
        if (!this.enableConsoleLogging) return;

        const formattedMessage = this.formatMessage(level, message);
        const color = LogColors[level];
        console.log(`${color}${formattedMessage}${LogColors.RESET}`);
    }

    /**
     * 통합 로그 메서드
     */
    private log(level: LogLevel, message: string, data?: any) {
        const formattedMessage = this.formatMessage(level, message);

        // 콘솔 출력
        this.logToConsole(level, message);

        // 파일 출력
        this.writeToFile(formattedMessage);

        // 추가 데이터가 있으면 함께 출력
        if (data !== undefined) {
            const dataStr = typeof data === 'object'
                ? JSON.stringify(data, null, 2)
                : String(data);

            if (this.enableConsoleLogging) {
                console.log(dataStr);
            }
            this.writeToFile(dataStr);
        }
    }

    /**
     * DEBUG 레벨 로그
     */
    debug(message: string, data?: any) {
        this.log(LogLevel.DEBUG, message, data);
    }

    /**
     * INFO 레벨 로그
     */
    info(message: string, data?: any) {
        this.log(LogLevel.INFO, message, data);
    }

    /**
     * WARN 레벨 로그
     */
    warn(message: string, data?: any) {
        this.log(LogLevel.WARN, message, data);
    }

    /**
     * ERROR 레벨 로그
     */
    error(message: string, data?: any) {
        this.log(LogLevel.ERROR, message, data);
    }

    /**
     * SUCCESS 레벨 로그
     */
    success(message: string, data?: any) {
        this.log(LogLevel.SUCCESS, message, data);
    }

    /**
     * 스텝 시작 로그
     */
    stepStart(stepName: string) {
        this.info(`▶️  Step Started: ${stepName}`);
        this.writeToFile(`${'-'.repeat(60)}`);
    }

    /**
     * 스텝 종료 로그
     */
    stepEnd(stepName: string, duration?: number) {
        const durationStr = duration ? ` (${duration}ms)` : '';
        this.success(`✔️  Step Completed: ${stepName}${durationStr}`);
        this.writeToFile(`${'-'.repeat(60)}\n`);
    }

    /**
     * API 요청/응답 로그
     */
    logApiRequest(method: string, url: string, data?: any) {
        this.debug(`API Request: ${method} ${url}`, data);
    }

    logApiResponse(status: number, url: string, data?: any) {
        const level = status >= 200 && status < 300 ? LogLevel.SUCCESS : LogLevel.ERROR;
        this.log(level, `API Response: ${status} ${url}`, data);
    }

    /**
     * Locator 로그
     */
    logLocator(action: string, selector: string) {
        this.debug(`${action}: ${selector}`);
    }

    /**
     * 어설션 로그
     */
    logAssertion(description: string, result: boolean) {
        if (result) {
            this.success(`Assertion Passed: ${description}`);
        } else {
            this.error(`Assertion Failed: ${description}`);
        }
    }

    /**
     * 스크린샷 캡처 로그
     */
    logScreenshot(name: string, filePath: string) {
        this.info(`📸 Screenshot captured: ${name} -> ${filePath}`);
    }

    /**
     * 구분선 출력
     */
    separator(char: string = '=', length: number = 60) {
        const line = char.repeat(length);
        if (this.enableConsoleLogging) {
            console.log(line);
        }
        this.writeToFile(line);
    }

    /**
     * 테스트 종료 로그
     */
    finalize(passed: boolean) {
        this.separator();
        const status = passed ? 'PASSED ✅' : 'FAILED ❌';
        const message = `Test ${status}: ${this.testInfo?.title || 'Unknown Test'}`;

        if (passed) {
            this.success(message);
        } else {
            this.error(message);
        }

        this.writeToFile(`Ended at: ${new Date().toISOString()}`);
        this.writeToFile(`${'='.repeat(60)}`);

        if (this.logFilePath) {
            this.info(`📝 Log file saved: ${this.logFilePath}`);
        }
    }

    /**
     * 로그 파일 경로 반환
     */
    getLogFilePath(): string | undefined {
        return this.logFilePath;
    }
}

/**
 * 간단한 로거 생성 헬퍼 함수
 */
export function createLogger(testInfo?: TestInfo): TestLogger {
    return new TestLogger(testInfo);
}

/**
 * 글로벌 로거 (TestInfo 없이 사용)
 */
export const globalLogger = new TestLogger(undefined, {
    enableFileLogging: false,
    enableConsoleLogging: true
});
