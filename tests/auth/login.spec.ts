import { expect, test } from '../../fixtures/test';

test.describe('Login', { tag: ['@smoke', '@login'] }, () => {
  test('User can login with correct email and password', async ({
    app,
    homePage,
    registeredUser,
  }) => {
    await app.main.openSignupLoginPage();

    await app.login.expectSignupPageVisible();
    await app.login.loginAs(registeredUser);

    await app.main.expectMainPageVisible();
  });
});
