import { Contact } from './../types/contact';
import { faker } from '@faker-js/faker';

export function contactFactory(): Contact {
  const id = Date.now();

  return {
    name: faker.person.firstName(),
    email: `user${id}@email.com`,
    subject: faker.lorem.words(2),
    message: faker.lorem.paragraph(4),
  };
}
