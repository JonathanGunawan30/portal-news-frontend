"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/error";
import { getUserProfile, updatePassword } from "../lib/action";

export function UpdatePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { data: profile, isLoading: initialLoading, isError } = useQuery({
        queryKey: ["admin", "user", "profile"],
        queryFn: () => getUserProfile(),
    });

    useEffect(() => {
        if (isError) {
            toast.error("Failed to load profile data.");
        }
    }, [isError]);

    const passwordMutation = useMutation({
        mutationFn: async () => {
            const result = await updatePassword({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            if (!result.ok) {
                throw new Error(result.message || "Failed to update password.");
            }
            return result;
        },
        onSuccess: () => {
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        },
        onError: (err) => {
            handleApiError(err);
        },
    });

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        passwordMutation.mutate();
    };

    if (initialLoading) {
        return <div className="text-center p-8">Loading profile...</div>;
    }

    if (!profile) {
        return <div className="text-center p-8 text-red-600">Could not load profile.</div>;
    }

    return (
        <div className="w-full space-y-10">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Profile Details</h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input value={profile.name} disabled className="bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input value={profile.email} disabled className="bg-gray-100 cursor-not-allowed" />
                </div>
            </div>

            <hr />

            <form onSubmit={handleUpdatePassword} className="space-y-6">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={passwordMutation.isPending} className="max-2xl px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-400">
                    {passwordMutation.isPending ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}
