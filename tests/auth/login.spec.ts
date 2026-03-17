import { test } from '../../fixtures/test';

test.describe('Login', { tag: ['@smoke', '@login'] }, () => {
  test('User can login with correct email and password', async ({
    app,
    homePage,
    existingUser,
  }) => {
    await app.main.openSignupLoginPage();

    await app.login.expectSignupPageVisible();
    await app.login.loginAs(existingUser);

    await app.main.expectMainPageVisible();
    await app.header.expectLoggedInAs(existingUser.name);

    await app.header.deleteAccount();
  });
});
