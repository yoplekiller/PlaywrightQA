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
| **Custom Fixtures** | Page Objects injected through Playwright fixtures |
| **Data-Driven Testing** | TS smoke data fixtures + ExcelJS external data example |
| **Accessibility Testing** | WCAG 2.0 validation with axe-core (requires 0 critical/serious violations) |
| **Visual Regression Testing** | Pixel-diff comparison of the header region, with Docker-generated baselines to match CI |
| **CI/CD** | GitHub Actions with 8-hour scheduled runs |
| **Slack Notifications** | Real-time reporting via Block Kit UI |
| **Cross-Browser** | Simultaneous Chromium + Edge testing |
| **Auto Deployment** | HTML Report on GitHub Pages |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Playwright 1.59 |
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
│   │   ├── setup/
│   │   │   └── auth.setup.ts     # Auth state setup
│   │   ├── ui/                    # UI Tests
│   │   │   ├── requires-auth/     # Auth-required tests
│   │   │   └── *.spec.ts          # General UI tests
│   │   ├── data/
│   │   │   ├── searchCases.ts     # Smoke search data
│   │   │   └── test_case.xlsx     # Excel data example
│   │   └── reporters/
│   │       └── SlackReporter.ts   # Slack reporter
│   │
│   ├── fixtures/
│   │   └── pages.ts               # Page Object fixtures
│   │
│   └── utils/
│       ├── excel_loader.ts        # Excel loader
│       └── dataFormat.ts          # Format utilities
│
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
npm test              # Chromium general UI tests
npm run test:ui       # Chromium general UI tests
npm run test:ui:all   # Chromium + Edge general UI tests
npm run test:smoke    # Core search smoke test
npm run test:auth     # Auth-required tests
npm run typecheck     # TypeScript typecheck
npm run report        # Open report
```

### Environment Variables (.env)

```env
SLACK_WEBHOOK_TS=your_slack_webhook_url          # Optional
KURLY_TEST_USER_EMAIL=your_email                 # For auth tests
KURLY_TEST_USER_PASSWORD=your_password           # For auth tests
```

---

## Test Cases

### UI Tests - General

| Test | Validation |
|------|------------|
| `ui_search` | TS fixture based product search smoke |
| `ui_blank_search` | Popup display on blank input |
| `ui_no_search_result` | No results message for non-existent product |
| `ui_goods_page` | Product detail page navigation |
| `ui_goods_cart` | Search → Detail → Add to cart |
| `ui_cart_quantity` | Cart quantity is 1 after adding a single item |
| `ui_goods_duplicate` | ⚠️ skip - Duplicate item quantity verification |
| `ui_guest_checkout_requires_login` | Guest cart shows a login button instead of a checkout button |
| `ui_beauty_btn` | Beauty Kurly button URL navigation |
| `ui_address_search` | Address search popup E2E flow |
| `ui_sort_button` | 6 sort tab iteration and validation |
| `ui_sort_price` | Price sorting result verification |
| `ui_accessibility` | axe-core based WCAG accessibility audit (requires 0 critical/serious violations) |
| `ui_responsive` | Responsive layout verification across viewports |
| `ui_visual_regression` | Visual regression check of the header/GNB region (separate workflow, weekly) |

### UI Tests - Auth Required

The `setup` project saves login state to `playwright/.auth/user.json`, and the `chromium-auth` project reuses it through `storageState`.

| Test | Validation |
|------|------------|
| `ui_login` | Profile link display after login |
| `ui_favorite_toggle` | Product favorite toggle |
| `ui_goods_add_and_verify` | Login → Add to cart → Verify |
| `ui_pick_page` | Pick page access with stored auth state |

---

## Key Implementations

### Page Object Model

```
BasePage (shared Page reference only)
  ├── MainPage      Search, navigation, address search popup
  ├── LoginPage     Login handling
  ├── SearchPage    Search results, sorting, price extraction
  ├── GoodsPage     Product details, cart, favorites
  ├── CartPage      Cart verification
  └── PickPage      Favorites page
```

### Data-Driven Testing

```typescript
import { searchCases } from '../data/searchCases';

for (const { tc_id, search_term } of searchCases) {
    await mainPage.searchGoods(search_term);
}
```

The ExcelJS-based `test_case.xlsx` and `excel_loader.ts` remain as an external QA data integration example.

### Slack Notifications

Automatic notification on test completion:
- Test status (PASSED / FAILED)
- Success/Fail/Skip counts (deduplicated by TC)
- Per-browser results (chromium / chromium-auth / Edge tracked independently)
- Start/end time, duration
- Direct link to Report

**Automatic failure classification**: when tests fail, the reporter analyzes the error pattern and classifies each failure into one of three categories — 🐞 Possible product defect / 🛠️ Automation code issue / 🌐 Possible environment issue — along with a category-specific action guide (`src/tests/reporters/SlackReporter.ts`). This shortens first-pass triage time when diagnosing a failure.

### Visual Regression Testing

Assertion-based tests check "is a specific condition true", but visual regression tests judge
differently — they compare a fresh screenshot against a saved **baseline** and measure the
**pixel diff ratio**.

- **Scope**: the header/GNB region only, not the full main page (fixed via `clip` coordinates).
  A full-page screenshot fails on nearly every run because of rotating promo banners and price
  changes — the header rarely changes outside a redesign, making it a stable target for
  "did the layout break unintentionally".
- **Pass criteria**: `maxDiffPixelRatio: 0.02` (up to 2% pixel difference passes). This tolerates
  minor anti-aliasing differences while still failing on real layout regressions, which a human
  then reviews via the diff image.
- **Baseline generation**: built inside the project's `Dockerfile` (official Playwright image,
  same Ubuntu base as CI) rather than locally on Windows — a baseline generated on a different
  OS would fail in CI every time due to font/anti-aliasing differences.
- **Separate CI**: runs weekly in its own `visual-regression.yaml` workflow, isolated from the
  main `Playwright Tests` badge — a UI redesign breaking this test won't turn the main badge red.

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

### AutoTC Integration (Automated Release Judgment)

The same workflow checks out the [AutoTC](https://github.com/yoplekiller/AutoTC) repo and runs `release_report.py` alongside it. It analyzes the Playwright results (`results.json`) to produce a Go / Caution / No-Go release judgment, sent to Slack separately from PlaywrightQA's own SlackReporter (failure classification) — within the same CI run, one message answers "what failed" (SlackReporter) and another answers "should we ship" (AutoTC).

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
| Auth Setup | setup project + `playwright/.auth/user.json` |

---

## Lessons Learned

- **Playwright**: Auto-wait reduces flaky tests, TypeScript type system benefits
- **CI/CD**: GitHub Actions Secrets management, caching strategies, GitHub Pages auto-deploy
- **Problem Solving**: xlsx → ExcelJS migration (security vulnerability), auth test separation for CI stability
- **Best Practices**: Focus on core scenarios, CI includes only fast and stable tests

---

## Related Projects

- [QATEST](https://github.com/yoplekiller/QATEST) - Python/Selenium Web UI Testing
- [KurlyApp](https://github.com/yoplekiller/KurlyApp) - Python/Appium Mobile Testing
- [AutoTC](https://github.com/yoplekiller/AutoTC) - AI-based Test Case Generation

---

## Author

**LIM JAE MIN**
- GitHub: [@YopleKiller](https://github.com/YopleKiller)
- Email: jmlim9244@gmail.com

---

## License

MIT License
