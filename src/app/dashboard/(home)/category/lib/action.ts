import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { Category } from "@/model/Category";

export interface CategoryPayload {
    title: string;
}

export const getAdminCategories = async (): Promise<Category[]> => {
    const res = await apiFetch<ApiResponse<Category[]>>("/admin/categories");
    return res.data;
};

export const getAdminCategoryById = async (id: string | number): Promise<Category> => {
    const res = await apiFetch<ApiResponse<Category>>(`/admin/categories/${id}`);
    return res.data;
};

export const createCategory = async (categoryData: CategoryPayload) => {
    return apiFetch("/admin/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
    });
};

export const updateCategory = async (id: number, categoryData: CategoryPayload) => {
    return apiFetch(`/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(categoryData),
    });
};

export const deleteCategory = async (id: number) => {
    return apiFetch(`/admin/categories/${id}`, {
        method: "DELETE",
    });
};
