import axios from "axios";
import { useAxios } from "./main.service";
import type { PerfumeModel } from "@/types/perfume.model";

export class PerfumeService {
    static async getAllPerfumes(): Promise<PerfumeModel[]> {
        const response = await useAxios<PerfumeModel[]>('/perfume');
        return response.data; 
    }

    static async getPerfumeById(id: number): Promise<PerfumeModel> {
        const response = await useAxios<PerfumeModel>(`/perfume/${id}`);
        return response.data; 
    }
}