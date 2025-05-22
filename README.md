# Kurly Auto QA with Playwright 🧪

## 📌 프로젝트 개요
마켓컬리 웹사이트의 주요 기능을 Playwright로 자동화한 테스트 프로젝트입니다.
--------------------------------------------
## **🔧대상 서비스**: [마켓컬리](https://www.kurly.com)
###  테스트 목록
- 🔍 검색 테스트
- 🛒 장바구니 담기/수량 증가
- 🚫 예외: 검색 결과 없음
- 🔧 API 응답 확인

- **기술 스택**:  
  `Playwright`, `TypeScript`, `Excel(xlsx)`, `Slack Webhook`, `Allure Report`, `GitHub Actions`
-------------------------------------

## ▶️ 실행 방법
```bash
npm install
npx playwright test
📄 결과 보고서
```

---------------------
<pre>
## 📂 디렉토리 구조
📦 PLAYWRIGHTQA
├── 📁.github
│   └── 📁workflows
│       └── 📜 ci.yml
├── 📁allure-report
├── 📁allure-results
├── 📁dist
├── 📁node_modules
├── 📁playwright-report
├── 📁screenshots
├── 📁src
│   └── 📁utils
│       ├── 📜 dataFormat.ts
│       └── 📜 excel_loader.ts
├── 📁test-results
├── 📁tests
│   └── 📁ui
│       ├── 📜 ui_10th_popup.spec.ts
│       ├── 📜 ui_beauty_btn.spec.ts
│       ├── 📜 ui_blank_search.spec.ts
│       ├── 📜 ui_cart_cancel.spec.ts
│       ├── 📜 ui_cart_product_cancel.spec.ts
│       ├── 📜 ui_category.spec.ts
│       ├── 📜 ui_login.spec.ts
│       ├── 📜 ui_product_cart.spec.ts
│       ├── 📜 ui_product_page.spec.ts
│       └── 📜 ui_search.spec.ts
├── 📜 .env
├── 📜 .gitignore
├── 📜 memo.md
├── 📜 package-lock.json
├── 📜 package.json
├── 📜 playwright.config.ts
├── 📜 README.md
├── 📜 tree.txt
└── 📜 tsconfig.json</pre>
