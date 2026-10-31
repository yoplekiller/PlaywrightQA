# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src/tests/ui/ui_cart_payment_mock.spec.ts >> 장바구니 결제금액 계산 (API 목킹) >> 무료배송(배송비 0원) 표기가 결제금액 패널과 상품 요약 줄에서 일치해야 한다 @regression
- Location: src/tests/ui/ui_cart_payment_mock.spec.ts:74:9

# Error details

```
Error: 결제금액 패널은 "0원", 상품 카드 요약은 "무료"로 배송비 표기가 서로 다릅니다.

expect(received).toBe(expected) // Object.is equality

Expected: "0원"
Received: "무료"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e5]:
      - link "지금 가입하고 최대 1만 2천원 할인 쿠폰 받아가세요!" [ref=e6] [cursor=pointer]:
        - /url: https://event.kurly.com/lego/event/2023/0911/join/coupon#lc112b1
        - generic [ref=e7]: 지금 가입하고 최대 1만 2천원 할인 쿠폰 받아가세요!
      - button "배너 하루 안보기" [ref=e8] [cursor=pointer]:
        - img [ref=e9]
        - generic [ref=e14]: 배너 하루 안보기
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18] [cursor=pointer]: 회원가입
          - generic [ref=e20] [cursor=pointer]: 로그인
          - generic [ref=e23] [cursor=pointer]: 고객센터
        - generic [ref=e25]:
          - generic [ref=e26]:
            - link [ref=e27] [cursor=pointer]:
              - /url: /main
              - img [ref=e28]
            - button "마켓컬리" [ref=e32] [cursor=pointer]
            - button "뷰티컬리" [ref=e33] [cursor=pointer]
          - generic [ref=e35]:
            - textbox "검색어를 입력해주세요" [ref=e36]
            - button "submit" [ref=e37] [cursor=pointer]
          - generic [ref=e38]:
            - button [disabled] [ref=e39]:
              - img [ref=e40]
            - button [ref=e43] [cursor=pointer]:
              - img [ref=e44]
            - button "1" [ref=e46] [cursor=pointer]:
              - img [ref=e47]
              - generic [ref=e50]: "1"
      - generic [ref=e52]:
        - button "카테고리" [ref=e54] [cursor=pointer]:
          - img [ref=e55]
          - generic [ref=e57]: 카테고리
        - generic [ref=e58]:
          - list [ref=e59]:
            - listitem [ref=e60]:
              - link "베스트" [ref=e61] [cursor=pointer]:
                - /url: /collection-groups/market-best-category?site=MARKET
            - listitem [ref=e62]:
              - link "세일" [ref=e63] [cursor=pointer]:
                - /url: /collection-groups/market-sales-group?site=MARKET
            - listitem [ref=e64]:
              - link "패션" [ref=e65] [cursor=pointer]:
                - /url: /panels/fashion?site=MARKET
            - listitem [ref=e66]:
              - link "리빙" [ref=e67] [cursor=pointer]:
                - /url: /panels/living?site=MARKET
            - listitem [ref=e68]:
              - link "신상" [ref=e69] [cursor=pointer]:
                - /url: /collection-groups/market-newproduct?site=MARKET
            - listitem [ref=e70]:
              - link "특가/혜택" [ref=e71] [cursor=pointer]:
                - /url: /market-benefit
          - link "샛별·하루 배송안내" [ref=e72] [cursor=pointer]:
            - /url: /user-guide/delivery
            - generic [ref=e73]: 샛별·하루
            - generic [ref=e74]: 배송안내
    - generic [ref=e76]:
      - heading "장바구니" [level=2] [ref=e77]:
        - paragraph [ref=e78]: 장바구니
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e82]:
            - generic [ref=e83] [cursor=pointer]:
              - checkbox "전체선택 1/1" [checked] [ref=e84]
              - paragraph [ref=e86]: 전체선택 1/1
            - button "선택삭제" [ref=e87] [cursor=pointer]:
              - paragraph [ref=e88]: 선택삭제
          - generic [ref=e89]:
            - generic [ref=e92] [cursor=pointer]:
              - checkbox "샛별배송" [checked] [ref=e93]
              - paragraph [ref=e95]: 샛별배송
            - generic [ref=e97]:
              - generic [ref=e98]:
                - img [ref=e100]
                - paragraph [ref=e102]: 냉동 상품
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - generic [ref=e106] [cursor=pointer]:
                    - checkbox [checked] [ref=e107]
                    - paragraph
                  - button [ref=e109] [cursor=pointer]:
                    - img [ref=e110]
                - generic [ref=e112]:
                  - link "[지엔씨푸드] 100% 과육 수박주스 1L" [ref=e114] [cursor=pointer]:
                    - /url: /goods/1001397032
                    - paragraph [ref=e116]: "[지엔씨푸드] 100% 과육 수박주스 1L"
                  - generic [ref=e117]:
                    - link [ref=e119] [cursor=pointer]:
                      - /url: /goods/1001397032
                    - generic [ref=e121]:
                      - generic [ref=e124]:
                        - generic [ref=e125]: 5,820원
                        - generic [ref=e126]: 6,470원
                      - generic [ref=e128]:
                        - img [ref=e130]
                        - button "Stepper minus" [disabled] [ref=e132]
                        - paragraph [ref=e133]: "1"
                        - img [ref=e135]
                        - button "Stepper plus" [ref=e137] [cursor=pointer]
            - generic [ref=e138]:
              - paragraph [ref=e139]: 상품 5,820원 + 배송비 무료
              - paragraph [ref=e140]: 5,820원
        - generic [ref=e141]:
          - generic [ref=e142]:
            - paragraph [ref=e143]: 결제금액
            - generic [ref=e144]:
              - generic [ref=e145]:
                - paragraph [ref=e146]: 상품 금액
                - paragraph [ref=e147]: 30,000원
              - generic [ref=e148]:
                - paragraph [ref=e149]: 상품 할인 금액
                - paragraph [ref=e151]: 0원
              - generic [ref=e152]:
                - paragraph [ref=e153]: 쿠폰 할인 금액
                - paragraph [ref=e154]: 로그인 후 확인
              - generic [ref=e155]:
                - generic [ref=e156]:
                  - paragraph [ref=e157]: 배송비
                  - button [ref=e158] [cursor=pointer]:
                    - img [ref=e159]
                - paragraph [ref=e163]: 0원
            - generic [ref=e164]:
              - paragraph [ref=e165]: 결제예정금액
              - paragraph [ref=e166]: 30,000원
            - paragraph [ref=e167]:
              - text: 로그인하고
              - paragraph [ref=e168]: 쿠폰 최대 할인
              - text: 을 받아보세요
          - button "로그인" [ref=e169] [cursor=pointer]
    - generic [ref=e170]:
      - generic [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]:
            - paragraph [ref=e174]: 고객행복센터
            - strong [ref=e175]: 1644-1107월~토요일 오전 7시 - 오후 6시
            - generic [ref=e176]:
              - generic [ref=e177]:
                - button "카카오톡 문의" [ref=e178] [cursor=pointer]
                - generic [ref=e179]:
                  - text: 월~토요일
                  - img [ref=e180]
                  - text: 오전 7시 - 오후 6시
                  - text: 일/공휴일
                  - img [ref=e181]
                  - text: 오전 7시 - 오후 1시
              - generic [ref=e182]:
                - button "1:1 문의" [ref=e183] [cursor=pointer]
                - generic [ref=e184]:
                  - text: 365일
                  - text: 고객센터 운영시간에 순차적으로 답변드리겠습니다.
              - generic [ref=e185]:
                - link "대량주문 문의" [ref=e186] [cursor=pointer]:
                  - /url: https://docs.google.com/forms/d/e/1FAIpQLScWcjRuN6eWJK-G8x3NwBfE8IyKZIOq7jhD3fUXuKSWwPqzJw/viewform
                - generic [ref=e187]:
                  - text: 월~금요일
                  - img [ref=e188]
                  - text: 오전 9시 - 오후 6시
                  - text: 점심시간
                  - img [ref=e189]
                  - text: 낮 12시 - 오후 1시
            - generic [ref=e190]:
              - text: "비회원 문의 :"
              - link "help@kurlycorp.com" [ref=e191] [cursor=pointer]:
                - /url: mailto:help@kurlycorp.com
          - generic [ref=e192]:
            - list [ref=e193]:
              - listitem [ref=e194]:
                - link "회사소개" [ref=e195] [cursor=pointer]:
                  - /url: https://newsroom.kurlycorp.com/
              - listitem [ref=e196]:
                - link "컬리소개영상" [ref=e197] [cursor=pointer]:
                  - /url: https://www.youtube.com/embed/WEep7BcboMQ?rel=0&showinfo=0&wmode=opaque&enablejsapi=1
              - listitem [ref=e198]:
                - link "투자정보" [ref=e199] [cursor=pointer]:
                  - /url: https://newsroom.kurlycorp.com/ir/%ec%9e%ac%eb%ac%b4%ec%a0%95%eb%b3%b4/
              - listitem [ref=e200]:
                - link "인재채용" [ref=e201] [cursor=pointer]:
                  - /url: https://kurly.career.greetinghr.com
              - listitem [ref=e202]:
                - link "이용약관" [ref=e203] [cursor=pointer]:
                  - /url: /user-terms/agreement
              - listitem [ref=e204]:
                - link "개인정보처리방침" [ref=e205] [cursor=pointer]:
                  - /url: https://privacy.kurly.com/kurly/privacypolicy
              - listitem [ref=e206]:
                - link "이용안내" [ref=e207] [cursor=pointer]:
                  - /url: /user-guide
              - listitem [ref=e208]:
                - link "입점신청" [ref=e209] [cursor=pointer]:
                  - /url: https://docs.google.com/forms/d/e/1FAIpQLScKI_Kd1lQAp68r-SIhiOWj0J43C99IvNbgFeT7-X9YLIqteA/viewform?usp=dialog
            - generic [ref=e210]:
              - text: "법인명 (상호) : 주식회사 컬리"
              - generic [ref=e211]: "|"
              - text: "사업자등록번호 : 261-81-23567"
              - link "사업자정보 확인" [ref=e212] [cursor=pointer]:
                - /url: https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=
              - text: "통신판매업 : 제 2018-서울강남-01646 호"
              - text: "주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)"
              - generic [ref=e213]: "|"
              - text: "대표이사 : 김슬아"
              - text: "채용문의 :"
              - link "recruit@kurlycorp.com" [ref=e214] [cursor=pointer]:
                - /url: mailto:recruit@kurlycorp.com
              - text: "팩스: 070 - 7500 - 6098"
            - list [ref=e215]:
              - listitem [ref=e216]:
                - link "컬리 인스타그램 바로가기" [ref=e217] [cursor=pointer]:
                  - /url: https://instagram.com/marketkurly
                  - img "컬리 인스타그램 바로가기" [ref=e218]
              - listitem [ref=e219]:
                - link "컬리 페이스북 바로가기" [ref=e220] [cursor=pointer]:
                  - /url: https://www.facebook.com/marketkurly
                  - img "컬리 페이스북 바로가기" [ref=e221]
              - listitem [ref=e222]:
                - link "컬리 네이버블로그 바로가기" [ref=e223] [cursor=pointer]:
                  - /url: https://blog.naver.com/marketkurly
                  - img "컬리 네이버블로그 바로가기" [ref=e224]
              - listitem [ref=e225]:
                - link "컬리 유튜브 바로가기" [ref=e226] [cursor=pointer]:
                  - /url: https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg
                  - img "컬리 유튜브 바로가기" [ref=e227]
        - generic [ref=e228]:
          - button "isms 로고 [인증범위] 컬리 쇼핑몰 서비스 개발·운영 (심사받지 않은 물리적 인프라 제외) [유효기간] 2025.01.15 ~ 2028.01.14" [ref=e229] [cursor=pointer]:
            - img "isms 로고" [ref=e230]
            - paragraph [ref=e231]:
              - text: "[인증범위] 컬리 쇼핑몰 서비스 개발·운영"
              - text: (심사받지 않은 물리적 인프라 제외)
              - text: "[유효기간] 2025.01.15 ~ 2028.01.14"
          - button "우리은행 로고 고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다." [ref=e232] [cursor=pointer]:
            - img "우리은행 로고" [ref=e233]
            - paragraph [ref=e234]:
              - text: 고객님이 현금으로 결제한 금액에 대해 우리은행과
              - text: 채무지급보증 계약을 체결하여 안전거래를 보장하고
              - text: 있습니다.
      - generic [ref=e235]:
        - text: 컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
        - text: 마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
        - emphasis [ref=e236]: © KURLY CORP. ALL RIGHTS RESERVED
  - alert [ref=e237]
```

