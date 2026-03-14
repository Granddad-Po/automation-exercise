export type User = {
  name: string;
  email: string;
  gender: 'Mr.' | 'Mrs.' | undefined;
  password: string;
  dateOfBirth: { day: string; month: string; year: string };
  newsletter: boolean;
  specialOffers: boolean;
};
