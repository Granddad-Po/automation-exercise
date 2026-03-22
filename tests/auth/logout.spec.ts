import { test } from '../../fixtures/test';

test.describe('Logout', { tag: ['@smoke', '@logout'] }, () => {
  test('User can logout', async ({ app, homePage, managedUser }) => {
    await app.header.openSignupLoginPage();

    await app.login.expectSignupPageVisible();
    await app.login.loginAs(managedUser);

    await app.main.expectMainPageVisible();
    await app.header.expectLoggedInAs(managedUser.name);

    await app.header.expectLogoutButtonVisible();
    await app.header.clickLogoutButton();

    await app.main.expectMainPageVisible();
  });
});
