import { notFound } from "next/navigation"
import {getAllCategories } from "../../lib/action"
import { getContentById } from "../../lib/data"
import FormContentPage from "@/app/dashboard/(home)/content/components/form-content"

interface EditContentPageProps {
    params: {
        id: string
    }
}

export default async function EditContentPage({ params }: EditContentPageProps) {
    const id = Number(params.id)

    if (isNaN(id)) {
        notFound()
    }

    const [contentToEdit, categoryList] = await Promise.all([
        getContentById(id),
        getAllCategories(),
    ])

    if (!contentToEdit) {
        notFound()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className=" mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Content</h1>
                    <p className="mt-1 text-md text-gray-600">Update the details of your content below.</p>
                </div>
                <FormContentPage
                    type="EDIT"
                    defaultValue={contentToEdit}
                    categoryList={categoryList}
                />
            </div>
        </div>
    )
}