# Test source

```ts
  14  |     private readonly deliveryPriceValue: Locator;
  15  |     private readonly totalPaymentPriceValue: Locator;
  16  |     private readonly summaryLine: Locator;
  17  |     private readonly serverErrorModal: Locator;
  18  |     private readonly serverErrorModalConfirmButton: Locator;
  19  | 
  20  | 
  21  |   constructor(page: Page) {
  22  |     super(page);
  23  |     this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
  24  |     this.addGoodsButton = page.getByRole('button', { name: /장바구니 담기/i })
  25  |     this.checkoutLoginButton = page.getByRole('button', { name: '로그인' });
  26  |     this.checkoutButton = page.getByRole('button', { name: /결제하기|구매하기|주문하기/ });
  27  | 
  28  |     // 장바구니 상품 수량 증감 버튼. 접근성 이름이 영문 "Stepper minus/plus"로 고정되어 있어
  29  |     // 배포마다 바뀌는 해시 클래스 대신 이 이름으로 잡는다. 담긴 상품이 1개라는 전제로 first() 사용.
  30  |     this.decreaseItemQuantityButton = page.getByRole('button', { name: 'Stepper minus' }).first();
  31  |     this.increaseItemQuantityButton = page.getByRole('button', { name: 'Stepper plus' }).first();
  32  | 
  33  |     // 수량 표시는 감소 버튼 바로 다음 형제 <p>로 렌더링된다. 이 요소를 직접 지정해야
  34  |     // "전체선택 1/1"처럼 페이지 내 다른 곳에 나타나는 동일한 텍스트("1")와 겹치지 않는다.
  35  |     this.itemQuantityText = this.decreaseItemQuantityButton.locator('xpath=following-sibling::p[1]');
  36  | 
  37  |     // 결제금액 패널의 각 항목 값. 라벨 바로 다음 형제가 아니라 "라벨 뒤에 오는 가장 가까운
  38  |     // <p>"로 잡는다(xpath following, following-sibling 아님) - 배송비처럼 라벨이 안내
  39  |     // 아이콘 버튼과 한 겹 더 감싸인 wrapper 안에 있어서 형제 관계가 항목마다 다른데,
  40  |     // CSS-in-JS 해시 클래스 없이도 라벨→값 순서만으로 안정적으로 값을 잡을 수 있다.
  41  |     this.productPriceValue = page.getByText('상품 금액', { exact: true }).locator('xpath=following::p[1]');
  42  |     this.deliveryPriceValue = page.getByText('배송비', { exact: true }).locator('xpath=following::p[1]');
  43  |     this.totalPaymentPriceValue = page.getByText('결제예정금액', { exact: true }).locator('xpath=following::p[1]');
  44  | 
  45  |     // 상품 카드 하단의 압축 요약 줄("상품 N원 + 배송비 N원/무료")
  46  |     this.summaryLine = page.getByText(/^상품 .+ \+ 배송비 /);
  47  | 
  48  |     this.serverErrorModal = page.getByText('서버 오류', { exact: true });
  49  |     this.serverErrorModalConfirmButton = this.serverErrorModal.locator('xpath=following::button[1]');
  50  |   }
  51  | 
  52  |   async expectCheckoutRequiresLogin() {
  53  |     await expect(this.checkoutLoginButton).toBeVisible({ timeout: 5000 });
  54  |     await expect(this.checkoutButton).toHaveCount(0);
  55  |   }
  56  | 
  57  |   async clickAddGoodsButton() {
  58  |     await this.addGoodsButton.click();
  59  |   }
  60  | 
  61  |   async expectGoodsQuantity(quantity: number) {
  62  |     await expect(this.page.getByText(String(quantity), { exact: true })).toBeVisible();
  63  |   }
  64  | 
  65  |   async expectGoodsVisible(goodsName: string) {
  66  |     await expect(this.page.getByText(goodsName)).toBeVisible({ timeout: 5000 });
  67  |   }
  68  | 
  69  |   async expectCartEmpty() {
  70  |     await expect(this.EmptyCartText).toBeVisible({ timeout: 5000 });
  71  |   }
  72  | 
  73  |   async expectCartNotEmpty() {
  74  |     await expect(this.EmptyCartText).toBeHidden({ timeout: 5000 });
  75  |   }
  76  | 
  77  |   async clickDecreaseItemQuantity() {
  78  |     await this.decreaseItemQuantityButton.click({ force: true });
  79  |   }
  80  | 
  81  |   // 스테퍼 옆에 표시되는 실제 수량 값을 확인한다 (전체선택 카운트 등 페이지의 다른 "1"과 무관).
  82  |   async expectItemQuantity(quantity: number) {
  83  |     await expect(this.itemQuantityText).toHaveText(String(quantity), { timeout: 5000 });
  84  |   }
  85  | 
  86  |   // 경계값 테스트: 수량이 최소값(1)일 때 감소 버튼이 비활성화되어 0 이하로 내려가지 않아야 한다.
  87  |   async expectDecreaseItemQuantityDisabled() {
  88  |     await expect(this.decreaseItemQuantityButton).toBeDisabled({ timeout: 5000 });
  89  |   }
  90  | 
  91  |   // 결제금액 패널이 payment/calculate 응답 데이터를 실제로 반영하고 있는지 확인한다.
  92  |   async expectPaymentSummary(opts: { productPrice: string; deliveryPrice: string; totalPaymentPrice: string }) {
  93  |     await expect(this.productPriceValue).toHaveText(opts.productPrice, { timeout: 5000 });
  94  |     await expect(this.deliveryPriceValue).toHaveText(opts.deliveryPrice, { timeout: 5000 });
  95  |     await expect(this.totalPaymentPriceValue).toHaveText(opts.totalPaymentPrice, { timeout: 5000 });
  96  |   }
  97  | 
  98  |   // payment/calculate 호출이 실패했을 때 "서버 오류" 안내 모달이 뜨는지 확인하고 닫는다.
  99  |   async expectServerErrorModalAndDismiss() {
  100 |     await expect(this.serverErrorModal).toBeVisible({ timeout: 5000 });
  101 |     await this.serverErrorModalConfirmButton.click();
  102 |     await expect(this.serverErrorModal).toBeHidden({ timeout: 5000 });
  103 |   }
  104 | 
  105 |   // 결제금액 패널의 배송비 값과 상품 카드 하단 요약 줄의 배송비 표기가 서로 일치하는지 확인한다.
  106 |   async expectDeliveryPriceConsistentAcrossPanels() {
  107 |     const panelText = (await this.deliveryPriceValue.textContent())?.trim() ?? '';
  108 |     const summaryText = (await this.summaryLine.textContent()) ?? '';
  109 |     const summaryDeliveryPart = summaryText.split('+ 배송비 ')[1]?.trim() ?? '';
  110 | 
  111 |     expect(
  112 |       summaryDeliveryPart,
  113 |       `결제금액 패널은 "${panelText}", 상품 카드 요약은 "${summaryDeliveryPart}"로 배송비 표기가 서로 다릅니다.`
> 114 |     ).toBe(panelText);
      |       ^ Error: 결제금액 패널은 "0원", 상품 카드 요약은 "무료"로 배송비 표기가 서로 다릅니다.
  115 |   }
  116 | 
  117 | }
  118 | 
```