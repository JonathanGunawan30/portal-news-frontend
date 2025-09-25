import { toast } from "sonner";

export function handleAxiosError(err: any) {
    if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        const message = data?.meta?.message || data?.message;

        if (status === 400) {
            if (Array.isArray(data?.errors)) {
                data.errors.forEach((e: string) => toast.error(e));
            } else if (Array.isArray(data?.meta?.errors)) {
                data.meta.errors.forEach((e: string) => toast.error(e));
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
    } else if (err.request) {
        toast.error("No response from server");
    } else {
        toast.error(err.message || "Something went wrong");
    }
}
