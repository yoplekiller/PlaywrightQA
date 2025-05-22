# Kurly Auto QA with Playwright 🧪

## 📌 프로젝트 개요
마켓컬리 웹사이트의 주요 기능을 Playwright로 자동화한 테스트 프로젝트입니다.

## **🔧대상 서비스**: [마켓컬리](https://www.kurly.com)
###  테스트 목록
- | 구분 | 설명 |
|------|------|
| 🔍 검색 테스트 | 키워드 입력 후 상품 검색 결과 노출 확인 |
| 🛒 장바구니 담기 / 수량 증가 | 수량 증가 버튼 클릭 후 수량 반영 확인 |
| 🚫 예외 처리 | 존재하지 않는 키워드 검색 시 "검색 결과 없음" 노출 |
| 🔧 API 응답 확인 | 인기 상품 API 응답 코드 및 데이터 유효성 확인 |


- **기술 스택**:  
  `Playwright`, `TypeScript`, `Excel(xlsx)`, `Slack Webhook`, `Allure Report`, `GitHub Actions`
-------------------------------------

## ▶️ 실행 방법

```bash
npm install
npx playwright test          # 기본 테스트 실행
npx playwright show-report   # HTML 리포트 확인
```

## 📄 Allure Report 실행 방법 (선택)

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---------------------
## 📂 디렉토리 구조 (중요 폴더 중심 정리)
<details> <summary>디렉토리 트리 보기</summary>
📦 PLAYWRIGHTQA
├── .github/workflows/ci.yml
├── screenshots/                    # 실패 시 스크린샷 저장
├── src/utils/                      # 날짜 포맷, Excel 로더
│   ├── dataFormat.ts
│   └── excel_loader.ts
├── tests/ui/                       # 테스트 시나리오 모음
│   ├── ui_search.spec.ts
│   ├── ui_cart_product_cancel.spec.ts
│   ├── ui_blank_search.spec.ts
│   └── ...
├── playwright.config.ts            # Playwright 설정
├── .env.example                    # 환경변수 템플릿
├── README.md</details>

## 🙋‍♂️ 작성자
**임재민 (Jaemin Lim)**
QA 자동화 & CI/CD 구축 경험
GitHub: github.com/yoplekiller

