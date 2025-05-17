# Test info

- Name:  검색 후  장바구니 담기가지 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:4:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.css-1dry2r1.e1c07x485').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.css-1dry2r1.e1c07x485').first()

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:25:31
```

# Page snapshot

```yaml
- link "지금 가입하고 최대 1만원 할인 쿠폰 받아가세요!":
  - /url: https://event.kurly.com/lego/event/2023/0911/join/coupon
- button "배너 하루 안보기":
  - img
  - text: 배너 하루 안보기
- text: 회원가입 로그인 고객센터
- img "마켓컬리 로고"
- button "마켓컬리"
- button "뷰티컬리"
- textbox "검색어를 입력해주세요"
- button "submit"
- button "찜하기"
- button "1"
- text: 카테고리
- list:
  - listitem: 신상품
  - listitem: 베스트
  - listitem: 알뜰쇼핑
  - listitem: 특가/혜택
- link "샛별·하루 배송안내":
  - /url: /user-guide/delivery
- heading "장바구니" [level=2]:
  - paragraph: 장바구니
- checkbox "전체선택 1/1" [checked]
- paragraph: 전체선택 1/1
- button "선택삭제":
  - paragraph: 선택삭제
- checkbox "샛별배송" [checked]
- paragraph: 샛별배송
- img
- paragraph: 상온 상품
- checkbox [checked]
- paragraph
- button:
  - img
- link "[오리온] 초코칩쿠키 256g":
  - /url: /goods/1000640850
  - paragraph: "[오리온] 초코칩쿠키 256g"
- paragraph:
  - img
  - text: 상온
- link:
  - /url: /goods/1000640850
- paragraph: 3,070원
- button [disabled]:
  - img
- paragraph: "1"
- button:
  - img
- paragraph: 상품 3,070원 + 배송비 3,000원
- paragraph: 6,070원
- paragraph: 결제금액
- paragraph: 상품금액
- paragraph: 3,070원
- paragraph: 상품할인금액
- paragraph: 0원
- paragraph: 로그인 후 할인 금액 적용
- paragraph: 배송비
- paragraph: 3,000원
- paragraph: 결제예정금액
- paragraph: 6,070원
- paragraph: 쿠폰/적립금은 주문서에서 사용 가능합니다
- button "로그인"
- paragraph: 고객행복센터
- strong: 1644-1107월~토요일 오전 7시 - 오후 6시
- button "카카오톡 문의"
- text: 월~토요일
- img
- text: 오전 7시 - 오후 6시 일/공휴일
- img
- text: 오전 7시 - 오후 1시
- button "1:1 문의"
- text: 365일 고객센터 운영시간에 순차적으로 답변드리겠습니다.
- link "대량주문 문의":
  - /url: https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform
- text: 월~금요일
- img
- text: 오전 9시 - 오후 6시 점심시간
- img
- text: "낮 12시 - 오후 1시 비회원 문의 :"
- link "help@kurlycorp.com":
  - /url: mailto:help@kurlycorp.com
- list:
  - listitem:
    - link "컬리소개":
      - /url: /introduce
  - listitem:
    - link "컬리소개영상":
      - /url: https://www.youtube.com/embed/WEep7BcboMQ?rel=0&showinfo=0&wmode=opaque&enablejsapi=1
  - listitem:
    - link "투자정보":
      - /url: https://ir.kurly.com
  - listitem:
    - link "인재채용":
      - /url: https://kurly.career.greetinghr.com
  - listitem:
    - link "이용약관":
      - /url: /user-terms/agreement
  - listitem:
    - link "개인정보처리방침":
      - /url: /user-terms/privacy-policy
  - listitem:
    - link "이용안내":
      - /url: /user-guide
- text: "법인명 (상호) : 주식회사 컬리 | 사업자등록번호 : 261-81-23567"
- link "사업자정보 확인":
  - /url: https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=
- text: "통신판매업 : 제 2018-서울강남-01646 호 주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) | 대표이사 : 김슬아 채용문의 :"
- link "recruit@kurlycorp.com":
  - /url: mailto:recruit@kurlycorp.com
- text: "팩스: 070 - 7500 - 6098"
- list:
  - link "컬리 인스타그램 바로가기":
    - /url: https://instagram.com/marketkurly
    - img "컬리 인스타그램 바로가기"
  - link "컬리 페이스북 바로가기":
    - /url: https://www.facebook.com/marketkurly
    - img "컬리 페이스북 바로가기"
  - link "컬리 네이버블로그 바로가기":
    - /url: https://blog.naver.com/marketkurly
    - img "컬리 네이버블로그 바로가기"
  - link "컬리 유튜브 바로가기":
    - /url: https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg
    - img "컬리 유튜브 바로가기"
- button "isms 로고 [인증범위] 컬리 쇼핑몰 서비스 개발·운영 (심사받지 않은 물리적 인프라 제외) [유효기간] 2025.01.15 ~ 2028.01.14":
  - img "isms 로고"
  - paragraph: "[인증범위] 컬리 쇼핑몰 서비스 개발·운영 (심사받지 않은 물리적 인프라 제외) [유효기간] 2025.01.15 ~ 2028.01.14"
- button "우리은행 로고 고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.":
  - img "우리은행 로고"
  - paragraph: 고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
- text: 컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다. 마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
- emphasis: © KURLY CORP. ALL RIGHTS RESERVED
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import{ getNowString } from '../../src/utils/dataFormat';
   3 |
   4 | test(' 검색 후  장바구니 담기가지 확인', async ({page}, testInfo) =>{
   5 |     await page.goto('https://www.kurly.com/main');
   6 |
   7 |     const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
   8 |     await searchBox.click();
   9 |     await searchBox.fill('과자');
  10 |     await searchBox.press('Enter');
  11 |     await page.waitForTimeout(2000);
  12 |
  13 |     const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
  14 |     await expect(firstProduct).toBeVisible();
  15 |     await firstProduct.click();
  16 |
  17 |     const cartButton = page.locator('button:has-text("장바구니 담기")');
  18 |     await expect(cartButton).toBeVisible();
  19 |     await cartButton.click();
  20 |     await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
  21 |
  22 |     await page.goto('https://www.kurly.com/cart');
  23 |     await expect(page).toHaveURL('https://www.kurly.com/cart');
  24 |     const cartProduct = page.locator('.css-1dry2r1.e1c07x485').first();
> 25 |     await expect(cartProduct).toBeVisible();
     |                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  26 |
  27 |     const cartItems = page.locator('.css-1dry2r1.e1c07x485');
  28 |     const cartItemCount = await cartItems.count();
  29 |     expect(cartItemCount).toBeGreaterThan(0);
  30 |     const now = getNowString();
  31 |
  32 |
  33 |     const browserName = testInfo.project.name;
  34 |     await page.screenshot({ path: `screenshots/cart_${now}.png` });
  35 |     await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
  36 |
  37 | })
  38 |
```