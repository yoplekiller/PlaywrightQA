# Test info

- Name:  검색 후  장바구니 담기가지 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:4:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('button:has-text("장바구니 담기")')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('button:has-text("장바구니 담기")')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:18:30
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
- link "샛별, 하루 배송 안내":
  - /url: /user-guide/delivery
  - img "샛별, 하루 배송 안내"
- link "컬리 고객 제도":
  - /url: /events/member/vip
- link "컬리 큐레이터":
  - /url: https://lounge.kurly.com/curator-program
- link "레시피":
  - /url: https://www.kurly.com/recipe
- button [disabled]:
  - img
- text: 최근 본 상품
- list:
  - listitem:
    - link "recent-product-1000640850":
      - /url: /goods/1000640850
      - img "recent-product-1000640850"
- button [disabled]:
  - img
- main:
  - img "[오리온] 초코칩쿠키 256g"
  - link "오리온 제과 브랜드관 오리온 제과 정직한 마음으로 만든 맛있는 즐거움":
    - /url: /brand/19
    - img "오리온 제과"
    - text: 브랜드관
    - strong: 오리온 제과
    - img
    - paragraph: 정직한 마음으로 만든 맛있는 즐거움
  - text: 샛별배송 오리온 제과
  - img
  - link:
    - /url: /brand/19
  - heading "[오리온] 초코칩쿠키 256g" [level=1]
  - heading "우유와 환상 궁합" [level=2]
  - button
  - heading "3,070 원" [level=2]
  - paragraph: "원산지: 상품설명/상세정보 참조"
  - button "첫 구매라면 10,000원 즉시 할인":
    - paragraph:
      - text: 첫 구매라면
      - strong: 10,000원
      - text: 즉시 할인
    - img
  - list:
    - listitem:
      - term: 배송
      - definition:
        - paragraph: 샛별배송
        - paragraph: 23시 전 주문 시 수도권/충청 내일 아침 7시 전 도착 (그 외 지역 아침 8시 전 도착)
    - listitem:
      - term: 판매자
      - definition:
        - paragraph: 컬리
    - listitem:
      - term: 포장타입
      - definition:
        - paragraph: 상온 (종이포장)
        - paragraph: 택배배송은 에코 포장이 스티로폼으로 대체됩니다.
    - listitem:
      - term: 중량/용량
      - definition:
        - paragraph: 256g (64g X 4개입)
    - listitem:
      - term: 알레르기정보
      - definition:
        - paragraph: "- 밀, 달걀, 우유, 대두, 쇠고기 함유"
  - listitem:
    - term: 상품선택
    - definition:
      - paragraph: "[오리온] 초코칩쿠키 256g"
      - button "수량내리기" [disabled]
      - text: "1"
      - button "수량올리기"
      - text: 3,070원
  - text: "총 상품금액 : 3,070 원"
  - button
  - button [disabled]
  - button "장바구니 담기"
- navigation:
  - list:
    - listitem: 상품설명
    - listitem: 상세정보
    - listitem: 후기 (1,214)
    - listitem: 문의
- img
- heading "우유와 환상 궁합 [오리온] 초코칩쿠키" [level=3]
- paragraph: 바삭바삭한 쿠키 안에 쏙쏙 박혀있는 초코칩쿠키, 우유와 함께하면 그 맛이 배가 되는데요. 마트나 편의점에 나가지 않아도 집에서 편하게 즐길 수 있도록 준비했어요. 필요한 만큼만 1팩씩 구매가 가능하니, 부담 없이 장바구니에 쏙 담아보세요.
- heading "Kurly's Check Point" [level=3]
- img
- img "자세히보기 이미지"
- heading "상품고시정보" [level=3]
- list:
  - listitem: 제품명
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 식품의 유형
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 생산자 및 소재지 (수입품의 경우 생산자, 수입자 및 제조국)
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 제조연월일, 소비기한 또는 품질유지기한
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 포장단위별 내용물의 용량(중량), 수량
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 원재료명 (｢농수산물의 원산지 표시 등에 관한 법률｣에 따른 원산지 표시 포함) 및 함량(원재료 함량 표시대상 식품에 한함)
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 영양성분 (영양성분 표시대상 식품에 한함)
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 유전자변형식품에 해당하는 경우의 표시
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 소비자 안전을 위한 주의사항 (｢식품 등의 표시ㆍ광고에 관한 법률 시행규칙｣ 제5조 및 [별표 2]에 따른 표시사항을 말함)
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 수입식품의 경우 “수입식품안전관리 특별법에 따른 수입신고를 필함”의 문구
  - listitem: 상품설명 및 상품이미지 참조
  - listitem: 소비자 상담 관련 전화번호
  - listitem: 상품설명 및 상품이미지 참조
  - listitem
