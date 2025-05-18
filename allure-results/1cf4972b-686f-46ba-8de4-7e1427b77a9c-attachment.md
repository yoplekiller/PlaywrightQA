# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('button.css-4ypn7b.e17x72af0') resolved to 20 elements:
    1) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '5%쿠폰+증정 최대혜택가 28,500' }).getByRole('button')
    2) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '15%쿠폰+증정 담기 [헤라] New' }).getByRole('button')
    3) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '+15%쿠폰 최대혜택가 46,240' }).getByRole('button')
    4) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '1천원쿠폰+증정 최대 혜택가 29,900' }).getByRole('button')
    5) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '10%쿠폰+증정 최대혜택가 153,000' }).getByRole('button')
    6) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '10%쿠폰+증정 최대혜택가 48,195' }).getByRole('button')
    7) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '담기 [더바디샵] 진저샴푸 400ml 2+1세트 73' }).getByRole('button')
    8) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '담기 [산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트 (쇼핑백 증정) 147,000원 10%132,300원' }).getByRole('button')
    9) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '담기 [라부르켓] BEST 립 밤 3종 (택1) 27' }).getByRole('button')
    10) <button type="button" class="product-function css-4ypn7b e17x72af0">…</button> aka getByRole('link', { name: '증정이벤트 담기 [피지오겔] DMT 페이셜 크림' }).getByRole('button')
    ...

Call log:
  - waiting for locator('button.css-4ypn7b.e17x72af0')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:6:53
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
- button
- text: 카테고리
- list:
  - listitem: 신상품
  - listitem: 베스트
  - listitem: 알뜰쇼핑
  - listitem: 특가/혜택
- link "샛별·하루 배송안내":
  - /url: /user-guide/delivery
- paragraph:
  - link:
    - /url: https://event.kurly.com/lego/event/2023/0911/join/coupon
    - img
