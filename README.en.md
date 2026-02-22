# Playwright E2E Test Automation

[한국어](./README.md) | **English**

[![Playwright Tests](https://github.com/yoplekiller/PlaywrightQA/actions/workflows/playwright-test.yaml/badge.svg)](https://github.com/yoplekiller/PlaywrightQA/actions)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://docs.github.com/en/actions)

> E2E Test Automation for Kurly (Korean E-commerce) Website

[Live Test Report](https://yoplekiller.github.io/PlaywrightQA/playwright-report/index.html)

---

## Project Overview

QA Engineer portfolio — E2E test automation for Kurly, a live e-commerce site, using Playwright + TypeScript.

### Key Features

| Feature | Description |
|---------|-------------|
| **Page Object Model** | 7 page classes for structured automation |
| **Data-Driven Testing** | External test data management with ExcelJS |
| **Visual Regression** | Snapshot-based UI change detection |
| **Accessibility Testing** | WCAG 2.0 validation with axe-core |
| **CI/CD** | GitHub Actions with 8-hour scheduled runs |
| **Slack Notifications** | Real-time reporting via Block Kit UI |
| **Cross-Browser** | Simultaneous Chromium + Edge testing |
| **Auto Deployment** | HTML Report on GitHub Pages |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Playwright 1.52 |
| Language | TypeScript 5.8 |
| Browsers | Chromium, Edge |
| Reporting | Playwright HTML Report, Slack Block Kit |
| CI/CD | GitHub Actions |
| Data | ExcelJS |
| Accessibility | axe-core |

---

## Project Structure

```
PlaywrightQA/
├── .github/workflows/
│   └── playwright-test.yaml       # CI/CD Pipeline
│
├── src/
│   ├── pages/                     # Page Object Model
│   │   ├── BasePage.ts            # Common methods
│   │   ├── MainPage.ts            # Main (search, navigation)
│   │   ├── LoginPage.ts           # Login
│   │   ├── SearchPage.ts          # Search results
│   │   ├── GoodsPage.ts           # Product details
│   │   ├── CartPage.ts            # Shopping cart
│   │   └── PickPage.ts            # Favorites
│   │
│   ├── tests/
│   │   ├── ui/                    # UI Tests
│   │   │   ├── requires-auth/     # Auth required (4)
│   │   │   └── *.spec.ts          # General tests (13)
│   │   ├── data/
│   │   │   └── test_case.xlsx     # Test data
│   │   └── reporters/
│   │       └── SlackReporter.ts   # Slack reporter
│   │
│   └── utils/
│       ├── excel_loader.ts        # Excel loader
│       └── dataFormat.ts          # Format utilities
│
├── global.setup.ts                # Global setup (auth state, data conversion)
├── playwright.config.ts
└── package.json
```

---

## Installation & Execution

```bash
# Clone repository
git clone https://github.com/YopleKiller/PlaywrightQA.git
cd PlaywrightQA

# Install dependencies
npm install
npx playwright install --with-deps

# Run tests
npm test              # Run all
npm run test:ui       # UI tests only
npm run report        # Open report
```

### Environment Variables (.env)

```env
SLACK_WEBHOOK_TS=your_slack_webhook_url          # Optional
KURLY_EMAIL=your_email                           # For auth tests
KURLY_PASSWORD=your_password                     # For auth tests
```

---

## Test Cases

### UI Tests - General (13 tests)

| Test | Validation |
|------|------------|
| `ui_search` | Excel data-driven product search |
| `ui_blank_search` | Popup display on blank input |
| `ui_no_search_result` | No results message for non-existent product |
| `ui_goods_page` | Product detail page navigation |
| `ui_goods_cart` | Search → Detail → Add to cart |
| `ui_goods_duplicate` | Duplicate item quantity verification |
| `ui_beauty_btn` | Beauty Kurly button URL navigation |
| `ui_address_search` | Address search popup E2E flow |
| `ui_sort_button` | 6 sort tab iteration and validation |
| `ui_sort_price` | Price sorting result verification |
| `ui_visual_regression` | 4-page snapshot comparison (Visual Regression) |
| `ui_accessibility` | axe-core based WCAG accessibility audit |
| `ui_responsive` | Responsive layout verification across viewports |

### UI Tests - Auth Required (4 tests)

Excluded in CI with `testIgnore`. Runs via `chromium-auth` project using `storageState`.

| Test | Validation |
|------|------------|
| `ui_login` | Profile link display after login |
| `ui_favorite_toggle` | Product favorite toggle |
| `ui_goods_add_and_verify` | Login → Add to cart → Verify |
| `ui_pick_page` | Pick page access and alert check |

---

## Key Implementations

### Page Object Model

```
BasePage (common: goto, click, fill, hover, waitForSelector, takeScreenshot, setViewportSize)
  ├── MainPage      Search, navigation, address search popup
  ├── LoginPage     Login handling
  ├── SearchPage    Search results, sorting, price extraction
  ├── GoodsPage     Product details, cart, favorites
  ├── CartPage      Cart verification
  └── PickPage      Favorites page
```

### Data-Driven Testing

```typescript
const searchCases = await loadExcelFile('src/tests/data/test_case.xlsx');
for (const { tc_id, search_term } of searchCases) {
    await mainPage.searchGoods(search_term);
}
```

### Visual Regression

```typescript
await expect(page).toHaveScreenshot('main-page-full.png', {
    maxDiffPixelRatio: 0.15,
});
```

8 snapshots total — 4 per browser (Chromium + Edge).

### Slack Notifications

Automatic notification on test completion:
- Test status (PASSED / FAILED)
- Success/Fail/Skip counts
- Duration
- Direct link to Report

---

## CI/CD

### Triggers

- `main` branch push / PR
- Manual execution (`workflow_dispatch`)
- 8-hour scheduled runs

### Pipeline

```
Checkout → Install deps → Install browsers → Run tests
→ Upload artifacts → Deploy to GitHub Pages → Slack notification
```

### Optimizations

- npm + Playwright browser caching
- Parallel workers (2)
- **42.8% build time reduction**

---

## Playwright Configuration

| Setting | Value |
|---------|-------|
| Timeout | 70s |
| Retries | CI: 1 / Local: 0 |
| Viewport | 1920 x 1080 |
| Headless | true |
| Trace | retain-on-failure |
| Screenshot | only-on-failure |
| Video | retain-on-failure |
| Global Setup | Auth state saving + Excel → JSON conversion |

---

## Lessons Learned

- **Playwright**: Auto-wait reduces flaky tests, TypeScript type system benefits
- **CI/CD**: GitHub Actions Secrets management, caching strategies, GitHub Pages auto-deploy
- **Problem Solving**: xlsx → ExcelJS migration (security vulnerability), auth test separation for CI stability
- **Best Practices**: Focus on core scenarios, CI includes only fast and stable tests

---

## Related Projects

- [QATEST](https://github.com/yoplekiller/QATEST) - Python/Selenium Web + API Testing
- [woongjinAppTest](https://github.com/yoplekiller/woongjinAppTest) - Python/Appium Mobile Testing

---

## Author

**LIM JAE MIN**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: jmlim9244@gmail.com

---

## License

MIT License