- text: WHY KURLY
- term: 깐깐한 상품위원회
- definition: 나와 내 가족이 먹고 쓸 상품을 고르는 마음으로 매주 상품을 직접 먹어보고, 경험해보고 성분, 맛, 안정성 등 다각도의 기준을 통과한 상품만을 판매합니다. (온라인 기준 / 자사몰, 직구 제외)
- term: 차별화된 Kurly Only 상품
- definition: 전국 각지와 해외의 훌륭한 생산자가 믿고 선택하는 파트너, 컬리. 3천여 개가 넘는 컬리 단독 브랜드, 스펙의 Kurly Only 상품을 믿고 만나보세요. (온라인 기준 / 자사몰, 직구 제외)
- term: 신선한 풀콜드체인 배송
- definition: 온라인 업계 최초로 산지에서 문 앞까지 상온, 냉장, 냉동 상품을 분리 포장 후 최적의 온도를 유지하는 냉장 배송 시스템, 풀콜드체인으로 상품을 신선하게 전해드립니다. (샛별배송에 한함)
- term: 고객, 생산자를 위한 최선의 가격
- definition: 매주 대형 마트와 주요 온라인 마트의 가격 변동 상황을 확인해 신선식품은 품질을 타협하지 않는 선에서 최선의 가격으로, 가공식품은 언제나 합리적인 가격으로 정기 조정합니다.
- term: 환경을 생각하는 지속 가능한 유통
- definition: 친환경 포장재부터 생산자가 상품에만 집중할 수 있는 직매입 유통구조까지, 지속 가능한 유통을 고민하며 컬리를 있게 하는 모든 환경(생산자, 커뮤니티, 직원)이 더 나아질 수 있도록 노력합니다.
- heading "고객행복센터" [level=5]
- paragraph: 궁금하신 점이나 서비스 이용에 불편한 점이 있으신가요? 문제가 되는 부분을 사진으로 찍어 아래 중 편하신 방법으로 접수해 주시면 빠르게 도와드리겠습니다.
- list:
  - listitem:
    - strong: 전화 문의 1644-1107
    - text: 월~토요일 오전 7시 - 오후 6시
  - listitem:
    - strong: 카카오톡 문의
    - text: 월~토요일 오전 7시 - 오후 6시 일/공휴일 오전 7시 - 오후 1시
    - strong: 카카오톡에서 '컬리' 를 검색 후 대화창에 문의 및 불편사항을 남겨주세요.
  - listitem:
    - strong: 홈페이지 문의
    - text: 365일 로그인 > 마이컬리 > 1:1 문의
    - strong: 고객센터 운영 시간에 순차적으로 답변해드리겠습니다.
- strong: 교환 및 환불 안내
- paragraph: 교환 및 환불이 필요하신 경우 [마이컬리 > 주문내역]에서 직접 반품 접수하거나 고객행복센터로 문의해 주시기 바랍니다.
- button "닫기"
- text: 01. 상품에 문제가 있는 경우
- paragraph: 받으신 상품이 표시·광고 내용 또는 계약 내용과 다른 경우에는 상품을 받은 날부터 3개월 이내, 그 사실을 알게 된 날부터 30일 이내에 반품을 요청하실 수 있습니다. 고객행복센터로 문의해 주시기 바랍니다. 상품의 정확한 상태를 확인할 수 있도록 사진을 함께 보내주시면 더 빠른 상담이 가능합니다. ※ 배송 상품에 문제가 있는 것으로 확인되면 배송비는 판매자가 부담합니다.
- text: 02. 단순 변심, 주문 착오의 경우
- paragraph:
  - strong: 신선 / 냉장 / 냉동 식품
  - text: 상품의 특성상 재판매가 불가하여 단순 변심, 주문 착오, 주소 오입력 등 고객의 책임 있는 사유로 인한 교환 및 반품이 어려운 점 양해 부탁드립니다. 상품에 따라 조금씩 맛이 다를 수 있으며, 개인의 기호에 따라 같은 상품도 다르게 느끼실 수 있습니다.
  - strong: 유통기한 30일 이상 식품 (신선 / 냉장 / 냉동 제외) & 기타 상품 (뷰티 제품, 생활용품)
  - text: 상품을 받은 날부터 7일 이내 반품 접수가 가능합니다. 직접 접수하시거나 고객행복센터로 문의해 주시기 바랍니다. ※ 단순 변심, 주문 착오, 주소 오입력 등 고객의 책임 있는 사유로 인한 교환 및 반품의 경우 고객님께서 왕복배송비 6,000원(배송비를 낸 경우 3,000원)을 부담하셔야 합니다.
- text: 03. 교환·환불이 불가한 경우
- paragraph: 다음에 해당하는 교환·환불 신청은 처리가 어려울 수 있으니 양해 부탁드립니다. 고객님의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우 (단, 상품의 내용을 확인하기 위해 포장 등을 훼손한 경우는 제외) 고객님의 사용 또는 일부 소비로 상품의 가치가 감소한 경우 시간이 지나 다시 판매하기 곤란할 정도로 상품의 가치가 감소한 경우 복제가 가능한 상품의 포장이 훼손된 경우 고객님의 주문에 따라 개별적으로 생산되는 상품의 제작이 이미 진행된 경우 반품 신청 후 14일 내에 물품이 반환되지 않고 고객님과 연락이 되지 않는 경우
- strong: 주문 취소 안내
- paragraph:
  - strong: "[마이컬리>주문내역]에서 직접 취소하실 수 있습니다."
