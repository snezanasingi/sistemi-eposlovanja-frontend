export interface UserModel {
    userId: number;
    username: string; 
    password: string; 
    email: string; 
    phone: any;
   // orders: string | null;
    access: string
    refresh: string

}

export interface User {
    userId: number;
    username: string;

}