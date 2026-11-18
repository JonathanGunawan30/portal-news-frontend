"use client"

import { Category } from "@/model/Category"
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory, updateCategory } from "../lib/action"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SubmitButton } from "../../components/submit-button"
import { handleApiError } from "@/lib/error"

interface FormCategoryProps {
    type?: "ADD" | "EDIT"
    defaultValue?: Category | null
}

const FormCategoryPage: FC<FormCategoryProps> = ({ type = "ADD", defaultValue }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [title, setTitle] = useState(defaultValue?.title ?? "")

    const mutation = useMutation({
        mutationFn: async (trimmedTitle: string) => {
            if (type === "ADD") {
                return createCategory({ title: trimmedTitle })
            }
            if (type === "EDIT" && defaultValue) {
                return updateCategory(defaultValue.id, { title: trimmedTitle })
            }
            throw new Error("Invalid form configuration")
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["admin", "categories"] }),
                queryClient.invalidateQueries({ queryKey: ["fe", "categories"] }),
            ])
            toast.success(
                type === "ADD"
                    ? "Category created successfully!"
                    : "Category updated successfully!"
            )
            router.push("/dashboard/category")
        },
        onError: (err) => {
            handleApiError(err)
        },
    })

    const handleCategory = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) {
            toast.error("Category title is required")
            return
        }
        mutation.mutate(trimmed)
    }

    return (
        <form onSubmit={handleCategory} className="space-y-5">
            <div>
                <Input
                    type="text"
                    placeholder="Category title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <SubmitButton loading={mutation.isPending} type={type} />
        </form>
    )
}

export default FormCategoryPage
