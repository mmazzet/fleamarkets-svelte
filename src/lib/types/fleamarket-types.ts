export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Country {
  countryname: string;
  _id: string;
}

export interface Fleamarket {
  marketname: string;
  category: string;
  country: Country | string;
  donor: User | string;
  lat: number;
  lng: number;
}
