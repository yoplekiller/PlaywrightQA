import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';

// 장바구니 결제금액 패널은 로그인 없이도 /external-cart/v1/payment/calculate 응답을
// 그대로 렌더링한다(실사이트 확인, 2026-09-20). 이 API를 page.route()로 목킹해서
// 실제 계정/실제 결제 없이 "결제금액 패널이 응답을 정확히 반영하는지"와
// "API 실패 시 에러 처리가 되는지" 같은 로직을 검증한다.
const PAYMENT_CALCULATE_URL = '**/external-cart/v1/payment/calculate';

test.describe('장바구니 결제금액 계산 (API 목킹)', () => {
    test.beforeEach(async ({ page, mainPage, searchPage, goodsPage }) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });
        await mainPage.searchGoods(products.watermelon);
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });
        await searchPage.clickFirstGoods();
        await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });
        await goodsPage.clickAddGoodsInCartButton(1);
    });

    test('결제금액 패널이 API 응답 데이터를 정확히 반영한다 @regression', async ({ page, cartPage }) => {
        await page.route(PAYMENT_CALCULATE_URL, (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        totalOriginalPrice: 12345,
                        totalDiscountedPrice: 1000,
                        deliveryPrice: 2500,
                        totalCouponDiscountPrice: 0,
                        totalProductCouponDiscountPrice: 0,
                        totalCartCouponDiscountPrice: 0,
                        totalPaymentPrice: 13845,
                    },
                    message: null,
                    success: true,
                }),
            })
        );

        await page.goto('/cart');
        await expect(page).toHaveURL(/\/cart/);

        await cartPage.expectPaymentSummary({
            productPrice: '12,345원',
            deliveryPrice: '2,500원',
            totalPaymentPrice: '13,845원',
        });
    });

    test('API 응답 실패 시 서버 오류 안내 모달이 노출된다 @regression', async ({ page, cartPage }) => {
        // 실제 서버를 강제로 에러 내는 건 불가능해서, 실 계정/재현 조건 없이
        // 이 에러 처리 로직을 검증하려면 응답을 목킹하는 방법뿐이다.
        await page.route(PAYMENT_CALCULATE_URL, (route) =>
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ data: null, message: '서버 오류', success: false }),
            })
        );

        await page.goto('/cart');
        await expect(page).toHaveURL(/\/cart/);

        await cartPage.expectServerErrorModalAndDismiss();
    });

    // 실측 발견(2026-09-20): 배송비가 0원인 응답을 받으면 결제금액 패널은 "0원"으로,
    // 같은 화면의 상품 카드 하단 요약 줄은 "무료"로 서로 다르게 표시한다. 실제 계정으로는
    // 프로모션/최소주문금액 조건을 맞춰야 재현되는 상태라 실기기 확인이 어려웠던 케이스를
    // 목킹으로 바로 재현함 - a11y/반응형 테스트와 같은 방식으로 억지로 통과시키지 않고
    // 실제 발견된 불일치를 그대로 fail 상태로 둔다.
    test('무료배송(배송비 0원) 표기가 결제금액 패널과 상품 요약 줄에서 일치해야 한다 @regression', async ({
        page,
        cartPage,
    }) => {
        await page.route(PAYMENT_CALCULATE_URL, (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        totalOriginalPrice: 30000,
                        totalDiscountedPrice: 0,
                        deliveryPrice: 0,
                        totalCouponDiscountPrice: 0,
                        totalProductCouponDiscountPrice: 0,
                        totalCartCouponDiscountPrice: 0,
                        totalPaymentPrice: 30000,
                    },
                    message: null,
                    success: true,
                }),
            })
        );

        await page.goto('/cart');
        await expect(page).toHaveURL(/\/cart/);

        await cartPage.expectDeliveryPriceConsistentAcrossPanels();
    });
});
