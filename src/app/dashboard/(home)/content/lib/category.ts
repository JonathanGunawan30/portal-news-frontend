"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { Category } from "@/model/Category";

export const getAllCategories = async (): Promise<Category[]> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("X-API-TOKEN")?.value ?? "";
    const cookieHeader = `X-API-TOKEN=${token}`;

    const res = await apiFetch<ApiResponse<Category[]>>("/admin/categories", {
        cookieHeader,
        cache: "no-store",
    });

    return res.data;
};
