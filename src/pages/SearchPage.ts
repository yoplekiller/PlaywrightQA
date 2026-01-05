import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {

    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
   
    


    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByRole('textbox', { name: /검색어를 입력해주세요\./i });
        this.searchButton = page.getByRole('button', { name: /검색/i });
    }
}