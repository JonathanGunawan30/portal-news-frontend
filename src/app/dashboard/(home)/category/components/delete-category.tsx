"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { deleteCategory } from "../lib/action"
import {ConfirmDialog} from "@/components/ui/ConfirmDialog"

interface DeleteCategoryProps {
    id: number
    onDelete: (id: number) => void
}

const DeleteCategory: FC<DeleteCategoryProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteCategory(id)
            toast.success("Category deleted successfully!")
            onDelete(id)
        } catch {
            toast.error("Failed to delete category.")
        }
    }

    return (
        <ConfirmDialog
            trigger={
                <Button variant="destructive" size="sm">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            }
            title="Are you absolutely sure?"
            description="This action cannot be undone. The category will be permanently deleted from the system."
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
        />
    )
}

export default DeleteCategory
