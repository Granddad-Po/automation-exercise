import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = this.page.getByRole('link', {
      name: 'Website for automation',
    });
    this.signupLoginLink = this.page.getByRole('link', {
      name: 'Signup / Login',
    });
  }

  async openMainPage() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.logoLink).toBeVisible();
  }
  async expectSignupLoginLinkVisible() {
    await expect(this.signupLoginLink).toBeVisible();
  }
  async clickSignupLoginLink() {
    await this.signupLoginLink.click();
  }
}
