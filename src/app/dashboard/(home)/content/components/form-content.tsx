"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { createContent, updateContent, uploadImage } from "../lib/action"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { SubmitButton } from "../../components/submit-button"
import { handleAxiosError } from "@/lib/error"
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
    const [title, setTitle] = useState(defaultValue?.title ?? "")
    const [excerpt, setExcerpt] = useState(defaultValue?.excerpt ?? "")
    const [description, setDescription] = useState(defaultValue?.description ?? "")
    const [tags, setTags] = useState<string>(Array.isArray(defaultValue?.tags) ? (defaultValue?.tags as string[]).join(', ') : (defaultValue?.tags ?? ""))
    const [status, setStatus] = useState(defaultValue?.status ?? "DRAFT")
    const [categoryId, setCategoryId] = useState<number | null>(defaultValue?.category_id ?? null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>(defaultValue?.image ?? "")
    const [loading, setLoading] = useState(false)

    const handleContent = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = defaultValue?.image || ""

            if (imageFile) {
                const uploadRes = await uploadImage(imageFile)
                imageUrl = uploadRes.url
            }

            if (!imageUrl) {
                toast.error("Image is required")
                setLoading(false)
                return
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
                await createContent(payload)
                toast.success("Content created successfully!")
            } else if (type === "EDIT" && defaultValue) {
                await updateContent(defaultValue.id, payload)
                toast.success("Content updated successfully!")
            }

            router.push("/dashboard/content")
        } catch (err: any) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message)
            } else {
                handleAxiosError(err)
            }
        } finally {
            setLoading(false)
        }
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
            <SubmitButton loading={loading} type={type} />
        </form>
    )
}

export default FormContentPage