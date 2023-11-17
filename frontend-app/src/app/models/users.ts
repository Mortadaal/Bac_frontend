export interface User{
    userId:number;
    username:string; 
    password: string;
    firstname:string;
    lastname:string;
    adresse:string;
    city:string;
    zipcode:string;
    country:string;
    birthdate:string;
    accountType: string; 
    token: string;

}

export interface UserFormValues{
    username:string; 
    password: string;


}