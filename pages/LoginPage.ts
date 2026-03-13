import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
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

    this.signupForm = page.locator('form').filter({ hasText: 'Signup' });
    this.signupTitle = this.page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = this.signupForm.getByPlaceholder('Name');
    this.signupEmailInput = this.signupForm.getByPlaceholder('Email Address');
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
  }

  async checkLoginPageVisible() {
    await expect(this.signupTitle).toBeVisible();
  }

  async fillNameSignup() {
    await this.signupNameInput.fill('test98765');
  }
  async fillEmailSignup() {
    await this.signupEmailInput.fill('test98765@mail.ru');
  }

  async checkFilledSignupForm() {
    await expect(this.signupNameInput).toHaveValue('test98765');
    await expect(this.signupEmailInput).toHaveValue('test98765@mail.ru');
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }
}
