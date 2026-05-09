import { expect, Page } from '@playwright/test';

export class AddressPage {
  constructor(private readonly popup: Page) {}

  async verifyPopupUrl() {
    await expect(this.popup).toHaveURL(/\/address\/shipping-address.*/);
  }

  async searchAddress(keyword: string) {
    await this.popup.getByRole('textbox').first().fill(keyword);
    await this.popup.getByRole('button', { name: /검색/ }).first().click();
  }

  async selectFirstSearchResult() {
    await this.popup.locator('li, tr').first().click();
  }

  async saveAddress() {
    const save = this.popup.getByRole('button', { name: /저장|선택|완료/ }).first();
    if (await save.isVisible().catch(() => false)) await save.click();
  }

  async completeSearchAndSave(keyword: string) {
    await this.verifyPopupUrl();
    await this.searchAddress(keyword);
    await this.selectFirstSearchResult();
    await this.saveAddress();
  }
}
