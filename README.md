# 🧪 Kurly UI 자동화 테스트 (Playwright)

> 엑셀 기반 테스트케이스를 활용한 마켓컬리 UI 검색 기능 자동화  
> CI/CD 환경에서 Allure Report, Slack 알림까지 통합한 실무형 테스트 파이프라인 구현

---

## ✅ 프로젝트 개요

- **대상 서비스**: [마켓컬리](https://www.kurly.com)
- **테스트 항목**:
  - 상품 검색 기능
  - 엑셀 기반 검색어 반복 테스트
  - 검색 결과 존재 여부 확인
- **기술 스택**:  
  `Playwright`, `TypeScript`, `Excel(xlsx)`, `Slack Webhook`, `Allure Report`, `GitHub Actions`

---
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
