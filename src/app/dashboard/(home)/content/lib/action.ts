import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { Category } from "@/model/Category";
import { Content } from "@/model/Content";

export interface ContentPayload {
    title: string;
    excerpt: string;
    description: string;
    tags: string;
    status: string;
    category_id: number | null;
    image: string;
}

export const getAdminContents = async (): Promise<Content[]> => {
    const res = await apiFetch<ApiResponse<Content[]>>("/admin/contents");
    return res.data;
};

export const createContent = async (contentData: ContentPayload) => {
    return apiFetch("/admin/contents", {
        method: "POST",
        body: JSON.stringify(contentData),
    });
};

export const updateContent = async (id: number, contentData: ContentPayload) => {
    return apiFetch(`/admin/contents/${id}`, {
        method: "PUT",
        body: JSON.stringify(contentData),
    });
};

export const deleteContent = async (id: number) => {
    return apiFetch(`/admin/contents/${id}`, {
        method: "DELETE",
    });
};

export const uploadImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await apiFetch<ApiResponse<{ url_image: string }>>(
        "/admin/contents/upload-image",
        {
            method: "POST",
            body: formData,
        }
    );

    return { url: res.data.url_image };
};

export const getAllCategories = async (): Promise<Category[]> => {
    const res = await apiFetch<ApiResponse<Category[]>>("/admin/categories");
    return res.data;
};
