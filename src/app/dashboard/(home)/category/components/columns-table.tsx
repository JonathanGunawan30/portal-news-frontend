"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@/model/Category"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import DeleteCategory from "./delete-category"

export const columns = ({ onDelete }: { onDelete: (id: number) => void }): ColumnDef<Category>[] => [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "created_by_name",
        header: "Created By",
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const category = row.original
            return (
                <div className="inline-flex gap-2 items-center">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/dashboard/category/edit/${category.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>

                    <DeleteCategory id={category.id} onDelete={onDelete} />
                </div>
            )
        },
    },
]
