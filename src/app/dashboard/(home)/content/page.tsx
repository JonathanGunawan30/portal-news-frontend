"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import axiosInstance from "@lib/axios"
import { toast } from "sonner"
import { Content } from "@/model/Content"
import { contentColumns } from "@/app/dashboard/(home)/content/components/columns-table"

export default function ContentPage() {
    const [contents, setContents] = useState<Content[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const res = await axiosInstance.get("/admin/contents", {
                    withCredentials: true,
                })
                setContents(res.data.data)
            } catch (err: any) {
                if (err.response?.status === 401) {
                    toast.error("Unauthorized, please login again")
                } else {
                    toast.error("Failed to fetch contents")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchContents()
    }, [])

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

            {loading ? (
                <div className="p-10 text-center text-muted-foreground">Loading…</div>
            ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-[640px] md:min-w-0 px-4 md:px-0">
                        <DataTable
                            columns={contentColumns({
                                onDelete: (id) => {
                                    setContents((prev) => prev.filter((c) => c.id !== id))
                                    toast.success("Content deleted successfully!")
                                },
                            })}
                            data={contents}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
