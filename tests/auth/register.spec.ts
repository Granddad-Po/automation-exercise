import { test } from '../../fixtures/app';
import { userFactory } from '../../test-data/userFactory';

const user = userFactory();

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app }) => {
    await test.step('Open signup page', async () => {
      await app.main.openMainPage();
      await app.main.openSignupLoginPage();
    });
    await test.step('Fill and submit signup form', async () => {
      await app.login.expectSignupPageVisible();
      await app.login.signupAs(user);
    });
    await test.step('Fill account info and address form', async () => {
      await app.signup.expectAccountInfoPageVisible();
      await app.signup.completeRegistration(user);
    });
    await test.step('Check that account created successful', async () => {
      await app.signup.expectAccountCreated();
      await app.signup.clickContinue();
      await app.signup.expectLoggedInAs(user.name);
    });
    await test.step('Delete account', async () => {
      await app.signup.deleteAccount();
    });
  });
});
