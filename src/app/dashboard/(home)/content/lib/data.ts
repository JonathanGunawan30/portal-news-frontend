import { createServerAxiosInstance } from "@lib/axios";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";
import axios from "axios";

export const getContentById = async (id: number): Promise<Content> => {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    console.log("=== DEBUG GET CONTENT BY ID ===");
    console.log("Content ID:", id);
    console.log("Cookie Header:", cookieHeader ? "EXISTS" : "MISSING");
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("Full URL:", `${process.env.NEXT_PUBLIC_API_URL}/admin/contents/${id}`);


    if (!cookieHeader) {
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