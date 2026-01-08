// import { test, expect } from '@playwright/test';
// import * as allure from 'allure-js-commons';
// import { AddressSearchPage } from '../../pages/AddressSearchPage';
// import { MainPage } from '../../pages/MainPage';
 

//     test('주소 검색 테스트', async ({ page }) => {
//         allure.description('주소 검색 팝업에서 주소를 검색하고 선택 후 저장하는 기능 테스트');


//         const addressSearchPage = new AddressSearchPage(page);
//         const mainPage = new MainPage(page);

//         const TEST_DATA = {
//           search: '방이동',
//           expected: '서울 송파구 가락로 232',
//           detail: '222'
//         }

//         await allure.step('마켓컬리 메인 페이지 접속 및 버튼 클릭', async () => {

//           await page.goto('https://www.kurly.com/main');

//           await mainPage.hoverAddressButton();

        
//         await allure.step('주소 검색 팝업에서 주소 검색 및 선택', async () => {
//           const page1Promise = page.waitForEvent('popup');
//           const page1 = await page1Promise;
//           const { popup, addressIframe } = await addressSearchPage.searchAddressInPopup(TEST_DATA.search);

          
//         await allure.step('검색 결과에서 주소 선택 및 상세주소 입력', async () => {
//           await addressSearchPage.selectAddressInPopup(
//             popup,
//             addressIframe,
//             TEST_DATA.expected,
//             TEST_DATA.detail
//           );
//         });

//         await allure.step('저장된 주소 확인', async () => {
//           await page.goto('https://www.kurly.com/main');
//           await mainPage.hoverAddressButton();
//           const isVisible = await page.getByText(TEST_DATA.expected).isVisible();
//           expect(isVisible).toBe(true);
//           const addressLocator = page.getByText(TEST_DATA.expected + " (" + TEST_DATA.detail + ")");
//           await expect(addressLocator).toBeVisible();

//       });
//     });
//   });
// });
