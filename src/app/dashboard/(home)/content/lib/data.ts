import axiosInstance from "../../../../../../lib/axios";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";
import axios from "axios";

/**
 * GET content by id (For SERVER-SIDE fetching)
 */
export const getContentById = async (id: number): Promise<Content> => {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
        throw new Error("Unauthorized: No session cookie found");
    }

    try {
        const res = await axiosInstance.get(`/admin/contents/${id}`, {
            headers: { Cookie: cookieHeader },
            withCredentials: true,
        });
        return res.data.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                throw new Error("Unauthorized");
            }
        }
        throw err;
    }
};
