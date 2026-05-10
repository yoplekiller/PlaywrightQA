import {Page, Locator} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
// 페이지로 이동하는 공통 메서드
async goto(url: string) {
    await this.page.goto(url);
}

// 클릭하는 공통 메서드
async click(locator : Locator) {
    await locator.click();
}

// 입력 필드에 값을 채우는 공통 메서드
async fill(locator: Locator, text: string) {
    await locator.fill(text);
}

// 텍스트를 가져오는 공통 메서드
async hover(locator: Locator) {
    await locator.hover();
}
async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
}

// 스크린샷을 찍는 공통 메서드
async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
}

// 뷰포트 크기를 설정하는 공통 메서드
async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
}

}
