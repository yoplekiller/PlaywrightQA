import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {

    // Locators for login page elements
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly signupButton: Locator;
    private readonly naverLoginButton: Locator;
    private readonly kakaoLoginButton: Locator;

    
    constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: /아이디를 입력해주세요/i });
    this.passwordInput = page.getByRole('textbox', { name: /비밀번호를 입력해주세요/i });
    this.submitButton = page.getByRole('button', { name: /로그인/i });
    this.signupButton = page.getByRole('button', { name: /회원가입/i });
    this.naverLoginButton = page.getByRole('button', { name: /네이버로 계속하기/i });
    this.kakaoLoginButton = page.getByRole('button', { name: /카카오로 계속하기/i });

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
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async clickSignup() {
    await this.click(this.signupButton);
  }
}
