export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

interface ApiFetchOptions extends RequestInit {
    cookieHeader?: string;
}

export async function apiFetch<T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
    const { cookieHeader, headers: customHeaders, body, ...rest } = options;

    const headers = new Headers(customHeaders);
    if (body && !(body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
        ...rest,
        body,
        headers,
        credentials: cookieHeader ? "omit" : "include",
    });

    const contentType = res.headers.get("content-type") ?? "";
    let data: unknown = null;
    if (contentType.includes("application/json")) {
        data = await res.json().catch(() => null);
    }

    if (!res.ok) {
        const errData = data as { message?: string; meta?: { message?: string } } | null;
        const message =
            errData?.meta?.message || errData?.message || `Request failed with status ${res.status}`;
        throw new ApiError(message, res.status, data);
    }

    return data as T;
}
