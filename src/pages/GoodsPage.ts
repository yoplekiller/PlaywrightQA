import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class GoodsPage extends BasePage {


    private readonly likeButtonLocator: Locator;

    constructor(page: Page) {
        super(page);


        this.likeButtonLocator = page.getByLabel('찜하기'); // 찜하기 버튼
        
    }

    async clickLikeButton() {
        await this.click(this.likeButtonLocator); 

    }
    async isCompletedLikeGoodsVisible(): Promise<boolean> {
      try {
        await this.page.waitForSelector('text=상품을 찜했어요.', { timeout: 3000, state: 'visible' });
        return true;
      } catch {
        return false;
}
    }
}