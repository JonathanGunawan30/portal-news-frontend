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
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Contents</div>
                <Button asChild>
                    <Link href="/dashboard/content/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Content
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="p-10 text-center text-muted-foreground">Loading…</div>
            ) : (
                <DataTable
                    columns={contentColumns({
                        onDelete: (id) => {
                            setContents((prev) => prev.filter((c) => c.id !== id))
                            toast.success("Content deleted successfully!")
                        },
                    })}
                    data={contents}
                />
            )}
        </>
    )
}
