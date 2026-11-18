"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import FormCategoryPage from "@/app/dashboard/(home)/category/components/form-category"
import { toast } from "sonner"
import { getAdminCategoryById } from "@/app/dashboard/(home)/category/lib/action"

export default function EditCategoryPage() {
    const params = useParams()
    const categoryId = String(params.id ?? "")

    const { data: category, isLoading, error } = useQuery({
        queryKey: ["admin", "categories", categoryId],
        queryFn: () => getAdminCategoryById(categoryId),
        enabled: Boolean(categoryId),
    })

    useEffect(() => {
        if (error) {
            toast.error("Failed to fetch category")
        }
    }, [error])

    if (isLoading) {
        return <div className="p-10 text-center text-muted-foreground">Loading…</div>
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-500">
                {error instanceof Error ? error.message : "Error fetching category"}
            </div>
        )
    }

    if (!category) {
        return (
            <div className="p-10 text-center text-muted-foreground">
                Category not found
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Edit Category</div>
            </div>

            <FormCategoryPage type="EDIT" defaultValue={category} />
        </div>
    )
}
