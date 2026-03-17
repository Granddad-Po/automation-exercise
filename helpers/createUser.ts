import { expect, request } from '@playwright/test';
import { User } from '../types/user';

export async function createUser(user: User): Promise<User> {
  const api = await request.newContext({ baseURL: 'https://automationexercise.com' });

  const response = await api.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      title: user.gender ?? '',
      password: user.password,
      birth_date: user.dateOfBirth?.day ?? '',
      birth_month: user.dateOfBirth?.month ?? '',
      birth_year: user.dateOfBirth?.year ?? '',
      newsletter: user.newsletter ?? '',
      specialOffers: user.specialOffers ?? '',
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company ?? '',
      address1: user.address,
      country: user.country,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile_number: user.mobileNumber,
    },
  });

  expect(response.ok()).toBeTruthy();
  const jsonData = await response.json();
  expect(jsonData.responseCode).toBe(201);
  expect(jsonData.message).toHaveText('User created!');

  await api.dispose();

  return user;
}
