import { test as base } from '@playwright/test';
import type { User } from '../types/user';
import { Contact } from '../types/contact';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { userFactory } from '../test-data/userFactory';
import { contactFactory } from '../test-data/contactFactory';
import { createUser, deleteUser } from '../helpers/api/users';
import { Header } from '../components/Header';
import { ContacUsPage } from '../pages/ContactUsPage';
import { ProductsPage } from '../pages/ProductsPage';

type App = {
  header: Header;
  main: MainPage;
  login: LoginPage;
  signup: SignupPage;
  product: ProductsPage;
  contact: ContacUsPage;
};

type Fixtures = {
  app: App;
  homePage: MainPage;
  header: Header;
  userData: User;
  contactData: Contact;
  existingUser: User;
  managedUser: User;
  loggedInUser: User;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use({
      header: new Header(page),
      main: new MainPage(page),
      login: new LoginPage(page),
      signup: new SignupPage(page),
      product: new ProductsPage(page),
      contact: new ContacUsPage(page),
    });
  },

  homePage: async ({ app }, use) => {
    await app.main.openMainPage();
    await use(app.main);
  },

  userData: async ({}, use) => {
    await use(userFactory());
  },

  contactData: async ({}, use) => {
    await use(contactFactory());
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
    await app.header.openSignupLoginPage();
    await app.login.loginAs(managedUser);
    await use(managedUser);
  },
});

export { expect } from '@playwright/test';
