import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = this.page.getByRole('link', {
      name: 'Website for automation',
    });
    this.loginLink = this.page.getByRole('link', { name: 'Signup / Login' });
  }

  async openMainPage() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.page).toHaveURL('https://automationexercise.com/');
    await expect(this.logoLink).toBeVisible();
  }
  async checkLoginLinkVisability() {
    await expect(this.loginLink).toBeVisible();
  }
  async clickLoginLink() {
    await this.loginLink.click();
  }
}
