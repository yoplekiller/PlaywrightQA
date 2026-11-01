import { Page, Response } from '@playwright/test';

// 검색 결과 화면이 호출하는 실제 검색 API (2026-11-01 네트워크 실측).
// 예: GET https://api.kurly.com/search/v4/sites/market/normal-search?keyword=사과&sortType=2&page=1
export const SEARCH_API = '/search/v4/sites/market/normal-search';

// 정렬 탭 → 검색 API sortType 값 (화면 URL 의 sorted_type 과 같은 값)
export const SORT_TYPES = {
  '추천순': '4',
  '낮은 가격순': '2',
  '높은 가격순': '3',
} as const;

export interface SearchItem {
  no: number;
  name: string;
  salesPrice: number;
  discountedPrice: number | null;
  isSoldOut: boolean;
}

// 화면에 보이는 가격(쿠폰·첫구매 혜택가 등)과 달리, 검색 API 의 정렬 기준이 되는 실제 판매가
export const effectivePrice = (item: SearchItem) => item.discountedPrice ?? item.salesPrice;

export function waitForSearchResponse(page: Page, sortType?: string): Promise<Response> {
  return page.waitForResponse(
    res => res.url().includes(SEARCH_API) && (!sortType || new URL(res.url()).searchParams.get('sortType') === sortType),
    { timeout: 15000 },
  );
}

export async function parseSearchItems(response: Response): Promise<SearchItem[]> {
  const body = await response.json();
  const section = body?.data?.listSections?.find((s: any) => s?.view?.sectionCode === 'PRODUCT_LIST');
  return section?.data?.items ?? [];
}
