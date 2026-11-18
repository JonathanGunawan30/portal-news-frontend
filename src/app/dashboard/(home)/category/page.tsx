"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { toast } from "sonner"
import { ApiError } from "@/lib/api"
import { columns } from "@/app/dashboard/(home)/category/components/columns-table"
import { getAdminCategories } from "@/app/dashboard/(home)/category/lib/action"

export default function CategoryPage() {
    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ["admin", "categories"],
        queryFn: getAdminCategories,
    })

    useEffect(() => {
        if (error) {
            if (error instanceof ApiError && error.status === 401) {
                toast.error("Unauthorized, please login again")
            } else {
                toast.error("Failed to fetch categories")
            }
        }
    }, [error])

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="my-3 sm:my-5 text-2xl font-bold">Categories</div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/category/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Category
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="p-10 text-center text-muted-foreground">Loading…</div>
            ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-[640px] md:min-w-0 px-4 md:px-0">
                        <DataTable
                            columns={columns({ onDelete: () => {} })}
                            data={categories}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
