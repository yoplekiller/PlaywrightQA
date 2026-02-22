# Playwright 공식 이미지 기반
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# 컨테이너 내부 작업 폴더를 /work로 설정
WORKDIR /work

# 패키지 매니저 파일만 먼저 복사(캐시 활용)
COPY package.json package-lock.json ./

# 의존성 설치(잠금파일 기준으로 재현성 있게 설치)
RUN npm ci

# Playwright 브라우저 설치
RUN npx playwright install --with-deps chromium

# 나머지 소스/테스트 코드 복사
COPY . .

# 기본 실행: Playwright 테스트 실행
CMD ["npx", "playwright", "test"]