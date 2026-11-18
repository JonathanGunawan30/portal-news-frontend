import { NextRequest, NextResponse } from "next/server";

async function isTokenValid(token: string): Promise<boolean> {
    const apiBase =
        process.env.BACKEND_URL
            ? `${process.env.BACKEND_URL}/api`
            : process.env.NEXT_PUBLIC_API_URL;

    if (!apiBase || !apiBase.startsWith("http")) {
        // Fallback: cannot verify remotely if only relative path is configured
        return true;
    }

    try {
        const res = await fetch(`${apiBase}/admin/users/profile`, {
            method: "GET",
            headers: {
                Cookie: `X-API-TOKEN=${token}`,
            },
            cache: "no-store",
            signal: AbortSignal.timeout(3000),
        });
        return res.ok;
    } catch {
        // On transient network errors, let the downstream route/API handle auth
        return true;
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("X-API-TOKEN")?.value;
    const { pathname } = request.nextUrl;

    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && pathname.startsWith("/dashboard")) {
        const valid = await isTokenValid(token);
        if (!valid) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("X-API-TOKEN");
            return response;
        }
    }

    if (token && pathname.startsWith("/login")) {
        const valid = await isTokenValid(token);
        if (valid) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        const response = NextResponse.next();
        response.cookies.delete("X-API-TOKEN");
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
