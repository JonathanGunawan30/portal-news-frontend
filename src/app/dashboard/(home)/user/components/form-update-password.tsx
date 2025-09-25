"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { handleAxiosError } from "@/lib/error";
import { getUserProfile, updatePassword } from "../lib/action";
import type { User } from "@/model/User";

export function UpdatePasswordForm() {
    const [profile, setProfile] = useState<User | null>(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [initialLoading, setInitialLoading] = useState(true);
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const userProfile = await getUserProfile();
                setProfile(userProfile);
            } catch (error) {
                toast.error("Failed to load profile data.");
                console.error(error);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        setPasswordLoading(true);
        try {
            await updatePassword({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            handleAxiosError(err);
        } finally {
            setPasswordLoading(false);
        }
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
                <button type="submit" disabled={passwordLoading} className="max-2xl px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-400">
                    {passwordLoading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}