// main.service.ts
import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

const client = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status) => {
        return status.toString().startsWith('2');
    }
});

export async function login(username: string, password: string) {
    return await client.request({
        url: '/user/login',
        method: 'post',
        data: { username, password }  
    });
}

export async function useAxios<T>(path: string, method: 'get' | 'put' | 'post' = 'get', payload: {} = {}): Promise<AxiosResponse<T>> {
    let rsp: AxiosResponse<T>;
    try {
        rsp = await client.request<T>({
            url: path,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${AuthService.getAccessToken()}`
            },
            data: payload
        });
        console.log('RSPPP', rsp);
    } catch (e) {
        rsp = (e as AxiosError).response as AxiosResponse<T>;
    }

    if (rsp === undefined || rsp.status === 401) {
        window.location.href = "/login";
        return Promise.reject(new Error('Unauthorized'));
    }

    if (rsp.status === 403) {
        try {
            const token = await client.request({
                url: '/user/refresh', 
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getRefreshToken()}`
                }
            });

            AuthService.saveAuth(token.data);
            
            return await client.request<T>({
                url: path,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`
                },
                data: payload
            });
        } catch (e) {
            AuthService.clearAuth();
            window.location.href = "/user"; 
            throw new Error('REFRESH_FAILED');
        }
    }

    // if (rsp.status === 200) {
    //     AuthService.saveAuth(token.data);
    // }

    if (rsp.status === 404) {
        throw new Error('Not found');
    }

    return rsp;
}
