import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly loggedAsUsernameLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedText: Locator;
  readonly continueLink: Locator;
  readonly logoutLink: Locator;
  readonly contactUsLink: Locator;
  readonly signupLoginLink: Locator;
  readonly homeLink: Locator;
  readonly testCasesLink: Locator;
  readonly productsLink: Locator;

  constructor(private page: Page) {
    this.loggedAsUsernameLink = this.page.getByText('Logged in as');
    this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    this.accountDeletedText = this.page.getByRole('heading', { name: 'Account Deleted!' });
    this.continueLink = this.page.getByRole('link', { name: 'Continue' });
    this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
    this.contactUsLink = this.page.getByRole('link', { name: 'Contact us' });
    this.signupLoginLink = this.page.getByRole('link', {
      name: 'Signup / Login',
    });
    this.homeLink = this.page.getByRole('link', { name: 'Home' });
    this.testCasesLink = this.page.getByRole('link', { name: ' Test Cases' });
    this.productsLink = this.page.getByRole('link', { name: 'Products' });
  }

  async expectLoggedInAs(name: string) {
    await expect(this.loggedAsUsernameLink).toBeVisible();
    await expect(this.loggedAsUsernameLink).toContainText(name);
  }

  async expectLogoutButtonVisible() {
    await expect(this.logoutLink).toBeVisible();
  }

  async clickLogoutButton() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
    await expect(this.accountDeletedText).toBeVisible();
    await this.continueLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async openSignupLoginPage() {
    await this.signupLoginLink.click();
  }

  async openContactUsPage() {
    await this.contactUsLink.click();
  }

  async openMainPage() {
    await this.homeLink.click();
  }

  async openTestCasesPage() {
    await this.testCasesLink.click();
  }

  async openProductsPage() {
    await this.productsLink.click();
  }
}
