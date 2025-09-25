"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Content } from "@/model/Content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import DeleteContent from "./delete-content"

export const contentColumns = ({ onDelete }: { onDelete: (id: number) => void }): ColumnDef<Content>[] => [
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
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "category_name",
        header: "Category",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                    row.original.status === "PUBLISH"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                }`}
            >
        {row.original.status}
      </span>
        ),
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const content = row.original
            return (
                <div className="inline-flex gap-2 items-center">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/dashboard/content/edit/${content.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>

                    <DeleteContent id={content.id} onDelete={onDelete} />
                </div>
            )
        },
    },
]
