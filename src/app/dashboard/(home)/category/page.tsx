"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import axiosInstance from "@lib/axios"
import { toast } from "sonner"
import {Category} from "@/model/Category";
import {columns} from "@/app/dashboard/(home)/category/components/columns-table";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get("/admin/categories", {
                    withCredentials: true,
                })
                setCategories(res.data.data)
            } catch (err: any) {
                if (err.response?.status === 401) {
                    toast.error("Unauthorized, please login again")
                } else {
                    toast.error("Failed to fetch categories")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Categories</div>
                <Button asChild>
                    <Link href="/dashboard/category/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Category
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="p-10 text-center text-muted-foreground">Loading…</div>
            ) : (
                <DataTable
                    columns={columns({ onDelete: (id) => {
                            setCategories((prev) => prev.filter((c) => c.id !== id))
                        }})}
                    data={categories}
                />
            )}
        </>
    )
}
