import { test } from '../../fixtures/test';

test.describe('Registration', { tag: ['@smoke', '@register'] }, () => {
  test('User can register with valid data', async ({ app, homePage, userData }) => {
    await test.step('Register new user', async () => {
      await app.main.openSignupLoginPage();

      await app.login.expectSignupPageVisible();
      await app.login.signupAs(userData);

      await app.signup.expectAccountInfoPageVisible();
      await app.signup.completeRegistration(userData);
    });

    await test.step('Verify account created and logged in', async () => {
      await app.signup.expectAccountCreated();
      await app.signup.clickContinueButton();
      await app.header.expectLoggedInAs(userData.name);
    });

    await test.step('Delete account', async () => {
      await app.header.deleteAccount();
    });
  });
  //TODO: Нужны ли проверки отображения страницы после перехода на нее?
  test("User can't register with existing email", async ({ app, homePage, managedUser }) => {
    await app.main.openSignupLoginPage();
    await app.login.expectSignupPageVisible();
    await app.login.signupAs(managedUser);

    await app.login.expectEmailAlreadyExistErrorVisible();
  });
});
