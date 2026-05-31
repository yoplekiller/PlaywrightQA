import type { Page, TestInfo } from '@playwright/test';
import fs from 'fs/promises';

type LocatorDiagnostic = {
  testTitle: string;
  status: TestInfo['status'];
  expectedStatus: TestInfo['expectedStatus'];
  url: string;
  pageTitle: string;
  classification: FailureClassification;
  errorSummary: string;
  locatorCandidates: LocatorCandidate[];
};

type FailureType =
  | 'locator-or-wait-condition'
  | 'visual-baseline'
  | 'navigation-or-routing'
  | 'auth-or-session'
  | 'network-or-server'
  | 'assertion-data-mismatch'
  | 'unknown';

type OwnerHint = 'automation' | 'product' | 'environment' | 'needs-triage';

type FailureClassification = {
  failureType: FailureType;
  ownerHint: OwnerHint;
  recommendedAction: string;
};

type LocatorCandidate = {
  role: string | null;
  name: string;
  text: string;
  testId: string | null;
};

const LOCATOR_ERROR_PATTERNS = [
  'locator',
  'strict mode violation',
  'resolved to 0 elements',
  'element is not visible',
  'waiting for',
  'timeout',
  'toBeVisible',
  'toHaveText',
];

export async function attachLocatorDiagnostics(page: Page, testInfo: TestInfo): Promise<void> {
  if (testInfo.status === testInfo.expectedStatus) {
    return;
  }

  const errorSummary = getErrorSummary(testInfo);

  const diagnostic: LocatorDiagnostic = {
    testTitle: testInfo.title,
    status: testInfo.status,
    expectedStatus: testInfo.expectedStatus,
    url: page.url(),
    pageTitle: await page.title().catch(() => ''),
    classification: classifyFailure(errorSummary),
    errorSummary,
    locatorCandidates: await collectLocatorCandidates(page),
  };

  const diagnosticPath = testInfo.outputPath('locator-diagnostics.json');
  await fs.writeFile(diagnosticPath, JSON.stringify(diagnostic, null, 2));

  await testInfo.attach('locator-diagnostics', {
    path: diagnosticPath,
    contentType: 'application/json',
  });
}

function getErrorSummary(testInfo: TestInfo): string {
  const message = testInfo.errors[0]?.message ?? testInfo.error?.message ?? '';

  return message
    .split('\n')
    .find(line => line.trim().length > 0)
    ?.trim() ?? '';
}

function classifyFailure(errorSummary: string): FailureClassification {
  const lowerError = errorSummary.toLowerCase();

  if (LOCATOR_ERROR_PATTERNS.some(pattern => lowerError.includes(pattern))) {
    return {
      failureType: 'locator-or-wait-condition',
      ownerHint: 'automation',
      recommendedAction: 'Check the current DOM and update the Page Object locator or wait condition.',
    };
  }

  if (lowerError.includes('screenshot') || lowerError.includes('snapshot')) {
    return {
      failureType: 'visual-baseline',
      ownerHint: 'product',
      recommendedAction: 'Confirm whether the UI change is intended, then update the snapshot or register a visual regression bug.',
    };
  }

  if (lowerError.includes('tohaveurl')) {
    return {
      failureType: 'navigation-or-routing',
      ownerHint: 'automation',
      recommendedAction: 'Check whether the route changed, the navigation did not finish, or the URL expectation is too strict.',
    };
  }

  if (includesAny(lowerError, ['401', '403', 'storagestate', 'login', 'auth', 'unauthorized', 'forbidden'])) {
    return {
      failureType: 'auth-or-session',
      ownerHint: 'environment',
      recommendedAction: 'Check storageState, test account permissions, and required CI secrets.',
    };
  }

  if (includesAny(lowerError, ['500', '502', '503', '504', 'network', 'net::', 'econnreset', 'enotfound'])) {
    return {
      failureType: 'network-or-server',
      ownerHint: 'environment',
      recommendedAction: 'Retry once to confirm reproducibility, then check service availability and network logs.',
    };
  }

  if (includesAny(lowerError, ['expected', 'received', 'tohavetext', 'tohavevalue', 'tobelessthanorequal', 'tobegreaterthanorequal'])) {
    return {
      failureType: 'assertion-data-mismatch',
      ownerHint: 'needs-triage',
      recommendedAction: 'Compare the actual result with requirements, then decide whether to update test data or log a product defect.',
    };
  }

  return {
    failureType: 'unknown',
    ownerHint: 'needs-triage',
    recommendedAction: 'Use trace, screenshot, video, and locator candidates to inspect the state right before failure.',
  };
}

function includesAny(source: string, keywords: string[]): boolean {
  return keywords.some(keyword => source.includes(keyword));
}

async function collectLocatorCandidates(page: Page): Promise<LocatorCandidate[]> {
  return page.locator('button, a, input, [data-testid], [aria-label], [role]')
    .evaluateAll(elements => elements
      .slice(0, 40)
      .map(element => ({
        role: element.getAttribute('role'),
        name: element.getAttribute('aria-label') ?? element.getAttribute('name') ?? '',
        text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 120),
        testId: element.getAttribute('data-testid'),
      }))
      .filter(candidate => candidate.name || candidate.text || candidate.testId))
    .catch(() => []);
}
