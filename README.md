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

## 📂 디렉토리 구조
```bash
📦project-root
 ┣ 📂tests
 ┃ ┣ 📂ui
 ┃ ┃ ┗ 📜search_excel.spec.ts
 ┣ 📂src
 ┃ ┗📂utils
 ┃
 ┃   ┗📜utils/excel_loader.ts
 ┣ 📂data
 ┃ ┗ 📜test_case.xlsx
 ┣ 📂screenshots
 ┣ 📂.github
 ┃ ┗ 📂workflows
 ┃   ┗ 📜ci.yml
 ┣ 📜playwright.config.ts
 ┣ 📜README.md
