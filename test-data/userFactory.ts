import { User } from './../types/user';

export function userFactory(overrides: Partial<User> = {}): User {
  const id = Date.now();

  return {
    name: `User${id}`,
    email: `user${id}@email.com`,
    gender: 'Mr.',
    password: 'Qwerty123',
    dateOfBirth: { day: '15', month: 'July', year: '1990' },
    newsletter: true,
    specialOffers: false,
    firstName: `Name${id}`,
    lastName: `LastName${id}`,
    company: 'User Factory',
    address: `New York, NY ${id}`,
    country: 'United States',
    state: 'New York',
    city: 'NYC',
    zipcode: '10004',
    mobileNumber: '+12123633200',
    ...overrides,
  };
}
