import { products } from './products';

export type SearchCase = {
  tc_id: string;
  search_term: string;
};

export const searchCases: SearchCase[] = [
  { tc_id: 'SEARCH_001', search_term: products.watermelon },
  { tc_id: 'SEARCH_002', search_term: products.banana },
  { tc_id: 'SEARCH_003', search_term: products.milk },
];
