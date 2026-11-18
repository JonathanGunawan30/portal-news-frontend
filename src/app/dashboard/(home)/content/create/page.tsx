"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import FormContentPage from "@/app/dashboard/(home)/content/components/form-content";
import { getAllCategories } from "@/app/dashboard/(home)/content/lib/action";
import { toast } from "sonner";

const CreateContentPage = () => {
    const { data: categories = [], isError } = useQuery({
        queryKey: ["admin", "categories"],
        queryFn: getAllCategories,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch categories");
        }
    }, [isError]);

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Add Content</div>
            </div>
            <FormContentPage type="ADD" categoryList={categories} />
        </div>
    );
};

export default CreateContentPage;
