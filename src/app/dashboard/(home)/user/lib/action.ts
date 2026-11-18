"use server"

import { cookies } from "next/headers";
import { apiFetch, ApiError } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { User, UpdatePasswordRequest } from "@/model/User";

export interface ActionResult<T = unknown> {
    ok: boolean;
    data?: T;
    message?: string;
}

const getAuthCookieHeader = async (): Promise<string> => {
    const sessionCookie = (await cookies()).get("X-API-TOKEN")?.value;
    if (!sessionCookie) {
        throw new Error("Unauthorized: Session cookie not found.");
    }
    return `X-API-TOKEN=${sessionCookie}`;
};

export const getUserProfile = async (): Promise<User> => {
    const cookieHeader = await getAuthCookieHeader();
    const res = await apiFetch<ApiResponse<User>>("/admin/users/profile", {
        cookieHeader,
        cache: "no-store",
    });
    return res.data;
};

export const updatePassword = async (payload: UpdatePasswordRequest): Promise<ActionResult> => {
    try {
        const cookieHeader = await getAuthCookieHeader();
        const data = await apiFetch("/admin/users/update-password", {
            method: "PUT",
            cookieHeader,
            body: JSON.stringify(payload),
        });
        return { ok: true, data };
    } catch (err: unknown) {
        if (err instanceof ApiError) {
            return { ok: false, message: err.message };
        }
        return {
            ok: false,
            message: err instanceof Error ? err.message : "Something went wrong",
        };
    }
};
