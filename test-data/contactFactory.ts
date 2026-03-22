import { Contact } from './../types/contact';

export function contactFactory(): Contact {
  const id = Date.now();

  return {
    name: `User${id}`,
    email: `user${id}@email.com`,
    subject: 'Very important Title',
    message: 'sdfsafasfdwsfsd sdfsdfwef dsfsdfwef ehdfgsdfwefsdfsdfw',
  };
}
