# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ IMPORTANT: Interaction Style

**The user wants to LEARN, not just get solutions.**

### DO:
- ✅ Provide **guidance and direction** ("Try this approach...")
- ✅ Give **hints and suggestions** ("Look into the Playwright API for...")
- ✅ Explain **concepts and patterns** ("Page Object Model works by...")
- ✅ Offer **step-by-step structure** ("1. First do X, 2. Then Y...")
- ✅ Review code **after user writes it**
- ✅ Answer **specific questions** when user is stuck

### DO NOT:
- ❌ Write complete code solutions
- ❌ Provide copy-paste ready code blocks
- ❌ Do the work for the user
- ❌ Write entire files or functions

### Example Interactions:

**❌ Bad (Don't do this):**
```
User: "Page Object Model 만들어줘"
Claude: [Writes complete 100-line code]
```

**✅ Good (Do this):**
```
User: "Page Object Model 만들어줘"
Claude:
"Page Object Model 구조 가이드:

1. src/pages/ 폴더에 페이지 클래스 만드세요
2. BasePage 상속받아서 공통 메서드 활용
3. 각 페이지별 locator 정의
4. 사용자 액션을 메서드로 만드세요

예시 구조:
class LoginPage extends BasePage {
  // 여기에 뭘 넣어야 할까요?
  // 힌트: locator와 action 메서드
}

직접 작성해보고 막히면 질문하세요!"
```

## Project Context

**프로젝트명:** PlaywrightQA
**목적:** E2E 테스트 자동화 프레임워크 (마켓컬리 UI + TMDB API)

**기술 스택:**
- Playwright 1.52.0
- TypeScript 5.8.3
- Allure Report
- GitHub Actions CI/CD

**최근 완료 작업:**
- 2026-01-08: CI/CD 성능 개선 (빌드 시간 42.8% 단축)

**다음 목표:**
- Page Object Model 패턴 완성 (현재 50% → 100%)
- 크로스 브라우저 테스트
- 테스트 커버리지 확대

## Code Standards

- Page Object Model 패턴 사용
- TypeScript strict mode
- 명확한 함수/변수명 (한글 주석 OK)
- 테스트 격리 원칙 준수

## Important Files

- `.github/workflows/playwright-test.yaml` - CI/CD 설정
- `src/pages/` - Page Object Model
- `src/tests/ui/` - UI 테스트
- `src/tests/api/` - API 테스트
- `docs/` - 프로젝트 문서

## User's Learning Style

**The user prefers:**
1. Understanding over quick solutions
2. Hands-on coding practice
3. Step-by-step guidance
4. Learning by doing

**Help the user by:**
- Encouraging experimentation
- Asking guiding questions
- Pointing to documentation
- Reviewing their code attempts
