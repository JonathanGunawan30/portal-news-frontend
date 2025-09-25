"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axiosInstance from "@lib/axios"
import { Category } from "@/model/Category"
import FormCategoryPage from "@/app/dashboard/(home)/category/components/form-category"
import { toast } from "sonner"

export default function EditCategoryPage() {
    const params = useParams()
    const router = useRouter()
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance.get(`/admin/categories/${params.id}`, {
                    withCredentials: true,
                })
                setCategory(res.data.data)
            } catch (err: any) {
                setError(err.response?.data?.message || "Error fetching category")
                toast.error("Failed to fetch category")
            } finally {
                setLoading(false)
            }
        }

        if (params.id) fetchCategory()
    }, [params.id])

    if (loading) {
        return <div className="p-10 text-center text-muted-foreground">Loading…</div>
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-500">
                {error}
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
