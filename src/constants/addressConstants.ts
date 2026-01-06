/**
 * 주소 검색 관련 상수
 */
export const ADDRESS_CONSTANTS = {
    // iframe title 속성
    IFRAME_TITLE_OUTER: '우편번호서비스 레이어 프레임',
    IFRAME_TITLE_INNER: '우편번호 검색 프레임',

    // 버튼 텍스트
    BUTTON_ADDRESS_SEARCH: '주소 검색',
    BUTTON_SEARCH: '검색',
    BUTTON_SAVE: '저장',
    BUTTON_CONFIRM: /확인|확정|confirm/i,

    // 검색창 placeholder
    PLACEHOLDER_SEARCH_BOX: /검색할 도로명/,

    // 예시 텍스트
    EXAMPLE_TEXT: '예) 판교역로 166, 분당 주공, 백현동',

    // 테스트 데이터 ID
    INPUT_BOX_TEST_ID: 'input-box'
} as const;
