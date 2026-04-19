import { createServerAxiosInstance } from "@lib/axios";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";
import axios from "axios";

export const getContentById = async (id: number): Promise<Content> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("X-API-TOKEN")?.value ?? "";
    const cookieHeader = `X-API-TOKEN=${token}`;

    if (!token) {
        throw new Error("Unauthorized: No session cookie found");
    }

    try {
        const serverAxios = createServerAxiosInstance(cookieHeader);
        const res = await serverAxios.get(`/admin/contents/${id}`);
        return res.data.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                throw new Error("Unauthorized");
            }
            console.error("API Error:", err.response?.data);
        }
        throw err;
    }
};