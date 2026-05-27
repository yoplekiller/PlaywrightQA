export type SearchCase = {
  tc_id: string;
  search_term: string;
};

export const searchCases: SearchCase[] = [
  { tc_id: 'SEARCH_001', search_term: '수박' },
  { tc_id: 'SEARCH_002', search_term: '바나나' },
  { tc_id: 'SEARCH_003', search_term: '우유' },
];
