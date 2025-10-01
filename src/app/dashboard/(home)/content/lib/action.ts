import axiosInstance from "@lib/axios";
import { Category } from "@/model/Category";
import { Content } from "@/model/Content";
import { cookies } from "next/headers";

/**
 * CREATE content
 */
export const createContent = async (contentData: any) => {
    try {
        const res = await axiosInstance.post("/admin/contents", contentData, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * UPDATE content
 */
export const updateContent = async (id: number, contentData: any) => {
    try {
        const res = await axiosInstance.put(`/admin/contents/${id}`, contentData, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * DELETE content
 */
export const deleteContent = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/admin/contents/${id}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * UPLOAD image
 */
export const uploadImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await axiosInstance.post("/admin/contents/upload-image", formData, {
            withCredentials: true,
        });

        return { url: res.data.data.url_image };
    } catch (err) {
        console.error("Upload error:", err);
        throw err;
    }
};


/**
 * GET content by id
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
        console.error("Server-side fetch error:", err);
        throw err;
    }
};

/**
 * GET all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const res = await axiosInstance.get("/admin/categories", {
            withCredentials: true,
        });
        return res.data.data;
    } catch (err) {
        throw err;
    }
};
