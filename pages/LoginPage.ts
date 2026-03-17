import { Locator, Page, expect } from '@playwright/test';
import { User } from '../types/user';

export class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupForm: Locator;
  readonly signupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator('form').filter({
      has: page.getByRole('heading', { name: 'Login to your account' }),
    });
    this.loginTitle = this.page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = this.loginForm.getByPlaceholder('Email Address');
    this.loginPasswordInput = this.loginForm.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });

    this.signupForm = page.locator('form').filter({ hasText: 'Signup' });
    this.signupTitle = this.page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = this.signupForm.getByPlaceholder('Name');
    this.signupEmailInput = this.signupForm.getByPlaceholder('Email Address');
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
