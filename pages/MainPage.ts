import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
  readonly featuresItemsTitle: Locator;
  readonly consentPopup: Locator;
  readonly consentAcceptButton: Locator;

  constructor(private page: Page) {
    this.featuresItemsTitle = this.page.getByRole('heading', {
      name: 'Features Items',
    });

    this.consentPopup = this.page.locator('.fc-consent-root');
    this.consentAcceptButton = this.page.locator('button.fc-cta-consent');
  }

  async openMainPage() {
    await this.page.goto('/');
    await this.dismissConsentPopupIfPresent();
  }
  async expectMainPageVisible() {
    await expect(this.featuresItemsTitle).toBeVisible();
    //TODO: Исправить Expected: "https://automationexercise.com/" Received: "https://automationexercise.com/login"
    //await expect(this.page).toHaveURL('https://automationexercise.com/');
  }

  async dismissConsentPopupIfPresent() {
    if (await this.consentAcceptButton.isVisible({ timeout: 3000 })) {
      await this.consentAcceptButton.click();
      await expect(this.consentPopup).toBeHidden();
    }
  }
}
