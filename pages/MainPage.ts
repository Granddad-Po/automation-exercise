import { Locator, Page, expect } from '@playwright/test';

class MainPage {
  readonly page: Page;
  readonly mainPageLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPageLogo = this.page.getByRole('img', {
      name: 'Website for automation practice',
    });
  }

  async openMainPage() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.mainPageLogo).toBeVisible;
  }
}
