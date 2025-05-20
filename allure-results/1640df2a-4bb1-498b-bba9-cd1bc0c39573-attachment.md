# Test info

- Name: 🔍 엑셀 기반 상품 검색 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_search.spec.ts:20:5

# Error details

```
Error: page.goto: NS_ERROR_FAILURE
Call log:
  - navigating to "https://www.kurly.com/main", waiting until "load"

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_search.spec.ts:24:16
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
- textbox "검색어를 입력해주세요": 키보드
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
  - heading "' 키보드 '에 대한 검색결과" [level=1]
  - heading "필터" [level=2]
  - button "초기화" [disabled]:
    - img
    - text: 초기화
  - list:
    - listitem:
      - button "새로나온 5":
        - button:
          - img
        - text: 새로나온 5
    - listitem:
      - button "아이콘벌쓰위크 1":
        - button:
          - img
        - img "아이콘"
        - text: 벌쓰위크 1
  - button "카테고리":
    - text: 카테고리
    - img
  - navigation:
    - listitem:
      - button "홈데코·조명·거울 1":
        - button:
          - img
        - text: 홈데코·조명·거울 1
    - listitem:
      - button "생활가전 1":
        - button:
          - img
        - text: 생활가전 1
    - listitem:
      - button "디지털·PC 1":
        - button:
          - img
        - text: 디지털·PC 1
    - listitem:
      - button "아이메이크업 1":
        - button:
          - img
        - text: 아이메이크업 1
    - listitem:
      - button "취미·문구·오피스 1":
        - button:
          - img
        - text: 취미·문구·오피스 1
    - listitem:
      - button "청소용품 1":
        - button:
          - img
        - text: 청소용품 1
  - button "배송":
    - text: 배송
    - img
  - navigation:
    - listitem:
      - button "판매자배송 25":
        - button:
          - img
        - text: 판매자배송 25
    - listitem:
      - button "샛별배송 4":
        - button:
          - img
        - text: 샛별배송 4
  - button "포장타입":
    - text: 포장타입
    - img
  - navigation:
    - listitem:
      - button "상온 28":
        - button:
          - img
        - text: 상온 28
  - button "가격":
    - text: 가격
    - img
  - navigation:
    - listitem:
      - button "29,650원 미만":
        - button:
          - img
        - text: 29,650원 미만
    - listitem:
      - button "29,650원 ~ 42,900원":
        - button:
          - img
        - text: 29,650원 ~ 42,900원
    - listitem:
      - button "42,900원 ~ 81,500원":
        - button:
          - img
        - text: 42,900원 ~ 81,500원
    - listitem:
      - button "81,500원 이상":
        - button:
          - img
        - text: 81,500원 이상
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
        - button "ㄹ"
      - listitem:
        - button "ㅇ"
      - listitem:
        - button "ㅎ"
    - listitem:
      - button "로지텍 13":
        - button:
          - img
        - text: 로지텍 13
    - listitem:
      - button "릴리바이레드 1":
        - button:
          - img
        - text: 릴리바이레드 1
    - listitem:
      - button "앱코 3":
        - button:
          - img
        - text: 앱코 3
    - listitem:
      - button "엔보우 7":
        - button:
          - img
        - text: 엔보우 7
    - listitem:
      - button "오아 1":
        - button:
          - img
        - text: 오아 1
    - listitem:
      - button "홈모먼트 1":
        - button:
          - img
        - text: 홈모먼트 1
  - button "혜택":
    - text: 혜택
    - img
  - navigation:
    - listitem:
      - button "할인상품 16":
        - button:
          - img
        - text: 할인상품 16
  - button "출시":
    - text: 출시
    - img
  - navigation:
    - listitem:
      - button "새로나온 5":
        - button:
          - img
        - text: 새로나온 5
  - button "프로모션":
    - text: 프로모션
    - img
  - navigation:
    - listitem:
      - button "아이콘벌쓰위크 1":
        - button:
          - img
        - img "아이콘"
        - text: 벌쓰위크 1
  - text: 총 29건
  - list:
    - listitem:
      - link "추천순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=4
      - img
    - listitem:
      - link "신상품순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=0
    - listitem:
      - link "판매량순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=1
    - listitem:
      - link "혜택순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=5
    - listitem:
      - link "낮은 가격순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=2
    - listitem:
      - link "높은 가격순":
        - /url: /search?sword=%ED%82%A4%EB%B3%B4%EB%93%9C&page=1&per_page=96&sorted_type=3
  - link "담기 판매자배송 [엔보우] 블루투스 무선키보드 N패드네오+키스킨 증정 35,900원 16%29,900원 무료배송":
    - /url: /goods/1001317230
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 블루투스 무선키보드 N패드네오+키스킨 증정 35,900원 16%29,900원 무료배송
  - link "담기 판매자배송 [오아] 무선 키보드 콤보 마우스 무소음 사무용 멀티페어링 (마우스세트) 42,900원 30%29,900원 무료배송":
    - /url: /goods/1001110807
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [오아] 무선 키보드 콤보 마우스 무소음 사무용 멀티페어링 (마우스세트) 42,900원 30%29,900원 무료배송
  - link "+15%쿠폰 담기 샛별배송 [릴리바이레드] 무드 키보드 7종 (택1) 다채로운 애쉬 컬러 팔레트 29,000원 33%19,300원~ 31":
    - /url: /goods/1000145219
    - paragraph: +15%쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [릴리바이레드] 무드 키보드 7종 (택1)
    - paragraph: 다채로운 애쉬 컬러 팔레트
    - text: 29,000원 33%19,300원~
    - img
    - text: "31"
  - link "+10% 쿠폰 담기 판매자배송 [앱코] AN07S 옵티컬 게이밍 기계식 키보드 99,000원 46%52,500원 무료배송":
    - /url: /goods/1001317188
    - paragraph: +10% 쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [앱코] AN07S 옵티컬 게이밍 기계식 키보드 99,000원 46%52,500원 무료배송
  - link "담기 판매자배송 [오아] 4단 접이식 블루투스 키보드 휴대용 저소음 49,900원 24%37,900원 무료배송":
    - /url: /goods/1000915991
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [오아] 4단 접이식 블루투스 키보드 휴대용 저소음 49,900원 24%37,900원 무료배송
  - link "+20%쿠폰 최대혜택가 79,920원 담기 샛별배송 [로지텍] [단독 파우치 증정] Signature K855 무선 키보드 99,900원":
    - /url: /goods/1001346760
    - paragraph: +20%쿠폰
    - text: 최대혜택가 79,920원
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [로지텍] [단독 파우치 증정] Signature K855 무선 키보드 99,900원
  - link "+10% 쿠폰 담기 판매자배송 [앱코] K580 투톤 교체축 게이밍 기계식 키보드 59,900원 46%31,900원 무료배송":
    - /url: /goods/1001317197
    - paragraph: +10% 쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [앱코] K580 투톤 교체축 게이밍 기계식 키보드 59,900원 46%31,900원 무료배송
  - link "+20%쿠폰 최대혜택가 103,200원 담기 샛별배송 [로지텍] [단독 파우치 증정] WAVE KEYS 인체공학 무선 키보드 129,000원":
    - /url: /goods/1001338032
    - paragraph: +20%쿠폰
    - text: 최대혜택가 103,200원
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [로지텍] [단독 파우치 증정] WAVE KEYS 인체공학 무선 키보드 129,000원
  - link "+20%쿠폰 최대혜택가 55,920원 담기 판매자배송 [로지텍] [단독 파우치 증정] POP ICON KEYS 블루투스 무선 키보드 69,900원 무료배송":
    - /url: /goods/1001346752
    - paragraph: +20%쿠폰
    - text: 최대혜택가 55,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] POP ICON KEYS 블루투스 무선 키보드 69,900원 무료배송
  - link "+20%쿠폰 최대혜택가 87,200원 담기 샛별배송 [로지텍][단독 파우치 증정] Keys-to-go 2 블루투스 무선 키보드 109,000원":
    - /url: /goods/1001338043
    - paragraph: +20%쿠폰
    - text: 최대혜택가 87,200원
    - button "담기":
      - img
      - text: 담기
    - text: 샛별배송 [로지텍][단독 파우치 증정] Keys-to-go 2 블루투스 무선 키보드 109,000원
  - link "+20%쿠폰 최대혜택가 63,200원 담기 판매자배송 [로지텍] [단독 파우치 증정] G413 TKL SE 유선 게이밍 키보드 79,000원 무료배송":
    - /url: /goods/1001346753
    - paragraph: +20%쿠폰
    - text: 최대혜택가 63,200원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] G413 TKL SE 유선 게이밍 키보드 79,000원 무료배송
  - link "+20%쿠폰 최대혜택가 71,920원 담기 판매자배송 [로지텍] [단독 파우치 증정] G413 SE 유선 게이밍 키보드 블랙 89,000원 무료배송":
    - /url: /goods/1001346735
    - paragraph: +20%쿠폰
    - text: 최대혜택가 71,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] G413 SE 유선 게이밍 키보드 블랙 89,000원 무료배송
  - link "+20%쿠폰 최대혜택가 103,200원 담기 판매자배송 [로지텍] [파우치 증정] SIGNATURE SLIM MK950 무선 키보드 마우스 세트 129,000원 무료배송":
    - /url: /goods/1001346730
    - paragraph: +20%쿠폰
    - text: 최대혜택가 103,200원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [파우치 증정] SIGNATURE SLIM MK950 무선 키보드 마우스 세트 129,000원 무료배송
  - link "+20%쿠폰 최대혜택가 35,920원 담기 판매자배송 [로지텍] [단독 파우치 증정] MK295 SILENT 무선 키보드 마우스 세트 44,900원 무료배송":
    - /url: /goods/1001346698
    - paragraph: +20%쿠폰
    - text: 최대혜택가 35,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] MK295 SILENT 무선 키보드 마우스 세트 44,900원 무료배송
  - link "+20%쿠폰 최대혜택가 55,920원 담기 판매자배송 [로지텍] [단독 파우치 증정] PEBBLE 2 Combo 무선 키보드 마우스 세트 69,900원 무료배송":
    - /url: /goods/1001346699
    - paragraph: +20%쿠폰
    - text: 최대혜택가 55,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] PEBBLE 2 Combo 무선 키보드 마우스 세트 69,900원 무료배송
  - link "+10% 쿠폰 담기 판매자배송 [앱코] K480 교체축 게이밍 기계식 텐키리스 키보드 59,900원 51%28,900원 무료배송":
    - /url: /goods/1001317157
    - paragraph: +10% 쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [앱코] K480 교체축 게이밍 기계식 텐키리스 키보드 59,900원 51%28,900원 무료배송
  - link "담기 판매자배송 [엔보우] 블루투스 무선 4채널 키보드 N패드맥스 백라이트+키스킨 증정 45,900원 13%39,900원 무료배송":
    - /url: /goods/1001317893
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 블루투스 무선 4채널 키보드 N패드맥스 백라이트+키스킨 증정 45,900원 13%39,900원 무료배송
  - link "담기 판매자배송 [엔보우] 휴대용 접이식 블루투스 무선키보드 N패드 32,900원 24%24,900원 무료배송":
    - /url: /goods/1001317236
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 휴대용 접이식 블루투스 무선키보드 N패드 32,900원 24%24,900원 무료배송
  - link "담기 판매자배송 [엔보우] 휴대용 블루투스 무선키보드 N패드프로+키스킨 증정 24,900원 20%19,900원 무료배송":
    - /url: /goods/1001317876
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 휴대용 블루투스 무선키보드 N패드프로+키스킨 증정 24,900원 20%19,900원 무료배송
  - link "담기 판매자배송 [엔보우] 블루투스 무선키보드 N패드플립 터치패드 45,900원 13%39,900원 무료배송":
    - /url: /goods/1001317891
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 블루투스 무선키보드 N패드플립 터치패드 45,900원 13%39,900원 무료배송
  - link "+20%쿠폰 최대혜택가 35,920원 담기 판매자배송 [로지텍] [단독 파우치 증정] PEBBLE K380s 무선 키보드 [수신기 미포함] 44,900원 무료배송":
    - /url: /goods/1001346762
    - paragraph: +20%쿠폰
    - text: 최대혜택가 35,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [단독 파우치 증정] PEBBLE K380s 무선 키보드 [수신기 미포함] 44,900원 무료배송
  - link "+20%쿠폰 최대혜택가 159,200원 담기 판매자배송 [로지텍] [파우치 증정] G713 오로라 컬렉션 유선 게이밍 키보드 화이트 (갈축/적축) 199,000원 무료배송":
    - /url: /goods/1001346742
    - paragraph: +20%쿠폰
    - text: 최대혜택가 159,200원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [파우치 증정] G713 오로라 컬렉션 유선 게이밍 키보드 화이트 (갈축/적축) 199,000원 무료배송
  - link "+20%쿠폰 최대혜택가 199,200원 담기 판매자배송 [로지텍] [사은품 증정] G715 오로라 컬렉션 무선 게이밍 키보드 화이트 (갈축/적축) 249,000원 무료배송":
    - /url: /goods/1001346734
    - paragraph: +20%쿠폰
    - text: 최대혜택가 199,200원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] [사은품 증정] G715 오로라 컬렉션 무선 게이밍 키보드 화이트 (갈축/적축) 249,000원 무료배송
  - link "담기 판매자배송 [엔보우] 휴대용 블루투스 무선키보드 N패드라이트+키스킨 증정 19,900원 25%14,900원 무료배송":
    - /url: /goods/1001317231
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 휴대용 블루투스 무선키보드 N패드라이트+키스킨 증정 19,900원 25%14,900원 무료배송
  - link "+20%쿠폰 최대혜택가 59,920원 담기 판매자배송 [로지텍] MK470 슬림 무선 콤보 74,900원 무료배송":
    - /url: /goods/1001346763
    - paragraph: +20%쿠폰
    - text: 최대혜택가 59,920원
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [로지텍] MK470 슬림 무선 콤보 74,900원 무료배송
  - link "+15%쿠폰 담기 판매자배송 [다니카] 고급 와이드 가죽 철판 데스크패드 일반형 10종 (택1) 데스크인테리어의 사작 79,000원 45%42,900원 무료배송":
    - /url: /goods/1000927145
    - paragraph: +15%쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [다니카] 고급 와이드 가죽 철판 데스크패드 일반형 10종 (택1)
    - paragraph: 데스크인테리어의 사작
    - text: 79,000원 45%42,900원 무료배송
  - link "+15%쿠폰 담기 판매자배송 [다니카] 고급 와이드 가죽 철판 데스크패드 ㄱ자형 10종 (택1) 데스크인테리어의 사작 79,000원 45%42,900원 무료배송":
    - /url: /goods/1000907731
    - paragraph: +15%쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [다니카] 고급 와이드 가죽 철판 데스크패드 ㄱ자형 10종 (택1)
    - paragraph: 데스크인테리어의 사작
    - text: 79,000원 45%42,900원 무료배송
  - link "담기 판매자배송 [엔보우] 고속 무선충전 마우스장패드 WCPADL 데스크매트 22,900원 30%15,900원 무료배송":
    - /url: /goods/1001318660
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [엔보우] 고속 무선충전 마우스장패드 WCPADL 데스크매트 22,900원 30%15,900원 무료배송
  - link "+5%쿠폰 담기 판매자배송 [홈모먼트] 틈새 청소 우드 브러쉬 17,000원 59%6,900원 47 무료배송":
    - /url: /goods/1000590776
    - paragraph: +5%쿠폰
    - button "담기":
      - img
      - text: 담기
    - text: 판매자배송 [홈모먼트] 틈새 청소 우드 브러쉬 17,000원 59%6,900원
    - img
    - text: 47 무료배송
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
> 24 |     await page.goto('https://www.kurly.com/main');
     |                ^ Error: page.goto: NS_ERROR_FAILURE
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
  36 |       await page.waitForTimeout(3000); 
  37 |     } else {
  38 |       console.log(`❗검색 결과 없음: ${search_term}`);
  39 |     }
  40 |
  41 |     // 스크린샷 저장
  42 |     const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
  43 |     const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
  44 |     await page.screenshot({ path: screenshotPath });
  45 |     console.log(`📸 스크린샷 경로: ${screenshotPath}`);
  46 |     console.log(`Test Case ID: ${tc_id}, Search Term: ${search_term}, Results Count: ${count}`);
  47 |   }
  48 |   await page.close();
  49 | });
  50 | test.afterAll(() => {
  51 |   console.log('모든 테스트가 완료되었습니다.');
  52 | });
```