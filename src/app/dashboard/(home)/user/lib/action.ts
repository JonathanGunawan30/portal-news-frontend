"use server"

import axios from "axios";
import axiosInstance from "@lib/axios";
import { cookies } from "next/headers";
import { User, UpdatePasswordRequest } from "@/model/User";

export interface ActionResult<T = unknown> {
    ok: boolean;
    data?: T;
    message?: string;
}

const getAuthHeaders = async () => {
    const sessionCookie = (await cookies()).get("X-API-TOKEN")?.value;
    if (!sessionCookie) {
        throw new Error("Unauthorized: Session cookie not found.");
    }
    return {
        headers: {
            Cookie: `X-API-TOKEN=${sessionCookie}`,
        },
    };
};

export const getUserProfile = async (): Promise<User> => {
    const res = await axiosInstance.get("/admin/users/profile", await getAuthHeaders());
    return res.data.data;
};

export const updatePassword = async (payload: UpdatePasswordRequest): Promise<ActionResult> => {
    try {
        const res = await axiosInstance.put("/admin/users/update-password", payload, await getAuthHeaders());
        return { ok: true, data: res.data };
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data as { message?: string; meta?: { message?: string } } | undefined;
            const message = data?.meta?.message || data?.message || "Failed to update password.";
            return { ok: false, message };
        }
        return {
            ok: false,
            message: err instanceof Error ? err.message : "Something went wrong",
        };
    }
};
