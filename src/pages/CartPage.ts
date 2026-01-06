import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {




    private readonly loginButtoninCart: Locator;
    private readonly EmptyCartText: Locator;





  constructor(page: Page) {
    super(page);
    this.loginButtoninCart = page.getByRole('button', { name: /로그인/i })
    this.EmptyCartText = page.getByText('장바구니에 담긴 상품이 없습니다');
  }






}