import { test as base } from '@playwright/test';
import type { User } from '../types/user';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { userFactory } from '../test-data/userFactory';
import { createUser, deleteUser } from '../helpers/api/users';

type App = {
  main: MainPage;
  login: LoginPage;
  signup: SignupPage;
};

type Fixtures = {
  app: App;
  homePage: MainPage;
  userData: User;
  registeredUser: User;
  loggedInUser: User;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use({
      main: new MainPage(page),
      login: new LoginPage(page),
      signup: new SignupPage(page),
    });
  },

  homePage: async ({ app }, use) => {
    await app.main.openMainPage();
    await use(app.main);
  },

  userData: async ({}, use) => {
    await use(userFactory());
  },

  registeredUser: async ({ userData }, use) => {
    await createUser(userData);
    try {
      await use(userData);
    } finally {
      await deleteUser(userData);
    }
  },

  loggedInUser: async ({ app, homePage, registeredUser }, use) => {
    await app.main.openSignupLoginPage();
    await app.login.loginAs(registeredUser);
    await use(registeredUser);
  },
});

export { expect } from '@playwright/test';
