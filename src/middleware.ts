import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest){
    const isLogin:string | undefined = request.cookies.get("accessToken")?.value;

    if (isLogin){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
}