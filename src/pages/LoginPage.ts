import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {

    private readonly loginButton: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly marketButton: Locator;
    private readonly beautyButton: Locator;

    
    constructor(page: Page) {
    super(page);
    this.loginButton = page.locator('a').filter({ hasText: '로그인' });
    this.usernameInput = page.getByRole('textbox', { name: '아이디를 입력해주세요' });
    this.passwordInput = page.getByRole('textbox', { name: '비밀번호를 입력해주세요' });
    this.submitButton = page.getByRole('button', { name: '로그인' });
    this.marketButton = page.getByRole('button', { name: '마켓컬리' });
    this.beautyButton = page.getByRole('button', { name: '뷰티컬리' });
  }

  
  async clickLoginButton() {
    await this.click(this.loginButton)
  }

  async fillUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }

  async login(username: string, password: string) {
    await this.clickLoginButton();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

   async isMarketButtonVisible(): Promise<boolean> {
    return await this.marketButton.isVisible({timeout: 5000});
  }

  async isBeautyButtonVisible(): Promise<boolean> {
    return await this.beautyButton.isVisible({timeout: 5000});
  }
};
