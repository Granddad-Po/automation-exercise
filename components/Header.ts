import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly loggedAsUsernameLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedText: Locator;
  readonly continueLink: Locator;

  constructor(private page: Page) {
    this.loggedAsUsernameLink = this.page.getByText('Logged in as');
    this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    this.accountDeletedText = this.page.getByRole('heading', { name: 'Account Deleted!' });
    this.continueLink = this.page.getByRole('link', { name: 'Continue' });
  }

  async expectLoggedInAs(name: string) {
    await expect(this.loggedAsUsernameLink).toBeVisible();
    await expect(this.loggedAsUsernameLink).toContainText(name);
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
    await expect(this.accountDeletedText).toBeVisible();
    await this.continueLink.click();
    await expect(this.page).toHaveURL('/');
  }
}
