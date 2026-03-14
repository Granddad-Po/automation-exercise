import { expect, Locator, Page } from '@playwright/test';
import type { User } from '../types/user';

export class SignupPage {
  readonly page: Page;
  readonly accountInfoText: Locator;
  readonly mrRadio: Locator;
  readonly mrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountInfoText = this.page.getByText('Enter Account Information');
    this.mrRadio = this.page.getByRole('radio', { name: 'Mr.' });
    this.mrsRadio = this.page.getByRole('radio', { name: 'Mrs.' });
    this.nameInput = this.page.getByRole('textbox', { name: 'Name *', exact: true });
    this.emailInput = this.page.getByRole('textbox', { name: 'Name *', exact: true });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    this.daySelect = this.page.locator('#days');
    this.monthSelect = this.page.locator('#months');
    this.yearSelect = this.page.locator('#years');
    this.newsletterCheckbox = this.page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.specialOffersCheckbox = this.page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
  }

  async expectSignupPageVisible() {
    await expect(this.accountInfoText).toBeVisible();
  }
  async selectGender(gender?: 'Mr.' | 'Mrs.') {
    switch (gender) {
      case 'Mr.':
        return await this.mrRadio.check();
      case 'Mrs.':
        return await this.mrsRadio.check();
      default:
        return;
    }
  }

  //TODO: Подумать о выносе типа User
  async ensureNameAndEmailFilled(user: Pick<User, 'name' | 'email'>) {
    const currentName = await this.nameInput.inputValue();
    const currentEmail = await this.emailInput.inputValue();

    if (currentName !== user.name) {
      await this.nameInput.fill(user.name);
    }
    if (currentEmail !== user.email) {
      await this.emailInput.fill(user.email);
    }
  }
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async fillDateOfBirth(date?: { day: string; month: string; year: string }) {
    if (date) {
      await this.daySelect.selectOption(date.day);
      await this.monthSelect.selectOption(date.month);
      await this.yearSelect.selectOption(date.year);
    } else {
      return;
    }
  }
  async setNewsletter(enable: boolean) {
    if (enable) {
      await this.newsletterCheckbox.check();
    } else {
      await this.newsletterCheckbox.uncheck();
    }
  }
  async setSpecialOffers(enable: boolean) {
    if (enable) {
      await this.specialOffersCheckbox.check();
    } else {
      await this.specialOffersCheckbox.uncheck();
    }
  }
}
