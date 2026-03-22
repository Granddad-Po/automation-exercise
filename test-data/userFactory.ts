import { COUNTRIES, User } from './../types/user';
import { faker } from '@faker-js/faker';

export function userFactory(overrides: Partial<User> = {}): User {
  const id = Date.now();
  const birthDate = faker.date.birthdate();

  return {
    name: faker.person.firstName(),
    email: `user${id}@email.com`,
    gender: faker.helpers.arrayElement(['Mr.', 'Mrs.']),
    password: 'Qwerty123',
    dateOfBirth: {
      day: String(birthDate.getDate()),
      month: birthDate.toLocaleString('en-US', { month: 'long' }),
      year: String(birthDate.getFullYear()),
    },
    newsletter: faker.datatype.boolean(),
    specialOffers: faker.datatype.boolean(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    country: faker.helpers.arrayElement(COUNTRIES),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
    ...overrides,
  };
}
