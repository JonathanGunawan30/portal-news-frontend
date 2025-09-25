import axiosInstance from "@lib/axios";

export const createCategory = async (categoryData: any) => {
    try {
        const res = await axiosInstance.post("/admin/categories", categoryData, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updateCategory = async (id: number, categoryData: any) => {
    try {
        const res = await axiosInstance.put(`/admin/categories/${id}`, categoryData, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const deleteCategory = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/admin/categories/${id}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};