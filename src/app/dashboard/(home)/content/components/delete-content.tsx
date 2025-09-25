"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { deleteContent } from "../lib/action"
import {ConfirmDialog} from "@/components/ui/ConfirmDialog"

interface DeleteContentProps {
    id: number
    onDelete: (id: number) => void
}

const DeleteContent: FC<DeleteContentProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteContent(id)
            toast.success("Content deleted successfully!")
            onDelete(id)
        } catch {
            toast.error("Failed to delete content.")
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
            description="This action cannot be undone. The content will be permanently deleted from the system."
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
        />
    )
}

export default DeleteContent
