"""
Playwright 테스트 실행 및 디버깅 로거
테스트 실행 중 상세한 로그를 출력하고 결과를 분석합니다.
"""

import subprocess
import sys
import os
from datetime import datetime
import json
import re

class Colors:
    """터미널 색상 코드"""
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class PlaywrightLogger:
    def __init__(self, test_file=None, project=None, headed=False):
        self.test_file = test_file
        self.project = project
        self.headed = headed
        self.start_time = None
        self.end_time = None
        self.log_file = None

    def _get_timestamp(self):
        """현재 시간을 포맷팅하여 반환"""
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def _create_log_file(self):
        """로그 파일 생성"""
        if not os.path.exists('logs'):
            os.makedirs('logs')

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.log_file = f"logs/test_run_{timestamp}.log"

        with open(self.log_file, 'w', encoding='utf-8') as f:
            f.write(f"=== Playwright Test Log ===\n")
            f.write(f"Started: {self._get_timestamp()}\n")
            f.write(f"Test File: {self.test_file or 'All tests'}\n")
            f.write(f"Project: {self.project or 'All projects'}\n")
            f.write(f"{'=' * 50}\n\n")

    def _log(self, message, color=None, to_file=True):
        """콘솔과 파일에 로그 출력"""
        timestamp = self._get_timestamp()
        log_message = f"[{timestamp}] {message}"

        # 콘솔 출력
        if color:
            print(f"{color}{log_message}{Colors.ENDC}")
        else:
            print(log_message)

        # 파일 출력
        if to_file and self.log_file:
            with open(self.log_file, 'a', encoding='utf-8') as f:
                # ANSI 색상 코드 제거
                clean_message = re.sub(r'\033\[[0-9;]+m', '', log_message)
                f.write(f"{clean_message}\n")

    def _build_command(self):
        """Playwright 테스트 명령어 빌드"""
        cmd = ["npx", "playwright", "test"]

        if self.test_file:
            cmd.append(self.test_file)

        if self.project:
            cmd.extend(["--project", self.project])

        if self.headed:
            cmd.append("--headed")

        return cmd

    def _parse_test_result(self, line):
        """테스트 결과 라인 파싱 및 색상 적용"""
        line = line.strip()

        if not line:
            return None, None

        # 성공 케이스
        if line.startswith('✓') or line.startswith('ok') or '✅' in line:
            return Colors.OKGREEN, line

        # 실패 케이스
        if line.startswith('✗') or line.startswith('x ') or '❌' in line:
            return Colors.FAIL, line

        # 경고
        if 'warning' in line.lower() or '⚠️' in line:
            return Colors.WARNING, line

        # 환경변수 체크
        if '환경변수' in line or 'SLACK_WEBHOOK' in line:
            return Colors.OKCYAN, line

        # 에러
        if 'error' in line.lower() or 'failed' in line.lower():
            return Colors.FAIL, line

        # Running 정보
        if 'Running' in line:
            return Colors.OKBLUE, line

        # passed 정보
        if 'passed' in line:
            return Colors.OKGREEN, line

        return None, line

    def run(self):
        """테스트 실행"""
        self._create_log_file()
        self.start_time = datetime.now()

        # 헤더 출력
        print(f"\n{Colors.HEADER}{'=' * 60}{Colors.ENDC}")
        print(f"{Colors.HEADER}{Colors.BOLD}🧪 Playwright Test Runner with Logger{Colors.ENDC}")
        print(f"{Colors.HEADER}{'=' * 60}{Colors.ENDC}\n")

        self._log(f"📁 Test File: {self.test_file or 'All tests'}", Colors.OKBLUE)
        self._log(f"🎯 Project: {self.project or 'All projects'}", Colors.OKBLUE)
        self._log(f"👁️  Headed Mode: {self.headed}", Colors.OKBLUE)
        self._log(f"📝 Log File: {self.log_file}", Colors.OKCYAN)
        print()

        # 명령어 빌드 및 출력
        cmd = self._build_command()
        self._log(f"🚀 Running: {' '.join(cmd)}", Colors.BOLD)
        print(f"{Colors.HEADER}{'-' * 60}{Colors.ENDC}\n")

        try:
            # 테스트 실행
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding='utf-8',
                bufsize=1
            )

            # 실시간 출력
            for line in iter(process.stdout.readline, ''):
                if line:
                    color, parsed_line = self._parse_test_result(line)
                    self._log(parsed_line, color)

            process.wait()
            return_code = process.returncode

            # 종료 정보
            self.end_time = datetime.now()
            duration = (self.end_time - self.start_time).total_seconds()

            print(f"\n{Colors.HEADER}{'-' * 60}{Colors.ENDC}")

            if return_code == 0:
                self._log(f"✅ 테스트 성공!", Colors.OKGREEN)
            else:
                self._log(f"❌ 테스트 실패 (Exit Code: {return_code})", Colors.FAIL)

            self._log(f"⏱️  실행 시간: {duration:.2f}초", Colors.OKCYAN)
            self._log(f"📝 로그 파일: {self.log_file}", Colors.OKCYAN)

            print(f"{Colors.HEADER}{'=' * 60}{Colors.ENDC}\n")

            return return_code

        except KeyboardInterrupt:
            self._log("\n⚠️  사용자가 테스트를 중단했습니다.", Colors.WARNING)
            return 130

        except Exception as e:
            self._log(f"❌ 오류 발생: {str(e)}", Colors.FAIL)
            return 1

def main():
    """메인 함수"""
    import argparse

    parser = argparse.ArgumentParser(description='Playwright 테스트 디버깅 로거')
    parser.add_argument('-f', '--file', help='테스트 파일 경로 (예: src/tests/ui/ui_goods_add_and_verify.spec.ts)')
    parser.add_argument('-p', '--project', help='프로젝트 이름 (예: chromium, firefox, webkit)')
    parser.add_argument('--headed', action='store_true', help='Headed 모드로 실행')

    args = parser.parse_args()

    logger = PlaywrightLogger(
        test_file=args.file,
        project=args.project,
        headed=args.headed
    )

    exit_code = logger.run()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
