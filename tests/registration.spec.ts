import type { User } from './../types/user';
import { test } from '../fixtures/app';

const user: User = {
  name: 'Vito',
  email: 'vito@email.com',
  gender: 'Mr.',
  password: 'Qwerty123',
  dateOfBirth: { day: '15', month: 'July', year: '1990' },
  newsletter: true,
  specialOffers: false,
  firstName: 'Vittorio',
  lastName: 'Scaletta',
  company: 'Mafia II',
  address: 'New York, NY 10004',
  country: 'United States',
  state: 'New York',
  city: 'NYC',
  zipcode: '10004',
  mobileNumber: '+12123633200',
};

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app }) => {
    await test.step('Open signup page', async () => {
      await app.main.expectSignupLoginLinkVisible();
      await app.main.clickSignupLoginLink();
    });
    await test.step('Fill and submit signup form', async () => {
      await app.login.expectLoginPageVisible();
      await app.login.fillSignupForm(user);
      await app.login.clickSignupButton();
    });
    await test.step('Fill account info form', async () => {
      await app.signup.expectSignupPageVisible();
      await app.signup.fillAccountInfoForm(user);
    });
    await test.step('Fill and submit address info form', async () => {
      await app.signup.fillAddressInfoForm(user);
      await app.signup.clickCreateAccountButton();
    });
    await test.step('Check that account created successful', async () => {
      await app.signup.clickContinueButton();
      await app.signup.expectLoggedAsUsernameLinkVisible(user);
    });
    await test.step('Delete account', async () => {
      await app.signup.deleteAccount();
    });
  });
});
