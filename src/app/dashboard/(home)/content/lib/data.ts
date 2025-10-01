import axiosInstance from "../../../../../lib/axios";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";

/**
 * GET content by id (For SERVER-SIDE fetching)
 */
export const getContentById = async (id: number): Promise<Content> => {
    const cookieStore = cookies();
    const token = cookieStore.get('X-API-TOKEN')?.value;

    if (!token) {
        throw new Error("Unauthorized: No session cookie found");
    }

    try {
        const res = await axiosInstance.get(`/admin/contents/${id}`, {
            headers: {
                'Cookie': `X-API-TOKEN=${token}`
            }
        });
        return res.data.data;
    } catch (err) {
        throw err;
    }
};