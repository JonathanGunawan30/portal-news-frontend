import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "../globals.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "Auth | Portal News",
        template: "%s | Portal News",
    },
    description: "Sign in or sign up to access your Portal News dashboard.",
    openGraph: {
        title: "Auth | Portal News",
        description: "Secure authentication page for Portal News.",
        url: "https://blog.jonathangunawan.com/login",
        siteName: "Portal News",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Portal News Auth Page",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={`${inter.className} min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-zinc-950 antialiased relative overflow-hidden`}>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background:radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
            
            <div className="w-full max-w-md px-4">
                {children}
            </div>
            <Toaster richColors position="top-right" />
        </main>
    )
}
