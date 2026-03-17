import { test as base } from '@playwright/test';
import type { User } from '../types/user';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { userFactory } from '../test-data/userFactory';
import { createUser, deleteUser } from '../helpers/api/users';
import { Header } from '../components/Header';

type App = {
  main: MainPage;
  login: LoginPage;
  signup: SignupPage;
  header: Header;
};

type Fixtures = {
  app: App;
  homePage: MainPage;
  header: Header;
  userData: User;
  existingUser: User;
  managedUser: User;
  loggedInUser: User;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use({
      main: new MainPage(page),
      login: new LoginPage(page),
      signup: new SignupPage(page),
      header: new Header(page),
    });
  },

  homePage: async ({ app }, use) => {
    await app.main.openMainPage();
    await use(app.main);
  },

  userData: async ({}, use) => {
    await use(userFactory());
  },

  existingUser: async ({ userData }, use) => {
    await createUser(userData);
    await use(userData);
  },

  managedUser: async ({ existingUser }, use) => {
    try {
      await use(existingUser);
    } finally {
      await deleteUser(existingUser);
    }
  },

  loggedInUser: async ({ app, homePage, managedUser }, use) => {
    await app.main.openSignupLoginPage();
    await app.login.loginAs(managedUser);
    await use(managedUser);
  },
});

export { expect } from '@playwright/test';
