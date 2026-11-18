import { toast } from "sonner";
import { ApiError } from "@/lib/api";

interface ErrorPayload {
    message?: string;
    errors?: string[];
    meta?: {
        message?: string;
        errors?: string[];
    };
}

export function handleApiError(err: unknown) {
    if (err instanceof ApiError) {
        const status = err.status;
        const data = err.data as ErrorPayload | null;
        const message = data?.meta?.message || data?.message || err.message;

        if (status === 400) {
            if (Array.isArray(data?.errors)) {
                data.errors.forEach((e) => toast.error(e));
            } else if (Array.isArray(data?.meta?.errors)) {
                data.meta.errors.forEach((e) => toast.error(e));
            } else {
                toast.error(message || "Validation error");
            }
        } else if (status === 401) {
            toast.error("Unauthorized, please login again");
        } else if (status === 409) {
            toast.error(message || "Resource conflict");
        } else {
            toast.error(message || "Unexpected error");
        }
        return;
    }

    if (err instanceof Error) {
        toast.error(err.message || "Something went wrong");
        return;
    }

    toast.error("Something went wrong");
}
