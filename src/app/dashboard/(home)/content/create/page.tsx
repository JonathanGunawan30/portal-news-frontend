"use client"

import {useEffect, useState} from "react";
import {Category} from "@/model/Category";
import axiosInstance from "@lib/axios";
import {ApiResponse} from "@/model/ApiResponse";
import FormContentPage from "@/app/dashboard/(home)/content/components/form-content";
import {toast} from "sonner";

const CreateContentPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories", {
                    withCredentials: true,
                })
                setCategories(res.data.data)
            } catch (err){
                toast.error("Failed to fetch categories")
            }
        }

        fetchCategories();
    }, []);

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Add Content</div>
            </div>
            <FormContentPage type="ADD" categoryList={categories} />
        </div>
    )
}

export default CreateContentPage