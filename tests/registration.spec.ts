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
};

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app }) => {
    await test.step('Open signup page', async () => {
      await app.main.openMainPage();
      await app.main.checkSignupLoginLinkVisible();
      await app.main.clickSignupLoginLink();
    });
    await test.step('Fill and submit signup form', async () => {
      await app.login.checkLoginPageVisible();
      await app.login.fillNameSignup(user.name);
      await app.login.fillEmailSignup(user.email);
      await app.login.checkFilledSignupForm(user);
      await app.login.clickSignupButton();
    });
    await test.step('Fill account info form and create account', async () => {
      await app.signup.expectSignupPageVisible();
      await app.signup.selectGender(user.gender);
      await app.signup.ensureNameAndEmailFilled(user);
      await app.signup.fillPassword(user.password);
      await app.signup.fillDateOfBirth(user.dateOfBirth);
      await app.signup.setNewsletter(true);
    });
  });
});