- button "닫기"
- main:
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0501/card-benefit
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/foodbrandweek
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/main/beauty
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/categories/160015?site=beauty
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/specialgift
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2024/0527/fashionkurly
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0507/healthweek
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0509/underwear
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/clay/2505/imc_kurly
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/clay/2505/birthweek_teasing
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/collections/hmr2-kurly-pb
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/zipbob
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2024/0711/livingkurly?eventPageTitle=%EB%A6%AC%EB%B9%99%EC%BB%AC%EB%A6%AC
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/livingfair
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/categories/712001
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/collections/mzyrljne
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/categories/734
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0416/thepurpleselection
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2024/1216/membersweek
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2024/0926/Butterhouse
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/collections/slowaging01
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/pulmuonemembers
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/categories/668
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2024/0904/valueitem
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/categories/649
    - img "메인배너"
  - link "메인배너":
    - /url: https://www.kurly.com/events/member/friend
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/clay/2505/attendance
    - img "메인배너"
  - link "메인배너":
    - /url: https://we.kurly.com/atLuUeWTVSb
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0501/card-benefit
    - img "메인배너"
  - link "메인배너":
    - /url: https://event.kurly.com/lego/event/2025/0512/foodbrandweek
    - img "메인배너"
  - button
  - button
  - text: 1 / 28
  - link "📢 뷰티페스타 혜택 종료임박! 더보기 아이콘":
    - /url: /collections/5bkf-160001-market
    - text: 📢 뷰티페스타 혜택 종료임박!
    - img "더보기 아이콘"
  - paragraph: 1년 단4회 그랜드뷰컬페 혜택 주말이 지나면 사라져요
  - link "5%쿠폰+증정 최대혜택가 28,500원 담기 [최초특가][라로슈포제] 시카플라스트 밤 B5+ 2종 (택1)(마이뷰티박스 가입일 구매 시 +3% 적립) 40,000원 25%30,000원 999+":
    - /url: /goods/1000050764
    - paragraph: 5%쿠폰+증정
    - text: 최대혜택가 28,500원
    - button "담기":
      - img
      - text: 담기
    - heading "[최초특가][라로슈포제] 시카플라스트 밤 B5+ 2종 (택1)(마이뷰티박스 가입일 구매 시 +3% 적립)" [level=3]
    - text: 40,000원 25%30,000원
    - img
    - text: 999+
  - link "15%쿠폰+증정 담기 [헤라] New 블랙 쿠션 파운데이션(리필 포함) 7종 (택1) 74,000원 10%66,600원 999+":
    - /url: /goods/1000469909
    - paragraph: 15%쿠폰+증정
    - button "담기":
      - img
      - text: 담기
    - heading "[헤라] New 블랙 쿠션 파운데이션(리필 포함) 7종 (택1)" [level=3]
    - text: 74,000원 10%66,600원
    - img
    - text: 999+
  - link "+15%쿠폰 최대혜택가 46,240원 담기 [크리니크] 쏙보습크림 (핑크수분크림) 75ml (+50ml 크림 증정) 64,000원 15%54,400원 999+":
    - /url: /goods/1000073628
    - paragraph: +15%쿠폰
    - text: 최대혜택가 46,240원
    - button "담기":
      - img
      - text: 담기
    - heading "[크리니크] 쏙보습크림 (핑크수분크림) 75ml (+50ml 크림 증정)" [level=3]
    - text: 64,000원 15%54,400원
    - img
    - text: 999+
  - link "1천원쿠폰+증정 최대 혜택가 29,900원 담기 [최초특가][달바] 화이트 트러플 퍼스트 스프레이 세럼 100ml 2개 세트 (옐로우 미스트 세럼) 59,800원 48%30,900원 999+":
    - /url: /goods/1000319181
    - paragraph: 1천원쿠폰+증정
    - text: 최대 혜택가 29,900원
    - button "담기":
      - img
      - text: 담기
    - heading "[최초특가][달바] 화이트 트러플 퍼스트 스프레이 세럼 100ml 2개 세트 (옐로우 미스트 세럼)" [level=3]
    - text: 59,800원 48%30,900원
    - img
    - text: 999+
  - link "10%쿠폰+증정 최대혜택가 153,000원 담기 [에스티 로더] 갈색병 세럼 50ml + 45ml 기획세트 (15ml * 3ea 추가 증정) 200,000원 15%170,000원 999+":
    - /url: /goods/1000036568
    - paragraph: 10%쿠폰+증정
    - text: 최대혜택가 153,000원
    - button "담기":
      - img
      - text: 담기
    - heading "[에스티 로더] 갈색병 세럼 50ml + 45ml 기획세트 (15ml * 3ea 추가 증정)" [level=3]
    - text: 200,000원 15%170,000원
    - img
    - text: 999+
  - link "10%쿠폰+증정 최대혜택가 48,195원 담기 [맥] NEW 로즈 톤업 베이스 - 글로우 플레이 라이트풀 C3 톤-업 프라이머 2종(택1) 63,000원 15%53,550원 54":
    - /url: /goods/1001143128
    - paragraph: 10%쿠폰+증정
    - text: 최대혜택가 48,195원
    - button "담기":
      - img
      - text: 담기
    - heading "[맥] NEW 로즈 톤업 베이스 - 글로우 플레이 라이트풀 C3 톤-업 프라이머 2종(택1)" [level=3]
    - text: 63,000원 15%53,550원
    - img
    - text: "54"
  - link "담기 [더바디샵] 진저샴푸 400ml 2+1세트 73,500원 33%49,000원 603":
    - /url: /goods/1001182557
    - button "담기":
      - img
      - text: 담기
    - heading "[더바디샵] 진저샴푸 400ml 2+1세트" [level=3]
    - text: 73,500원 33%49,000원
    - img
    - text: "603"
  - link "담기 [산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트 (쇼핑백 증정) 147,000원 10%132,300원 377":
    - /url: /goods/1000235436
    - button "담기":
      - img
      - text: 담기
    - heading "[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트 (쇼핑백 증정)" [level=3]
    - text: 147,000원 10%132,300원
    - img
    - text: "377"
  - link "담기 [라부르켓] BEST 립 밤 3종 (택1) 27,000원 10%24,300원 999+":
    - /url: /goods/1000871659
    - button "담기":
      - img
      - text: 담기
    - heading "[라부르켓] BEST 립 밤 3종 (택1)" [level=3]
    - text: 27,000원 10%24,300원
    - img
    - text: 999+
  - link "증정이벤트 담기 [피지오겔] DMT 페이셜 크림 150ml (톤업썬 트라이얼 키트 15ml 증정) 47,500원 54%21,500원 999+":
    - /url: /goods/5062262
    - paragraph: 증정이벤트
    - button "담기":
      - img
      - text: 담기
    - heading "[피지오겔] DMT 페이셜 크림 150ml (톤업썬 트라이얼 키트 15ml 증정)" [level=3]
    - text: 47,500원 54%21,500원
    - img
    - text: 999+
  - link "15%쿠폰+증정 담기 [헤라] 센슈얼 누드 글로스 6종 (택1) 40,000원 5%38,000원 809":
    - /url: /goods/1000122511
    - paragraph: 15%쿠폰+증정
    - button "담기":
      - img
      - text: 담기
    - heading "[헤라] 센슈얼 누드 글로스 6종 (택1)" [level=3]
    - text: 40,000원 5%38,000원
    - img
    - text: "809"
  - link "담기 [모로칸오일] 헤어 트리트먼트 100ml(펌핑기 포함) 64,000원 15%54,400원 999+":
    - /url: /goods/1000078028
    - button "담기":
      - img
      - text: 담기
    - heading "[모로칸오일] 헤어 트리트먼트 100ml(펌핑기 포함)" [level=3]
    - text: 64,000원 15%54,400원
    - img
    - text: 999+
  - link "담기 [퍼셀] 20억/mL 픽셀바이옴 원액 30ml (장벽강화 유산균 원액) 듀오 세트 (+부스터샷 파우더 증정) 96,000원 33%64,000원 318":
    - /url: /goods/1000649868
    - button "담기":
      - img
      - text: 담기
    - heading "[퍼셀] 20억/mL 픽셀바이옴 원액 30ml (장벽강화 유산균 원액) 듀오 세트 (+부스터샷 파우더 증정)" [level=3]
    - text: 96,000원 33%64,000원
    - img
    - text: "318"
  - link "10%쿠폰+증정 최대혜택가 137,700원 담기 [아베다] 보태니컬 리페어 스트렝쓰닝 샴푸 1000ml 선물세트 (+43,000원 상당 증정) 180,000원 15%153,000원 72":
    - /url: /goods/1000975759
    - paragraph: 10%쿠폰+증정
    - text: 최대혜택가 137,700원
    - button "담기":
      - img
      - text: 담기
    - heading "[아베다] 보태니컬 리페어 스트렝쓰닝 샴푸 1000ml 선물세트 (+43,000원 상당 증정)" [level=3]
    - text: 180,000원 15%153,000원
    - img
    - text: "72"
  - link "+15%쿠폰 담기 [설화수] New 탄력 3종 세트 (탄력크림EX, 자음수EX, 자음유액EX) 215,000원 10%193,500원 408":
    - /url: /goods/1001109025
    - paragraph: +15%쿠폰
    - button "담기":
      - img
      - text: 담기
    - heading "[설화수] New 탄력 3종 세트 (탄력크림EX, 자음수EX, 자음유액EX)" [level=3]
    - text: 215,000원 10%193,500원
    - img
    - text: "408"
  - link "10%쿠폰+증정 최대혜택가 47,520원 담기 [에스트라] 아토베리어365 크림 80ml 2개 세트 (+크림 10ml, 비타C 광채수분 선크림 20ml+1ml) 66,000원 20%52,800원 999+":
    - /url: /goods/1001164253
    - paragraph: 10%쿠폰+증정
    - text: 최대혜택가 47,520원
    - button "담기":
      - img
      - text: 담기
    - heading "[에스트라] 아토베리어365 크림 80ml 2개 세트 (+크림 10ml, 비타C 광채수분 선크림 20ml+1ml)" [level=3]
    - text: 66,000원 20%52,800원
    - img
    - text: 999+
  - link "+15%쿠폰 최대혜택가 36,450원 담기 [연작] 스킨 퍼펙팅 프로텍티브 베이스프렙 40ml (+퍼프 증정) 45,000원 10%40,500원 999+":
    - /url: /goods/5159838
    - paragraph: +15%쿠폰
    - text: 최대혜택가 36,450원
    - button "담기":
      - img
      - text: 담기
    - heading "[연작] 스킨 퍼펙팅 프로텍티브 베이스프렙 40ml (+퍼프 증정)" [level=3]
    - text: 45,000원 10%40,500원
    - img
    - text: 999+
  - link "담기 [클랍] 마스터피스 30데이 안티에이징 프로그램 앰플 30EA (쇼핑백 증정) 129,000원 34%84,400원 497":
    - /url: /goods/5128624
    - button "담기":
      - img
      - text: 담기
    - heading "[클랍] 마스터피스 30데이 안티에이징 프로그램 앰플 30EA (쇼핑백 증정)" [level=3]
    - text: 129,000원 34%84,400원
    - img
    - text: "497"
  - link "+15%쿠폰 담기 [설화수] 윤조에센스 6세대 90ML 기획세트 140,000원 10%126,000원 105":
    - /url: /goods/1001109029
    - paragraph: +15%쿠폰
    - button "담기":
      - img
      - text: 담기
    - heading "[설화수] 윤조에센스 6세대 90ML 기획세트" [level=3]
    - text: 140,000원 10%126,000원
    - img
    - text: "105"
  - link "15%쿠폰+증정 담기 [헤라] UV프로텍터 톤업 50ML SPF50+ PA++++ 45,000원 5%42,750원 999+":
    - /url: /goods/1000578305
    - paragraph: 15%쿠폰+증정
    - button "담기":
      - img
      - text: 담기
    - heading "[헤라] UV프로텍터 톤업 50ML SPF50+ PA++++" [level=3]
    - text: 45,000원 5%42,750원
    - img
    - text: 999+
  - link "전체보기":
    - /url: /collections/5bkf-160001-market
  - button
  - link:
    - /url: https://event.kurly.com/clay/2505/birthweek_teasing
