import { test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('iframe 구조 확인 - 주소 검색', async ({ page }) => {
  const mainPage = new MainPage(page);

  // 1. 메인 페이지 접속
  await page.goto('https://www.kurly.com/main');
  console.log('✅ 메인 페이지 접속 완료');
  await page.waitForTimeout(2000);

  // 2. 주소 버튼 클릭
  await mainPage.clickAdressButton();
  console.log('✅ 주소 버튼 클릭 완료');
  await page.waitForTimeout(1000);

  // 3. 주소 검색 버튼 클릭
  await mainPage.adressSearchClick();
  console.log('✅ 주소 검색 버튼 클릭 완료');

  await page.waitForTimeout(2000);

  // 4. 페이지의 모든 iframe 찾기
  console.log('\n📦 === 페이지의 모든 iframe 확인 ===');
  const iframes = await page.locator('iframe').all();
  console.log(`총 iframe 개수: ${iframes.length}`);

  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes[i];
    const title = await iframe.getAttribute('title');
    const id = await iframe.getAttribute('id');
    const name = await iframe.getAttribute('name');
    const src = await iframe.getAttribute('src');

    console.log(`\n[iframe ${i}]`);
    console.log(`  - title: ${title}`);
    console.log(`  - id: ${id}`);
    console.log(`  - name: ${name}`);
    console.log(`  - src: ${src?.substring(0, 100)}...`);
  }

  // 5. 첫 번째 iframe 내부 확인
  if (iframes.length > 0) {
    console.log('\n📦 === 첫 번째 iframe 내부 확인 ===');
    const firstFrame = page.frameLocator('iframe').first();

    // 내부 iframe 찾기
    const innerIframes = await firstFrame.locator('iframe').all();
    console.log(`첫 번째 iframe 내부의 iframe 개수: ${innerIframes.length}`);

    for (let j = 0; j < innerIframes.length; j++) {
      const innerIframe = innerIframes[j];
      const title = await innerIframe.getAttribute('title');
      const id = await innerIframe.getAttribute('id');
      const name = await innerIframe.getAttribute('name');
      const src = await innerIframe.getAttribute('src');

      console.log(`\n[내부 iframe ${j}]`);
      console.log(`  - title: ${title}`);
      console.log(`  - id: ${id}`);
      console.log(`  - name: ${name}`);
      console.log(`  - src: ${src?.substring(0, 100)}...`);
    }
  }

  // 6. title로 iframe 찾기 시도
  console.log('\n📦 === title 속성으로 iframe 찾기 시도 ===');
  try {
    const frame1 = page.frameLocator('iframe[title="우편번호서비스 레이어 프레임"]');
    console.log('✅ "우편번호서비스 레이어 프레임" 찾음');

    const frame2 = frame1.frameLocator('iframe[title="우편번호 검색 프레임"]');
    console.log('✅ "우편번호 검색 프레임" 찾음');

    // 검색창이 있는지 확인
    const searchBox = frame2.getByRole('textbox');
    const isVisible = await searchBox.first().isVisible();
    console.log(`✅ 검색창 보임: ${isVisible}`);
  } catch (error) {
    console.log('❌ title로 iframe을 찾지 못함:', error);
  }

  // 7. 스크린샷 저장
  await page.screenshot({ path: 'screenshots/debug_iframe_structure.png', fullPage: true });
  console.log('\n📸 스크린샷 저장: screenshots/debug_iframe_structure.png');

  // 디버깅을 위해 페이지 유지
  await page.waitForTimeout(5000);
});
