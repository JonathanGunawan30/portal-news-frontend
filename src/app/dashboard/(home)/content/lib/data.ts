import { cookies } from "next/headers";
import { apiFetch, ApiError } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { Content } from "@/model/Content";

export const getContentById = async (id: number): Promise<Content> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("X-API-TOKEN")?.value ?? "";

    if (!token) {
        throw new Error("Unauthorized: No session cookie found");
    }

    try {
        const res = await apiFetch<ApiResponse<Content>>(`/admin/contents/${id}`, {
            cookieHeader: `X-API-TOKEN=${token}`,
            cache: "no-store",
        });
        return res.data;
    } catch (err: unknown) {
        if (err instanceof ApiError) {
            if (err.status === 401) {
                throw new Error("Unauthorized");
            }
            console.error("API Error:", err.data);
        }
        throw err;
    }
};
