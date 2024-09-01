import { ref } from "vue";
import type { PerfumeModel } from "./perfume.model";

export interface CartModel {
    orderId: number
    perfumeId: number[];  
    totalPrice: number;  
    userId: number;  
  }  
  const perfumes = ref<PerfumeModel[]>(JSON.parse(sessionStorage.getItem("perfumes") || "[]"));

