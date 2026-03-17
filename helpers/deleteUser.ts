import { expect, request } from '@playwright/test';
import { User } from '../types/user';

export async function createUser(user: User): Promise<void> {
  const api = await request.newContext({ baseURL: 'https://automationexercise.com' });

  const response = await api.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  expect(response.ok()).toBeTruthy();
  const jsonData = await response.json();
  expect(jsonData.responseCode).toBe(200);
  expect(jsonData.message).toHaveText('Account deleted!');

  await api.dispose();
}
