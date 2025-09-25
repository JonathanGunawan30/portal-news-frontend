import { UpdatePasswordForm } from "./components/form-update-password"

export default function ProfilePage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Profile</h1>
                    <p className="mt-1 text-md text-gray-600">Manage your account details.</p>
                </div>

                <UpdatePasswordForm />
            </div>
        </div>
    );
}