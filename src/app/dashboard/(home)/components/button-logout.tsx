"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/lib/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function ButtonLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: () => apiFetch("/admin/logout", { method: "POST" }),
        onSuccess: () => {
            queryClient.clear()
            toast.success("Logout successful!")
            router.push("/login")
        },
        onError: () => {
            toast.error("Logout failed!")
        },
    })

    return (
        <div className="space-y-2">
            <Button
                type="button"
                disabled={logoutMutation.isPending}
                onClick={() => logoutMutation.mutate()}
                variant="destructive"
                className="flex items-center gap-2 hover:bg-red-700 transition-colors"
            >
                <LogOut className="h-4 w-4" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
        </div>
    )
}
