import { expect, Locator, Page } from '@playwright/test';
import type { User } from '../types/user';

export class SignupPage {
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
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedText: Locator;
  readonly continueLink: Locator;

  constructor(private page: Page) {
    this.accountInfoText = this.page.getByText('Enter Account Information');
    this.mrRadio = this.page.getByRole('radio', { name: 'Mr.' });
    this.mrsRadio = this.page.getByRole('radio', { name: 'Mrs.' });
    this.nameInput = this.page.getByRole('textbox', { name: 'Name *', exact: true });
    this.emailInput = this.page.getByRole('textbox', { name: 'Email *', exact: true });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    this.daySelect = this.page.locator('#days');
    this.monthSelect = this.page.locator('#months');
    this.yearSelect = this.page.locator('#years');
    this.newsletterCheckbox = this.page.getByRole('checkbox', {
      name: 'newsletter!',
    });
    this.specialOffersCheckbox = this.page.getByRole('checkbox', {
      name: 'special offers',
    });

    this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = this.page.getByRole('textbox', { name: 'Address *' });
    this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
    this.countrySelect = this.page.getByLabel('Country *');
    this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
    this.cityInput = this.page.getByRole('textbox', { name: 'City *' });
    this.zipcodeInput = this.page.locator('#zipcode');
    this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedText = this.page.getByRole('heading', { name: 'Account Created!' });
    this.continueLink = this.page.getByRole('link', { name: 'Continue' });
  }

  async expectAccountInfoPageVisible() {
    await expect(this.accountInfoText).toBeVisible();
  }
  async selectGender(gender?: 'Mr.' | 'Mrs.') {
    if (gender === 'Mr.') {
      await this.mrRadio.check();
    } else {
      await this.mrsRadio.check();
    }
  }
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
  async fillAccountInfoForm(user: User) {
    if (user.gender) {
      await this.selectGender(user.gender);
    }
    await this.ensureNameAndEmailFilled(user);
    await this.fillPassword(user.password);
    if (user.dateOfBirth) {
      await this.fillDateOfBirth(user.dateOfBirth);
    }
    if (user.newsletter) {
      await this.setNewsletter(user.newsletter);
    }
    if (user.specialOffers) {
      await this.setSpecialOffers(user.specialOffers);
    }
  }

  async fillFirstName(name: string) {
    await this.firstNameInput.fill(name);
  }
  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }
  async fillCompany(company: string) {
    await this.companyInput.fill(company);
  }
  async fillAddress(address: string) {
    await this.addressInput.fill(address);
  }
  async fillAddress2(address2: string) {
    await this.address2Input.fill(address2);
  }
  async selectCountry(country: string) {
    await this.countrySelect.selectOption(country);
  }
  async fillState(state: string) {
    await this.stateInput.fill(state);
  }
  async fillCity(city: string) {
    await this.cityInput.fill(city);
  }
  async fillZipcode(zipcode: string) {
    await this.zipcodeInput.fill(zipcode);
  }
  async fillMobileNumber(mobile: string) {
    await this.mobileNumberInput.fill(mobile);
  }
  async clickCreateAccount() {
    this.createAccountButton.click();
  }
  async fillAddressInfoForm(user: User) {
    await this.fillFirstName(user.name);
    await this.fillLastName(user.lastName);
    if (user.company) {
      await this.fillCompany(user.company);
    }
    await this.fillAddress(user.address);
    if (user.address2) {
      await this.fillAddress2(user.address2);
    }
    await this.selectCountry(user.country);
    await this.fillState(user.state);
    await this.fillCity(user.city);
    await this.fillZipcode(user.zipcode);
    await this.fillMobileNumber(user.mobileNumber);
  }

  async completeRegistration(user: User) {
    await this.fillAccountInfoForm(user);
    await this.fillAddressInfoForm(user);
    await this.clickCreateAccount();
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedText).toBeVisible();
  }
  async clickContinue() {
    await this.continueLink.click();
  }
}
