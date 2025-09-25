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
        url: "https://myapp.com/login",
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
        <main className={`${inter.className} flex min-h-screen items-center justify-center antialiased`}>
            {children}
            <Toaster richColors position="top-right" />
        </main>
    )
}
