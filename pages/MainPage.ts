import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
  readonly logoLink: Locator;
  readonly consentPopup: Locator;
  readonly consentAcceptButton: Locator;

  constructor(private page: Page) {
    this.logoLink = this.page.getByRole('link', {
      name: 'Website for automation',
    });

    this.consentPopup = this.page.locator('.fc-consent-root');
    this.consentAcceptButton = this.page.locator('button.fc-cta-consent');
  }

  async openMainPage() {
    await this.page.goto('/');
    await this.dismissConsentPopupIfPresent();
  }
  async expectMainPageVisible() {
    await expect(this.logoLink).toBeVisible();
  }

  async dismissConsentPopupIfPresent() {
    if (await this.consentAcceptButton.isVisible({ timeout: 3000 })) {
      await this.consentAcceptButton.click();
      await expect(this.consentPopup).toBeHidden();
    }
  }
}
