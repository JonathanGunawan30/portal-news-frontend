"use server";

import { cookies } from "next/headers";
import axiosInstance from "../../../../../../lib/axios";
import { Category } from "@/model/Category";

export const getAllCategories = async (): Promise<Category[]> => {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    const res = await axiosInstance.get("/admin/categories", {
        headers: { Cookie: cookieHeader },
    });

    return res.data.data;
};
