import { test } from '../fixtures/app';

test.describe('Registration tests', { tag: '@smoke' }, () => {
  test('User can register', async ({ app }) => {
    await test.step('Go to Login page', async () => {
      await app.main.openMainPage();
      await app.main.checkSignupLoginLinkVisability();
      await app.main.clickSignupLoginLink();
    });

    await test.step('Enter Signup form', async () => {
      await app.login.checkLoginPageVisible();
      await app.login.fillNameSignup();
      await app.login.fillEmailSignup();
      await app.login.checkFilledSignupForm();
      await app.login.clickSignupButton();
    });
  });
});
