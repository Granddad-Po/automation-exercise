import { test } from '../../fixtures/test';

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app, userData }) => {
    await test.step('Open signup page', async () => {
      await app.main.openMainPage();
      await app.main.openSignupLoginPage();
    });
    await test.step('Fill and submit signup form', async () => {
      await app.login.expectSignupPageVisible();
      await app.login.signupAs(userData);
    });
    await test.step('Fill account info and address form', async () => {
      await app.signup.expectAccountInfoPageVisible();
      await app.signup.completeRegistration(userData);
    });
    await test.step('Check that account created successful', async () => {
      await app.signup.expectAccountCreated();
      await app.signup.clickContinue();
      await app.signup.expectLoggedInAs(userData.name);
    });
    await test.step('Delete account', async () => {
      await app.signup.deleteAccount();
    });
  });
});
