/**
 * 주소 검색 팝업
 * 새 창으로 열리는 주소 검색 팝업 페이지를 다루는 스크립트
 * @module AddressSearchPage
 */
import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ADDRESS_CONSTANTS } from '../constants/addressConstants';


export class AddressSearchPage extends BasePage {

      // 주소 검색 팝업의 요소들에 대한 Locator 정의
    private readonly addressInput: Locator;
    private readonly searchButton: Locator;
    private readonly firstResultAddress: Locator;

    constructor(page: Page) {
        super(page);

        this.addressInput = page.getByRole('textbox', { name: ADDRESS_CONSTANTS.PLACEHOLDER_SEARCH_BOX });
        this.searchButton = page.getByRole('button', { name: ADDRESS_CONSTANTS.BUTTON_SEARCH });
        this.firstResultAddress = page.getByRole('button').first();

    }



    private getAddressIframe(popup: Page) {
        const firstFrame = popup.frameLocator(`iframe[title="${ADDRESS_CONSTANTS.IFRAME_TITLE_OUTER}"]`);
        const secondFrame = firstFrame.frameLocator(`iframe[title="${ADDRESS_CONSTANTS.IFRAME_TITLE_INNER}"]`);
        return firstFrame.frameLocator('iframe#entryIframe');
    }
     
    // ===== 주소 검색 관련 Public 메서드 =====

/**
 * 주소 검색 팝업을 열고 주소를 검색합니다
 * @param address 검색할 주소 (예: '방이동', '판교역로 166')
 * @returns popup과 addressFrame 객체
 */
    async searchAddressInPopup(address: string){
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: ADDRESS_CONSTANTS.BUTTON_ADDRESS_SEARCH }).click();
        const popup = await popupPromise;
        const addressIframe = this.getAddressIframe(popup);
        const searchBox = addressIframe.getByRole('textbox', { name: ADDRESS_CONSTANTS.PLACEHOLDER_SEARCH_BOX });
        await searchBox.fill(address);
        await addressIframe.getByRole('button', { name: ADDRESS_CONSTANTS.BUTTON_SEARCH }).click();
    
    //검색 결과 대기 
    await addressIframe.getByRole('button').first().waitFor({ state: 'visible' });
    return {popup, addressIframe};
    }

    /**
     * 검색 결과에서 주소를 선택하고 상세주소를 입력한 후 저장합니다
     * @param popup 주소 검색 팝업 Page 객체
     * @param addressFrame iframe FrameLocator
     * @param addressName 선택할 주소 이름 (예: '서울 송파구 가락로 232')
     * @param detailAddress 상세 주소 (예: '222', '1층')
     */
    async selectAddressInPopup(
        popup: Page,
        addressFrame: FrameLocator,
        addressName: string,
        detailAddress: string
    ) {
        // 주소 선택
        await addressFrame.getByRole('button', {
            name: new RegExp(addressName)
        }).click();

        // 상세 주소 입력
        if (detailAddress) {
            await popup.getByTestId(ADDRESS_CONSTANTS.INPUT_BOX_TEST_ID).fill(detailAddress);
        }

        // 저장
        await popup.getByRole('button', {
            name: ADDRESS_CONSTANTS.BUTTON_SAVE
        }).click();
    }

    /**
     * 저장된 주소가 표시되는지 확인합니다
     * @param expectedAddress 확인할 주소 문자열
     * @returns 주소가 보이면 true
     */
    async verifyAddressDisplayed(expectedAddress: string): Promise<boolean> {
        const addressLocator = this.page.getByText(expectedAddress, { exact: false });
        return await addressLocator.isVisible();
    }
}

