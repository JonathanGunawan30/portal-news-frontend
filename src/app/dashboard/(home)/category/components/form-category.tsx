"use client"

import { Category } from "@/model/Category"
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { createCategory, updateCategory } from "../lib/action"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SubmitButton } from "../../components/submit-button"
import {handleAxiosError} from "@/lib/error";

interface FormCategoryProps {
    type?: "ADD" | "EDIT"
    defaultValue?: Category | null
}

const FormCategoryPage: FC<FormCategoryProps> = ({ type = "ADD", defaultValue }) => {
    const router = useRouter()
    const [title, setTitle] = useState(defaultValue?.title ?? "")
    const [error, setError] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const handleCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        setError([])
        setLoading(true)

        try {
            if (type === "ADD") {
                await createCategory({ title });
                toast.success("Category created successfully!");
            } else if (type === "EDIT" && defaultValue) {
                await updateCategory(defaultValue.id, { title });
                toast.success("Category updated successfully!");
            }
            router.push("/dashboard/category");
        } catch (err: any) {
            handleAxiosError(err);
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleCategory} className="space-y-5">
            <div>
                <Input
                    type="text"
                    placeholder="Category title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {error.length > 0 && (
                    <div className="mt-2 text-sm text-red-500">
                        {error.map((err, i) => (
                            <p key={i}>{err}</p>
                        ))}
                    </div>
                )}
            </div>

            <SubmitButton loading={loading} type={type} />
        </form>
    )
}

export default FormCategoryPage
