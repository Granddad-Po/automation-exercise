import { test as base } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

// Declare the types of your fixtures.
type App = {
  main: MainPage;
  login: LoginPage;
  signup: SignupPage;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    // Set up the fixture.
    const app = {
      main: new MainPage(page),
      login: new LoginPage(page),
      signup: new SignupPage(page),
    };

    // Use the fixture value in the test.
    await use(app);
  },
});
export { expect } from '@playwright/test';
