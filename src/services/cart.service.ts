import axios from "axios";
import { useAxios } from "./main.service";
import type { CartModel} from "@/types/cart.model";

export class CartService {

    static async createCart(data: CartModel): Promise<CartModel> { 
        const response = await useAxios<CartModel>(`/cart`, 'post', data);
        return response.data;
     }
    
}