export interface User {
    userId: number;
    token: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    adresse: string;
    city: string;
    zipcode: string;
    country: string;
    birthdate: string;
    accountType: string;


}

export interface UserFormValues {
    username: string;
    password: string;


}