export interface User {
  token: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  adresse: string;
  city: string;
  zipcode: number;
  country: string;
  birthdate: string;
  role: string;
}
export interface RegisterFormValues {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  adresse: string;
  city: string;
  zipcode: string;
  country: string;
  birthdate: string;
  created: Date;
}
export interface LoginFormValues {
  username: string;
  password: string;
}
