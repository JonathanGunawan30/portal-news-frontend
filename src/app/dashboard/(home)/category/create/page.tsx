import { Suspense } from 'react';
import FormCategoryPage from "@/app/dashboard/(home)/category/components/form-category";

function FormLoading() {
    return <p>Loading form...</p>;
}

const CreateCategoryPage = () => {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Add Category</div>
            </div>

            <Suspense fallback={<FormLoading />}>
                <FormCategoryPage type="ADD" />
            </Suspense>
        </div>
    )
}

export default CreateCategoryPage