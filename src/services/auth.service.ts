import type { UserModel } from "@/types/user.model";
import { UserService } from "./user.service";

export class AuthService {

    public static saveAuth(model: UserModel) {
        console.log('Saving auth data:', model); 
        localStorage.setItem('auth', JSON.stringify(model));
    }

    public static getAuth(): UserModel {
        const ss = localStorage.getItem('auth');
        console.log('Auth data from localStorage:', ss); 
        if (!ss) throw new Error('NO_LOGIN_DATA');
        return JSON.parse(ss);
    }

    public static getAccessToken() {
        return this.getAuth().access;
    }

    public static getRefreshToken() {
        return this.getAuth().refresh;
    }

    public static getUsernameLog() {
        return this.getAuth().username;
    }

    public static hasAuth() {
        return !!localStorage.getItem('auth');
    }

    public static clearAuth() {
        localStorage.clear();
    }

    public static async getUserById(): Promise<UserModel> {
        const auth = this.getAuth();
        console.log('AUTH' , auth)
        const userId = auth.userId;
        if (!userId) {
            throw new Error('User ID is undefined');
        }
        try {
            return await UserService.getUserById(userId);
        } catch (error) {
            throw error;
        }
    }
}

