import { test } from '../fixtures/app';

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app }) => {
    await test.step('Open signup page', async () => {
      await app.main.openMainPage();
      await app.main.checkSignupLoginLinkVisible();
      await app.main.clickSignupLoginLink();
    });
    await test.step('Fill and submit signup form', async () => {
      await app.login.checkLoginPageVisible();
      await app.login.fillNameSignup();
      await app.login.fillEmailSignup();
      await app.login.checkFilledSignupForm();
      await app.login.clickSignupButton();
    });
  });
});
