import type { UserModel } from "@/types/user.model";
import { useAxios } from "./main.service";
import axios from "axios";

export class UserService {
    
    public static async getUserById(id: number): Promise<UserModel> {
        try {
            const response = await useAxios<UserModel>(`/user/${id}`);
            console.log('UserService response:', response.data); 
            return response.data; 
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error; 
        }
    }

    public static async updateUser(id: number, value: {
        username: string;
        password: string;
        email: string;
        phone: any;
    }): Promise<UserModel> {
        try {
            const response = await useAxios<UserModel>(`/user/${id}`, 'put' , value);
            return response.data;
        
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}


