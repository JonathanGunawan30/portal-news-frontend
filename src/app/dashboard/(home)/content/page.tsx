"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { toast } from "sonner"
import { ApiError } from "@/lib/api"
import { contentColumns } from "@/app/dashboard/(home)/content/components/columns-table"
import { getAdminContents } from "@/app/dashboard/(home)/content/lib/action"

export default function ContentPage() {
    const { data: contents = [], isLoading, error } = useQuery({
        queryKey: ["admin", "contents"],
        queryFn: getAdminContents,
    })

    useEffect(() => {
        if (error) {
            if (error instanceof ApiError && error.status === 401) {
                toast.error("Unauthorized, please login again")
            } else {
                toast.error("Failed to fetch contents")
            }
        }
    }, [error])

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="my-3 sm:my-5 text-2xl font-bold">Contents</div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/content/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Content
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="p-10 text-center text-muted-foreground">Loading…</div>
            ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-[640px] md:min-w-0 px-4 md:px-0">
                        <DataTable
                            columns={contentColumns({
                                onDelete: () => {},
                            })}
                            data={contents}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
