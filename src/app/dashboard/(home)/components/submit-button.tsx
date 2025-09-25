"use client"

import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
    loading: boolean
    labelAdd?: string
    labelEdit?: string
    type?: "ADD" | "EDIT"
}

export const SubmitButton = ({
                                 loading,
                                 labelAdd = "Create Category",
                                 labelEdit = "Update Category",
                                 type = "ADD",
                             }: SubmitButtonProps) => {
    return (
        <Button type="submit" disabled={loading}>
            {loading
                ? "Processing..."
                : type === "ADD"
                    ? labelAdd
                    : labelEdit}
        </Button>
    )
}
