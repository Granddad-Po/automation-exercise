import { expect } from '@playwright/test';
import { User } from '../../types/user';
import { withApiClient } from './client';

type ApiResponse = {
  responseCode: number;
  message: string;
};

export async function createUser(user: User): Promise<User> {
  return await withApiClient(async (api) => {
    const response = await api.post('/api/createAccount', { form: buildCreateUserForm(user) });

    expect(response.ok()).toBeTruthy();
    const jsonData = (await response.json()) as ApiResponse;
    expect(jsonData.responseCode).toBe(201);
    expect(jsonData.message).toBe('User created!');

    return user;
  });
}

export async function deleteUser(user: Pick<User, 'email' | 'password'>): Promise<void> {
  return await withApiClient(async (api) => {
    const response = await api.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response.ok()).toBeTruthy();
    const jsonData = (await response.json()) as ApiResponse;
    expect(jsonData.responseCode).toBe(200);
    expect(jsonData.message).toBe('Account deleted!');
  });
}

function buildCreateUserForm(user: User) {
  return {
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
  };
}
