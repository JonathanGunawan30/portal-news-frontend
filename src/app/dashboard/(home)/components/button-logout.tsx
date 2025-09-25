"use client"


import { useRouter } from "next/navigation"
import axiosInstance from "@lib/axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {LogOut} from "lucide-react";

export default function ButtonLogout()  {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/admin/logout", {}, {withCredentials: true})
            toast.success("Logout successful!")
            router.push("/login")
        } catch (err) {
            toast.error("Logout failed!")
        }
    }

    return (
        <div className="space-y-2">
            <form action={handleLogout}>
                <Button type="submit" variant="destructive" className="flex items-center gap-2 hover:bg-red-700 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </form>
        </div>
    )



}