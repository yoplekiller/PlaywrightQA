📄 Daum 우편번호 서비스 - 자동화 요소 문서

  🎯 1. 검색창 (Input)

  <input type="text"
         id="region_name"
         class="tf_keyword"
         name="region_name"
         title="주소 검색">

  Playwright Locator 옵션:
  - popup.locator('#region_name') ✅ 가장 안정적 (ID)   
  - popup.locator('.tf_keyword')
  - popup.locator('input[name="region_name"]')
  - popup.getByRole('textbox', { name: '주소 검색' })

  ---
  🔍 2. 검색 버튼

  <button type="button" class="btn_search">
      <span class="img_post">검색</span>
  </button>

  Playwright Locator 옵션:
  - popup.locator('.btn_search')
  - popup.locator('button.btn_search')
  - popup.getByRole('button').filter({ hasText: '검색' })

  또는 Enter 키 사용:
  - searchInput.press('Enter') ✅ 더 간단

  ---
  ❌ 3. 취소 버튼 (참고)

  <button type="button" class="btn_clear">
      <span class="img_post">취소</span>
  </button>

  Locator:
  - popup.locator('.btn_clear')

  ---
  📋 4. Form 구조

  <form id="searchForm" class="form_search">

  참고: Form submit 대신 Enter 키 사용 권장

  ---
  🎨 5. 팝업 컨테이너

  <div class="daum_popup focus_input focus_content">

  용도: 팝업이 로드되었는지 확인
  - popup.locator('.daum_popup').waitFor()

  ---
  💡 6. 검색 결과 영역

  <div class="popup_body" id="focusContent">

  참고: 검색 후 이 영역에 결과가 동적으로 로드됨
  - Inspector로 검색 후 구조 확인 필요!

  ---
  🚀 자동화 시나리오 흐름

  Step 1: 팝업 대기 및 접속

  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');

  Step 2: 검색창 찾기

  const searchInput = popup.locator('#region_name');
  await searchInput.waitFor({ state: 'visible' });

  Step 3: 주소 입력

  await searchInput.fill('방이동');

  Step 4: 검색 실행

  // 방법 1: Enter 키 (추천)
  await searchInput.press('Enter');

  // 방법 2: 버튼 클릭
  await popup.locator('.btn_search').click();

  Step 5: 검색 결과 대기

  await popup.waitForTimeout(2000);
  // 또는 결과 요소가 나타날 때까지 대기

  Step 6: 검색 결과 클릭

  ⚠️ 중요: 검색 후 결과 구조를 Inspector로 확인 필요!

  ---
  📌 TODO: 확인 필요한 부분

  ❓ 검색 결과 구조

  현재 HTML에는 검색 전 상태만 있음. 검색 후 구조 확인 필요:

  1. 테스트 실행 → 검색 후 pause()
  2. Inspector로 결과 목록 구조 확인
  3. 주소 항목의 클래스명/구조 파악

  확인할 것:
  - 결과 목록 컨테이너: class="???"
  - 각 주소 항목: <div> or <li> or <button>?
  - 클릭할 요소의 selector는?