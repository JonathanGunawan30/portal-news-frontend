"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createContent, updateContent, uploadImage } from "../lib/action"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { SubmitButton } from "../../components/submit-button"
import { handleApiError } from "@/lib/error"
import { ApiError } from "@/lib/api"
import { Content } from "@/model/Content"
import { Category } from "@/model/Category"
import { RichTextEditor } from "@/components/rich-text-editor"

interface FormContentProps {
    type?: "ADD" | "EDIT"
    defaultValue?: Content | null
    categoryList: Category[]
}

const FormContentPage: FC<FormContentProps> = ({ type = "ADD", defaultValue, categoryList }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [title, setTitle] = useState(defaultValue?.title ?? "")
    const [excerpt, setExcerpt] = useState(defaultValue?.excerpt ?? "")
    const [description, setDescription] = useState(defaultValue?.description ?? "")
    const [tags, setTags] = useState<string>(Array.isArray(defaultValue?.tags) ? (defaultValue?.tags as string[]).join(', ') : (defaultValue?.tags ?? ""))
    const [status, setStatus] = useState(defaultValue?.status ?? "DRAFT")
    const [categoryId, setCategoryId] = useState<number | null>(defaultValue?.category_id ?? null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>(defaultValue?.image ?? "")

    useEffect(() => {
        return () => {
            if (previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const mutation = useMutation({
        mutationFn: async () => {
            let imageUrl = defaultValue?.image || ""

            if (imageFile) {
                const uploadRes = await uploadImage(imageFile)
                imageUrl = uploadRes.url
            }

            if (!imageUrl) {
                throw new Error("Image is required")
            }

            const payload = {
                title,
                excerpt,
                description,
                tags: Array.isArray(tags) ? tags.join(',') : tags,
                status,
                category_id: categoryId,
                image: imageUrl,
            }

            if (type === "ADD") {
                return createContent(payload)
            }
            if (type === "EDIT" && defaultValue) {
                return updateContent(defaultValue.id, payload)
            }
            throw new Error("Invalid form configuration")
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["admin", "contents"] }),
                queryClient.invalidateQueries({ queryKey: ["fe", "contents"] }),
            ])
            toast.success(
                type === "ADD"
                    ? "Content created successfully!"
                    : "Content updated successfully!"
            )
            router.push("/dashboard/content")
        },
        onError: (err) => {
            if (err instanceof ApiError) {
                handleApiError(err)
            } else {
                toast.error(err instanceof Error ? err.message : "Failed to save content")
            }
        },
    })

    const handleContent = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            toast.error("Title is required")
            return
        }

        if (!categoryId) {
            toast.error("Category is required")
            return
        }

        if (!imageFile && !defaultValue?.image) {
            toast.error("Image is required")
            return
        }

        mutation.mutate()
    }

    return (
        <form onSubmit={handleContent} className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input type="text" placeholder="Content title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Excerpt</label>
                    <Input type="text" placeholder="Short summary..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tags</label>
                    <Input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="PUBLISH">Publish</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select value={categoryId ? String(categoryId) : undefined} onValueChange={(val) => setCategoryId(Number(val))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categoryList.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-gray-700">Image</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImageFile(e.target.files[0])
                                setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                            }
                        }}
                    />
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" className="mt-2 h-40 object-cover rounded-md border" />
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <RichTextEditor
                    value={description}
                    onChange={setDescription}
                />
            </div>
            <SubmitButton loading={mutation.isPending} type={type} />
        </form>
    )
}

export default FormContentPage