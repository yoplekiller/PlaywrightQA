# Test info

- Name: 🔍 엑셀 기반 상품 검색 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_search.spec.ts:20:5

# Error details

```
Error: page.screenshot: Test timeout of 150000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_search.spec.ts:43:16
```

# Page snapshot

```yaml
- link "한정수량 첫 구매 특가, 컬리 인기 상품 100원!":
  - /url: https://event.kurly.com/lego/event/2023/0911/join/coupon
- button "배너 하루 안보기":
  - img
  - text: 배너 하루 안보기
- text: 회원가입 로그인 고객센터
- img "마켓컬리 로고"
- button "마켓컬리"
- button "뷰티컬리"
- textbox "검색어를 입력해주세요": 제로콜라
- button "delete-search-keyword"
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
- main:
  - heading "' 제로콜라 '에 대한 검색결과" [level=1]
  - heading "필터" [level=2]
  - button "초기화" [disabled]:
    - img
    - text: 초기화
  - button "카테고리":
    - text: 카테고리
    - img
  - navigation:
    - listitem:
      - button "탄산·스포츠음료 37":
        - button:
          - img
        - text: 탄산·스포츠음료 37
    - listitem:
      - button "초콜릿·젤리·캔디 1":
        - button:
          - img
        - text: 초콜릿·젤리·캔디 1
    - listitem:
      - button "과자·간식 1":
        - button:
          - img
        - text: 과자·간식 1
    - listitem:
      - button "차음료 1":
        - button:
          - img
        - text: 차음료 1
  - button "배송":
    - text: 배송
    - img
  - navigation:
    - listitem:
      - button "판매자배송 22":
        - button:
          - img
        - text: 판매자배송 22
    - listitem:
      - button "샛별배송 19":
        - button:
          - img
        - text: 샛별배송 19
  - button "포장타입":
    - text: 포장타입
    - img
  - navigation:
    - listitem:
      - button "상온 33":
        - button:
          - img
        - text: 상온 33
    - listitem:
      - button "냉장 9":
        - button:
          - img
        - text: 냉장 9
  - button "가격":
    - text: 가격
    - img
  - navigation:
    - listitem:
      - button "6,060원 미만":
        - button:
          - img
        - text: 6,060원 미만
    - listitem:
      - button "6,060원 ~ 16,100원":
        - button:
          - img
        - text: 6,060원 ~ 16,100원
    - listitem:
      - button "16,100원 ~ 20,925원":
        - button:
          - img
        - text: 16,100원 ~ 20,925원
    - listitem:
      - button "20,925원 이상":
        - button:
          - img
        - text: 20,925원 이상
  - button "브랜드":
    - text: 브랜드
    - img
  - navigation:
    - list:
      - listitem:
        - button "가나다순"
      - listitem:
        - button "상품 많은순"
    - list:
      - listitem:
        - button "전체"
      - listitem:
        - button "ㄷ"
      - listitem:
        - button "ㄹ"
      - listitem:
        - button "ㅅ"
      - listitem:
        - button "ㅇ"
      - listitem:
        - button "ㅋ"
      - listitem:
        - button "ㅍ"
      - listitem:
        - button "ㅎ"
    - listitem:
      - button "닥터페퍼 1":
        - button:
          - img
        - text: 닥터페퍼 1
    - listitem:
      - button "롯데칠성 1":
        - button:
          - img
        - text: 롯데칠성 1
    - listitem:
      - button "스프라이트 1":
        - button:
          - img
        - text: 스프라이트 1
    - listitem:
      - button "일화 2":
        - button:
          - img
        - text: 일화 2
    - listitem:
      - button "코카콜라 6":
        - button:
          - img
        - text: 코카콜라 6
    - listitem:
      - button "퍼지락 1":
        - button:
          - img
        - text: 퍼지락 1
    - listitem:
      - button "펩시 9":
        - button:
          - img
        - text: 펩시 9
    - listitem:
      - button "환타 1":
        - button:
          - img
        - text: 환타 1
  - button "혜택":
    - text: 혜택
    - img
  - navigation:
    - listitem:
      - button "할인상품 33":
        - button:
          - img
        - text: 할인상품 33
  - text: 총 41건
  - list:
    - listitem:
      - link "추천순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=4
      - img
    - listitem:
      - link "신상품순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=0
    - listitem:
      - link "판매량순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=1
    - listitem:
      - link "혜택순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=5
    - listitem:
      - link "낮은 가격순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=2
    - listitem:
      - link "높은 가격순":
        - /url: /search?sword=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&page=1&per_page=96&sorted_type=3
  - link "담기 샛별배송 [펩시] 제로 콜라 라임향 (250mL X 6캔) 부담 없이 누리는 청량함 5,080원 30%3,550원 9,999+":
    - /url: /goods/5081670
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로 콜라 라임향 (250mL X 6캔)
    - paragraph: 부담 없이 누리는 청량함
    - text: 5,080원 30%3,550원
    - img
    - text: 9,999+
  - link "담기 샛별배송 [펩시] 제로콜라 라임 1.5L 부담 없이 즐기는 청량감 2,780원 291":
    - /url: /goods/1000902956
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로콜라 라임 1.5L
    - paragraph: 부담 없이 즐기는 청량감
    - text: 2,780원
    - img
    - text: "291"
  - link "담기 샛별배송 [펩시] 제로 콜라 라임향 (210mL X 30캔) 라임향으로 청량함을 더한 17,500원 14%15,000원 249":
    - /url: /goods/1000490171
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로 콜라 라임향 (210mL X 30캔)
    - paragraph: 라임향으로 청량함을 더한
    - text: 17,500원 14%15,000원
    - img
    - text: "249"
  - link "담기 샛별배송 [펩시] 제로 콜라 카페인 제로 (355mL X 6캔) 제로칼로리는 기본, 카페인도 제로 5,980원 695":
    - /url: /goods/1000490165
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로 콜라 카페인 제로 (355mL X 6캔)
    - paragraph: 제로칼로리는 기본, 카페인도 제로
    - text: 5,980원
    - img
    - text: "695"
  - link "담기 샛별배송 코카콜라 제로 1.5L 칼로리 걱정없는 가벼운 한 병 3,180원 10%2,860원 999+":
    - /url: /goods/5061931
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 코카콜라 제로 1.5L
    - paragraph: 칼로리 걱정없는 가벼운 한 병
    - text: 3,180원 10%2,860원
    - img
    - text: 999+
  - link "담기 샛별배송 코카콜라 제로 (250mL X 6캔) 설탕을 넣지 않아 깔끔한 맛 7,580원 20%6,060원 999+":
    - /url: /goods/5061929
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 코카콜라 제로 (250mL X 6캔)
    - paragraph: 설탕을 넣지 않아 깔끔한 맛
    - text: 7,580원 20%6,060원
    - img
    - text: 999+
  - link "담기 샛별배송 [코카콜라] 제로제로 (제로 슈거&제로 카페인) 250mL X 6개입 설탕과 카페인 걱정 없는 7,580원 10%6,820원 999+":
    - /url: /goods/1000228002
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [코카콜라] 제로제로 (제로 슈거&제로 카페인) 250mL X 6개입
    - paragraph: 설탕과 카페인 걱정 없는
    - text: 7,580원 10%6,820원
    - img
    - text: 999+
  - link "+10% 쿠폰 담기 샛별배송 [펩시] 제로 콜라 라임향 무라벨 (300mL X 20입) 무라벨 패키지로 즐기는 펩시 17,800원 12%15,500원 999+":
    - /url: /goods/5120994
    - paragraph: +10% 쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로 콜라 라임향 무라벨 (300mL X 20입)
    - paragraph: 무라벨 패키지로 즐기는 펩시
    - text: 17,800원 12%15,500원
    - img
    - text: 999+
  - link "담기 샛별배송 코카콜라 제로 라벨프리 (370mL X 6입) 라벨 없이 깔끔한 제로 탄산 8,280원 454":
    - /url: /goods/1000153943
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 코카콜라 제로 라벨프리 (370mL X 6입)
    - paragraph: 라벨 없이 깔끔한 제로 탄산
    - text: 8,280원
    - img
    - text: "454"
  - link "담기 샛별배송 [일화] 부르르 제로콜라 (250mL X 6캔) 깔끔한 제로 칼로리 2,500원 379":
    - /url: /goods/1000535276
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [일화] 부르르 제로콜라 (250mL X 6캔)
    - paragraph: 깔끔한 제로 칼로리
    - text: 2,500원
    - img
    - text: "379"
  - link "담기 샛별배송 [펩시] 제로 콜라 라임향 (500mL X 6개) 부담 없이 즐기는 청량감 9,180원 999+":
    - /url: /goods/5122588
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로 콜라 라임향 (500mL X 6개)
    - paragraph: 부담 없이 즐기는 청량감
    - text: 9,180원
    - img
    - text: 999+
  - link "2개사면 50% 담기 샛별배송 [골라담기] 탄산음료(제로콜라,사이다,밀키스) 미니캔 4종 (택1) 펩시콜라, 펩시제로, 칠성사이다, 밀키스 4,980원 50%2,490원 999+":
    - /url: /goods/1000937186
    - paragraph: 2개사면 50%
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [골라담기] 탄산음료(제로콜라,사이다,밀키스) 미니캔 4종 (택1)
    - paragraph: 펩시콜라, 펩시제로, 칠성사이다, 밀키스
    - text: 4,980원 50%2,490원
    - img
    - text: 999+
  - link "담기 샛별배송 [펩시] 제로콜라 카페인 제로 (500mL X 6개) 제로칼로리는 기본, 카페인도 제로 9,480원 49":
    - /url: /goods/1000902951
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로콜라 카페인 제로 (500mL X 6개)
    - paragraph: 제로칼로리는 기본, 카페인도 제로
    - text: 9,480원
    - img
    - text: "49"
  - link "담기 샛별배송 [펩시] 제로콜라 1.25L 2종 칼로리 부담 없는 짜릿함 3,280원 50%1,640원~ 256":
    - /url: /goods/1000902954
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [펩시] 제로콜라 1.25L 2종
    - paragraph: 칼로리 부담 없는 짜릿함
    - text: 3,280원 50%1,640원~
    - img
    - text: "256"
  - link "담기 샛별배송 [코카콜라] 인기 제로 탄산음료(콜라/사이다) 캔 골라담기 7,580원 20%6,060원~ 9,999+":
    - /url: /goods/1001146339
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [코카콜라] 인기 제로 탄산음료(콜라/사이다) 캔 골라담기 7,580원 20%6,060원~
    - img
    - text: 9,999+
  - link "담기 샛별배송 코카콜라 제로 (500mL X 6병) 칼로리 걱정 없이 즐기는 콜라 11,880원 10%10,690원 975":
    - /url: /goods/5119806
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 코카콜라 제로 (500mL X 6병)
    - paragraph: 칼로리 걱정 없이 즐기는 콜라
    - text: 11,880원 10%10,690원
    - img
    - text: "975"
  - link "담기 판매자배송 [펩시콜라] 제로슈거 라임향 제로카페인 355mL x 24개 칼로리 걱정 없이, 더 시원하고 더 청량하게! 25,000원 8%23,000원 무료배송":
    - /url: /goods/1000964887
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 제로슈거 라임향 제로카페인 355mL x 24개
    - paragraph: 칼로리 걱정 없이, 더 시원하고 더 청량하게!
    - text: 25,000원 8%23,000원 무료배송
  - link "담기 샛별배송 코카콜라 2종 (300mL X 24입) 어디든 잘 어울리는 탄산음료 25,380원 24%19,200원 999+":
    - /url: /goods/1000036987
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 코카콜라 2종 (300mL X 24입)
    - paragraph: 어디든 잘 어울리는 탄산음료
    - text: 25,380원 24%19,200원
    - img
    - text: 999+
  - link "담기 판매자배송 [펩시콜라] 제로슈거 블랙 355mL x 24개 칼로리 걱정 없이, 더 시원하고 더 청량하게! 25,000원 8%23,000원 무료배송":
    - /url: /goods/1000964902
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 제로슈거 블랙 355mL x 24개
    - paragraph: 칼로리 걱정 없이, 더 시원하고 더 청량하게!
    - text: 25,000원 8%23,000원 무료배송
  - link "담기 판매자배송 [펩시콜라] 제로슈거 라임향 210mL x 30개 GREAT TASTE, PEPSI ZERO SUGAR! 20,200원 9%18,200원 34 무료배송":
    - /url: /goods/1000220376
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 제로슈거 라임향 210mL x 30개
    - paragraph: GREAT TASTE, PEPSI ZERO SUGAR!
    - text: 20,200원 9%18,200원
    - img
    - text: 34 무료배송
  - link "담기 판매자배송 [펩시콜라] 제로슈거 라임향 355mL x 24개 칼로리 걱정 없이, 더 시원하고 더 청량하게! 25,000원 8%23,000원 무료배송":
    - /url: /goods/1000964897
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 제로슈거 라임향 355mL x 24개
    - paragraph: 칼로리 걱정 없이, 더 시원하고 더 청량하게!
    - text: 25,000원 8%23,000원 무료배송
  - link "담기 샛별배송 [일화] 맥콜 제로 (250mL X 6캔) 맥콜도 0칼로리로 가볍게 3,380원 489":
    - /url: /goods/1000535273
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [일화] 맥콜 제로 (250mL X 6캔)
    - paragraph: 맥콜도 0칼로리로 가볍게
    - text: 3,380원
    - img
    - text: "489"
  - link "담기 판매자배송 [펩시콜라] 제로슈거 블랙 210mL x 30개 GREAT TASTE, PEPSI ZERO SUGAR! 20,200원 9%18,200원 무료배송":
    - /url: /goods/1000964879
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 제로슈거 블랙 210mL x 30개
    - paragraph: GREAT TASTE, PEPSI ZERO SUGAR!
    - text: 20,200원 9%18,200원 무료배송
  - link "담기 판매자배송 비건콜라250ml*24개입(box) (-) 33,600원 29%23,800원 무료배송":
    - /url: /goods/1001042379
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 비건콜라250ml*24개입(box) (-) 33,600원 29%23,800원 무료배송
  - link "담기 판매자배송 [펩시콜라] 210mL x 30캔 맛있는 음식을 두고 고민될 떄, 맛있는 순간엔 펩시와 함께! 20,200원 9%18,200원 29 무료배송":
    - /url: /goods/1000220373
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 210mL x 30캔
    - paragraph: 맛있는 음식을 두고 고민될 떄, 맛있는 순간엔 펩시와 함께!
    - text: 20,200원 9%18,200원
    - img
    - text: 29 무료배송
  - link "담기 판매자배송 [펩시콜라] 355mL x 24개 칼로리 걱정 없이, 더 시원하고 더 청량하게! 25,000원 8%23,000원 무료배송":
    - /url: /goods/1000964903
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [펩시콜라] 355mL x 24개
    - paragraph: 칼로리 걱정 없이, 더 시원하고 더 청량하게!
    - text: 25,000원 8%23,000원 무료배송
  - link "담기 판매자배송 [마운틴듀] 제로 355mL x 24개 우주 파도를 타고 있는 듯 한 놀라운 맛! 마운틴듀 제로 슈거 블루 17,900원 5%16,900원 무료배송":
    - /url: /goods/1000964888
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [마운틴듀] 제로 355mL x 24개
    - paragraph: 우주 파도를 타고 있는 듯 한 놀라운 맛! 마운틴듀 제로 슈거 블루
    - text: 17,900원 5%16,900원 무료배송
  - link "담기 판매자배송 [칠성사이다] 제로 355mL x 24개 없어도 되는 건 뺴고 살자, 칠성사이다 제로! 24,000원 4%23,000원 무료배송":
    - /url: /goods/1000964891
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [칠성사이다] 제로 355mL x 24개
    - paragraph: 없어도 되는 건 뺴고 살자, 칠성사이다 제로!
    - text: 24,000원 4%23,000원 무료배송
  - link "담기 판매자배송 [칠성사이다] 제로 ECO 300mL x 20개 없어도 되는 건 뺴고 살자, 칠성사이다 제로! 23,000원 8%21,000원 무료배송":
    - /url: /goods/1000222169
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [칠성사이다] 제로 ECO 300mL x 20개
    - paragraph: 없어도 되는 건 뺴고 살자, 칠성사이다 제로!
    - text: 23,000원 8%21,000원 무료배송
  - link "담기 판매자배송 [립톤] 아이스티 복숭아 제로 355mL x 24개 130여 년 전통의 영국에서 온 홍차 브랜드, 립톤! 16,400원 4%15,700원 무료배송":
    - /url: /goods/1000964894
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [립톤] 아이스티 복숭아 제로 355mL x 24개
    - paragraph: 130여 년 전통의 영국에서 온 홍차 브랜드, 립톤!
    - text: 16,400원 4%15,700원 무료배송
  - link "담기 판매자배송 [밀키스] 500mL x 20개 밀크와 탄산의 짜릿한 키스, 밀키스! 23,700원 4%22,700원 무료배송":
    - /url: /goods/1000964906
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [밀키스] 500mL x 20개
    - paragraph: 밀크와 탄산의 짜릿한 키스, 밀키스!
    - text: 23,700원 4%22,700원 무료배송
  - link "담기 판매자배송 [밀키스] 340mL x 24개 밀크와 탄산의 짜릿한 키스, 밀키스! 18,800원 14%16,100원 24 무료배송":
    - /url: /goods/1000220391
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [밀키스] 340mL x 24개
    - paragraph: 밀크와 탄산의 짜릿한 키스, 밀키스!
    - text: 18,800원 14%16,100원
    - img
    - text: 24 무료배송
  - link "담기 판매자배송 [마운틴듀] 355mL x 24개 오리지널 아메리칸 스타일의 맛, 마운틴듀! 18,800원 14%16,100원 17 무료배송":
    - /url: /goods/1000220379
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [마운틴듀] 355mL x 24개
    - paragraph: 오리지널 아메리칸 스타일의 맛, 마운틴듀!
    - text: 18,800원 14%16,100원
    - img
    - text: 17 무료배송
  - link "담기 판매자배송 [칠성사이다] 210mL x 30개 시원한 하루를 만드는 청량감 칠성사이다! 20,200원 9%18,200원 38 무료배송":
    - /url: /goods/1000220291
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [칠성사이다] 210mL x 30개
    - paragraph: 시원한 하루를 만드는 청량감 칠성사이다!
    - text: 20,200원 9%18,200원
    - img
    - text: 38 무료배송
  - link "담기 판매자배송 [칠성사이다] 350mL x 24개 시원한 하루를 만드는 청량감 칠성사이다! 20,900원 4%19,900원 무료배송":
    - /url: /goods/1000964882
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [칠성사이다] 350mL x 24개
    - paragraph: 시원한 하루를 만드는 청량감 칠성사이다!
    - text: 20,900원 4%19,900원 무료배송
  - link "담기 판매자배송 [칠성사이다] ECO 300mL x 20개 시원한 하루를 만드는 청량감 칠성사이다! 23,000원 8%21,000원 무료배송":
    - /url: /goods/1000222172
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [칠성사이다] ECO 300mL x 20개
    - paragraph: 시원한 하루를 만드는 청량감 칠성사이다!
    - text: 23,000원 8%21,000원 무료배송
  - link "담기 판매자배송 [핫식스] 더킹 파워 355mL x 24개 더 강하게 에너지 충전이 필요한 날! 29,500원 6%27,500원 무료배송":
    - /url: /goods/1000220409
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [핫식스] 더킹 파워 355mL x 24개
    - paragraph: 더 강하게 에너지 충전이 필요한 날!
    - text: 29,500원 6%27,500원 무료배송
  - link "담기 샛별배송 [퍼지락] 자일리톨 캔디 틴케이스 런던에디션 4종 (택1) 자일리톨을 99% 이상 함유한 캔디 4,200원 383":
    - /url: /goods/1000794497
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [퍼지락] 자일리톨 캔디 틴케이스 런던에디션 4종 (택1)
    - paragraph: 자일리톨을 99% 이상 함유한 캔디
    - text: 4,200원
    - img
    - text: "383"
  - link "담기 판매자배송 [롯데칠성] 잔치집식혜 240mL x 30개 엄마 손 맛 그대로, 수미네 잔칫집 식혜 17,500원 5%16,500원 16 무료배송":
    - /url: /goods/1000220418
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [롯데칠성] 잔치집식혜 240mL x 30개
    - paragraph: 엄마 손 맛 그대로, 수미네 잔칫집 식혜
    - text: 17,500원 5%16,500원
    - img
    - text: 16 무료배송
  - link "Coming Soon 재입고 알림 판매자배송 [밀키스] 제로 300mL x 24개 그토록 기다렸던 새로운 밀키스, 밀키스 제로! 22,900원 8%20,900원 무료배송":
    - /url: /goods/1000220394
    - text: Coming Soon
    - button "재입고 알림":
      - img
      - text: 재입고 알림
    - text: 판매자배송 [밀키스] 제로 300mL x 24개
    - paragraph: 그토록 기다렸던 새로운 밀키스, 밀키스 제로!
    - text: 22,900원 8%20,900원 무료배송
  - link "Coming Soon 재입고 알림 판매자배송 [칠성사이다] 제로 210mL x 30개 없어도 되는 건 뺴고 살자, 칠성사이다 제로! 20,200원 9%18,200원 25 무료배송":
    - /url: /goods/1000220288
    - text: Coming Soon
    - button "재입고 알림":
      - img
      - text: 재입고 알림
    - text: 판매자배송 [칠성사이다] 제로 210mL x 30개
    - paragraph: 없어도 되는 건 뺴고 살자, 칠성사이다 제로!
    - text: 20,200원 9%18,200원
    - img
    - text: 25 무료배송
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
- alert: 검색결과 > 제로콜라 - 마켓컬리
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { loadExcelFile } from '../../src/utils/excel_loader';
   3 | import path from 'path';
   4 | import fs from 'fs';
   5 |
   6 | let searchCases: { tc_id: string; search_term: string }[] = [];
   7 |
   8 | const screenshotDir = path.resolve(__dirname, '../../screenshots');
   9 | if (!fs.existsSync(screenshotDir)) {
  10 |   fs.mkdirSync(screenshotDir);
  11 | }
  12 |
  13 | test.beforeAll(async () => {
  14 |   searchCases = await loadExcelFile(
  15 |     path.resolve(__dirname, '../data/test_case.xlsx')
  16 |   );
  17 |   console.log('엑셀 데이터:', searchCases);
  18 | });
  19 |
  20 | test('🔍 엑셀 기반 상품 검색 테스트', async ({ page }) => {
  21 |   for (const { tc_id, search_term } of searchCases) {
  22 |     if (!tc_id || !search_term) continue;
  23 |
  24 |     await page.goto('https://www.kurly.com/main');
  25 |     const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
  26 |     await searchBox.fill(search_term);
  27 |     await searchBox.press('Enter');
  28 |
  29 |     // 결과가 보일 때까지 대기
  30 |     const results = page.locator('[class*=product-card]');
  31 |     const count = await results.count();
  32 |     console.log(`검색어 "${search_term}"에 대한 결과 수: ${count}`);
  33 |
  34 |     if (count > 0) {
  35 |       await expect(results.first()).toBeVisible({ timeout: 10000 });
  36 |     } else {
  37 |       console.log(`❗검색 결과 없음: ${search_term}`);
  38 |     }
  39 |
  40 |     // 스크린샷 저장
  41 |     const safeSearchTerm = search_term.replace(/[^a-zA-Z0-9]/g, '_');
  42 |     const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
> 43 |     await page.screenshot({ path: screenshotPath });
     |                ^ Error: page.screenshot: Test timeout of 150000ms exceeded.
  44 |     console.log(`📸 스크린샷 경로: ${screenshotPath}`);
  45 |     console.log(`Test Case ID: ${tc_id}, Search Term: ${search_term}, Results Count: ${count}`);
  46 |   }
  47 |   await page.close();
  48 | });
  49 | test.afterAll(() => {
  50 |   console.log('모든 테스트가 완료되었습니다.');
  51 | });
```