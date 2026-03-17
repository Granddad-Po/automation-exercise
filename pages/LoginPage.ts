import { Locator, Page, expect } from '@playwright/test';
import { User } from '../types/user';

export class LoginPage {
  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(private page: Page) {
    this.loginTitle = this.page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = this.page.getByTestId('login-email');
    this.loginPasswordInput = this.page.getByTestId('login-password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });

    this.signupTitle = this.page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = this.page.getByTestId('signup-name');
    this.signupEmailInput = this.page.getByTestId('signup-email');
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
  }

  async expectSignupPageVisible() {
    await expect(this.signupTitle).toBeVisible();
  }

  async fillNameSignup(name: string) {
    await this.signupNameInput.fill(name);
  }
  async fillEmailSignup(email: string) {
    await this.signupEmailInput.fill(email);
  }
  async checkFilledSignupForm(user: Pick<User, 'name' | 'email'>) {
    await expect(this.signupNameInput).toHaveValue(user.name);
    await expect(this.signupEmailInput).toHaveValue(user.email);
  }
  async clickSignup() {
    await this.signupButton.click();
  }
  async signupAs(user: Pick<User, 'name' | 'email'>) {
    await this.fillNameSignup(user.name);
    await this.fillEmailSignup(user.email);
    await this.checkFilledSignupForm(user);
    await this.clickSignup();
  }

  async fillEmailLogin(email: string) {
    await this.loginEmailInput.fill(email);
  }
  async fillPasswordLogin(password: string) {
    await this.loginPasswordInput.fill(password);
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async loginAs(user: Pick<User, 'email' | 'password'>) {
    await this.fillEmailLogin(user.email);
    await this.fillPasswordLogin(user.password);
    await this.clickLogin();
  }
}
