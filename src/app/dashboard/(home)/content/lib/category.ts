"use server";

import { cookies } from "next/headers";
import axiosInstance from "../../../../../../lib/axios";
import { Category } from "@/model/Category";

export const getAllCategories = async (): Promise<Category[]> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("X-API-TOKEN")?.value ?? "";
    const cookieHeader = `X-API-TOKEN=${token}`;

    const res = await axiosInstance.get("/admin/categories", {
        headers: { Cookie: cookieHeader },
    });

    return res.data.data;
};