const COUNTRIES = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
] as const;
type Country = (typeof COUNTRIES)[number];

export type User = {
  name: string;
  email: string;
  gender?: 'Mr.' | 'Mrs.';
  password: string;
  dateOfBirth?: { day: string; month: string; year: string };
  newsletter?: boolean;
  specialOffers?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: Country;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};