- link "샛별, 하루 배송 안내":
  - /url: /user-guide/delivery
  - img "샛별, 하루 배송 안내"
- link "컬리 고객 제도":
  - /url: /events/member/vip
- link "컬리 큐레이터":
  - /url: https://lounge.kurly.com/curator-program
- link "레시피":
  - /url: https://www.kurly.com/recipe
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |
   5 |   await page.goto('https://www.kurly.com/main');
>  6 |   await page.locator('button.css-4ypn7b.e17x72af0').click();
     |                                                     ^ Error: locator.click: Error: strict mode violation: locator('button.css-4ypn7b.e17x72af0') resolved to 20 elements:
   7 |
   8 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
   9 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
  10 |   await page.getByRole('link', { name: '담기 샛별배송 [아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 커피와 잘 어울리는 아티장 비스킷 8,800원 188' }).getByRole('button').click();
  11 |   
  12 |   await page.locator('.css-4ypn7b.e17x72af0').click();
  13 |   await page.locator('.css-18y6jr4.e1hx75jb0').click();
  14 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  15 |   await page.locator('.css-g25h97.e14oy6dx1').click();
  16 |   await expect(page).toHaveURL('https://www.kurly.com/cart');
  17 |
  18 |   await page.getByRole('button', { name: '2', exact: true }).click();
  19 |   await page.getByText('전체선택 2/').click();
  20 |   await page.getByText('전체선택 0/').click();
  21 |   await page.getByRole('button', { name: '선택삭제' }).click();
  22 |   await page.getByRole('button', { name: 'confirm-button' }).click();
  23 |   await page.getByText('전체선택 0/').click();
  24 |   await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  25 | });
```