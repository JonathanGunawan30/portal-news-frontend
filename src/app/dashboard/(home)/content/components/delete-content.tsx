"use client"

import { FC } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { deleteContent } from "../lib/action"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"

interface DeleteContentProps {
    id: number
    onDelete: (id: number) => void
}

const DeleteContent: FC<DeleteContentProps> = ({ id, onDelete }) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => deleteContent(id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["admin", "contents"] }),
                queryClient.invalidateQueries({ queryKey: ["fe", "contents"] }),
            ])
            toast.success("Content deleted successfully!")
            onDelete(id)
        },
        onError: () => {
            toast.error("Failed to delete content.")
        },
    })

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
            onConfirm={() => deleteMutation.mutate()}
        />
    )
}

export default DeleteContent
