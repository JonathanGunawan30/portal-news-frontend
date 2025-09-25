"use server"

import axiosInstance from "@lib/axios";
import { cookies } from "next/headers";
import { User, UpdatePasswordRequest } from "@/model/User";

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
    try {
        const res = await axiosInstance.get("/admin/users/profile", await getAuthHeaders());
        return res.data.data;
    } catch (err: any) {
        throw err;
    }
};
export const updatePassword = async (payload: UpdatePasswordRequest) => {
    try {
        const res = await axiosInstance.put("/admin/users/update-password", payload, await getAuthHeaders());
        return res.data;
    } catch (err) {
        throw err;
    }
};
