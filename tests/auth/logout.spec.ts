import { test } from '../../fixtures/test';

test('User can logout', async ({ app, homePage, managedUser }) => {
  await app.main.openSignupLoginPage();

  await app.login.expectSignupPageVisible();
  await app.login.loginAs(managedUser);

  await app.main.expectMainPageVisible();
  await app.header.expectLoggedInAs(managedUser.name);

  await app.header.expectLogoutButtonVisible();
  await app.header.clickLogoutButton();

  await app.main.expectMainPageVisible();
});