- button "닫기"
- text: 주문 취소 관련
- paragraph: "- 주문취소는 [마이컬리>주문내역]에서 직접 하실 수 있습니다. - [배송중]부터는 배송이 시작되어 주문 취소가 불가하니, 반품 접수 부탁드립니다(상품에 따라 반품이 불가할 수 있습니다). - 주문취소 및 반품 접수와 관련하여 도움이 필요하신 경우 고객행복센터로 문의해 주시기 바랍니다. - 주문마감 시간에 임박할수록 취소 가능 시간이 짧아질 수 있습니다. - 일부 예약상품은 판매 시 안내된 취소 마감 기한 내에만 취소할 수 있습니다. - 파트너사 판매상품의 경우, 파트너사의 정책에 따라 주문취소가 가능합니다. - 미성년자 결제 시 법정대리인이 그 거래를 취소할 수 있습니다."
- text: 결제 승인 취소 / 환불 관련
- paragraph: "- 카드 환불은 카드사 정책에 따르며, 자세한 사항은 카드사에 문의해주세요. - 결제 취소 시, 사용하신 적립금과 쿠폰도 모두 복원됩니다."
- strong: 배송관련 안내
- paragraph: 배송 과정 중 기상 악화 및 도로교통 상황에 따라 부득이하게 지연 배송이 발생될 수 있습니다.
- heading "상품 후기" [level=2]
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- button "상품 후기":
  - img "상품 후기"
- text: +더보기 총 1,214개
- button "추천순"
- button "최근등록순"
- text: 공지
- button "[25년 5월 3주] 베스트 후기 선정 안내"
- text: 공지
- button "상품후기 적립금 정책 안내"
- text: 공지
- button "금주의 베스트 후기 안내"
- text: 김**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 달콤하게 잘 먹었어요
  - button "리뷰 이미지 썸네일":
    - img "리뷰 이미지 썸네일"
  - text: 2025.05.17
  - button "도움돼요"
- text: 멤버스 스*
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 딱딱한 쿠키파라 요아이 너무 좋아해요
  - text: 2025.05.17
  - button "도움돼요"
- text: 멤버스 서**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 아이가 잘 먹어요 하나씩 꺼내주기 좋네요
  - button "리뷰 이미지 썸네일":
    - img "리뷰 이미지 썸네일"
  - text: 2025.05.17
  - button "도움돼요"
- text: 멤버스 이**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 잘받음 크기크니좋은듯
  - text: 2025.05.17
  - button "도움돼요"
- text: 멤버스 강**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 초코칩쿠키 아이가 좋아해요ㅎ
  - text: 2025.05.16
  - button "도움돼요"
- text: 멤버스 아**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 초코칩쿠키 잘 구매했습니다. 🍪
  - button "리뷰 이미지 썸네일":
    - img "리뷰 이미지 썸네일"
  - text: 2025.05.15
  - button "도움돼요"
- text: 멤버스 이**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 아이가 좋아하는 과자에요
  - text: 2025.05.15
  - button "도움돼요"
- text: 멤버스 이**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 고딩 아들이 가끔 사달라고 졸라요ㅋ
  - text: 2025.05.13
  - button "도움돼요"
- text: 멤버스 이**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 바삭하고 달달해서 맛있어요
  - button "리뷰 이미지 썸네일":
    - img "리뷰 이미지 썸네일"
  - text: 2025.05.13
  - button "도움돼요"
- text: 멤버스 강**
- article:
  - heading "[오리온] 초코칩쿠키 256g" [level=3]
  - paragraph: 맛있어서 금방 다 먹어버려요
  - button "리뷰 이미지 썸네일":
    - img "리뷰 이미지 썸네일"
  - text: 2025.05.12
  - button "도움돼요"
- button "이전" [disabled]
- button "다음"
- button "문의하기"
- strong: 상품 문의
- list:
  - listitem: 상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
  - listitem:
    - text: 배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내
    - link "1:1 문의":
      - /url: /mypage/inquiry/list
    - text: 에 남겨주세요.
- table:
  - rowgroup:
    - row "제목 작성자 작성일 답변상태":
      - cell "제목"
      - cell "작성자"
      - cell "작성일"
      - cell "답변상태"
  - rowgroup:
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
    - row "‌ ‌ ‌ ‌":
      - cell "‌"
      - cell "‌"
      - cell "‌"
      - cell "‌"
- button "이전" [disabled]
- button "다음" [disabled]
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
- img "위로가기 아이콘"
- alert: 검색결과 > 과자 - 마켓컬리
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
> 18 |     await expect(cartButton).toBeVisible();
     |                              ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  19 |     await cartButton.click();
  20 |     await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
  21 |
  22 |     await page.goto('https://www.kurly.com/cart');
  23 |     await expect(page).toHaveURL('https://www.kurly.com/cart');
  24 |     const cartProduct = page.locator('.css-1dry2r1.e1c07x485').first();
  25 |     await expect(cartProduct).toBeVisible();
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