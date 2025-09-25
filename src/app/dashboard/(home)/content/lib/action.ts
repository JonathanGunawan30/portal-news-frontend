"use server"

import axiosInstance from "@lib/axios";
import { Category } from "@/model/Category";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";

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

export const createContent = async (contentData: any) => {
    try {
        const res = await axiosInstance.post("/admin/contents", contentData, await getAuthHeaders());
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updateContent = async (id: number, contentData: any) => {
    try {
        const res = await axiosInstance.put(`/admin/contents/${id}`, contentData, await getAuthHeaders());
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const deleteContent = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/admin/contents/${id}`, await getAuthHeaders());
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const uploadImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    try {
        const sessionCookie = (await cookies()).get("X-API-TOKEN")?.value;
        if (!sessionCookie) {
            throw new Error("Unauthorized");
        }

        const res = await axiosInstance.post("/admin/contents/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Cookie: `X-API-TOKEN=${sessionCookie}`,
            },
        });
        return { url: res.data.data.url_image };
    } catch (err) {
        throw err;
    }
};

export const getContentById = async (id: number): Promise<Content> => {
    try {
        const res = await axiosInstance.get(`/admin/contents/${id}`, await getAuthHeaders());
        return res.data.data;
    } catch (err) {
        throw err;
    }
};

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const res = await axiosInstance.get("/admin/categories", await getAuthHeaders());
        return res.data.data;
    } catch (err) {
        throw err;
    }
};