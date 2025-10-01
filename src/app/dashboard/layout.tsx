import { Inter } from "next/font/google"
import "../globals.css"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {BookOpen, Layers3, LayoutDashboard, User} from "lucide-react";
import ButtonLogout from "@/app/dashboard/(home)/components/button-logout";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "Dashboard | Portal News",
        template: "%s | Portal News",
    },
    description: "Manage your content, categories, and users in the Portal News dashboard.",
    openGraph: {
        title: "Dashboard | Portal News",
        description: "Admin dashboard for managing Portal News content.",
        url: "https://myapp.com/dashboard",
        siteName: "Portal News",
        images: [
            {
                url: "/og-dashboard.png",
                width: 1200,
                height: 630,
                alt: "Portal News Dashboard",
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={`${inter.className} antialiased`}>
            <nav className="border-b border-muted px-5 py-4 sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-lg">Portal News</span>
                    <div className="hidden md:block text-sm text-muted-foreground">
                        Manage your content
                    </div>
                </div>
                {/* Mobile quick nav */}
                <div className="mt-3 md:hidden -mx-5 px-5 overflow-x-auto">
                    <div className="flex gap-2">
                        <Link href="/dashboard" className="whitespace-nowrap rounded-full border px-3 py-1 text-sm">Dashboard</Link>
                        <Link href="/dashboard/category" className="whitespace-nowrap rounded-full border px-3 py-1 text-sm">Categories</Link>
                        <Link href="/dashboard/content" className="whitespace-nowrap rounded-full border px-3 py-1 text-sm">Contents</Link>
                        <Link href="/dashboard/user" className="whitespace-nowrap rounded-full border px-3 py-1 text-sm">Profile</Link>
                    </div>
                </div>
            </nav>

            <section className="flex md:flex-row flex-col gap-5 items-start md:items-stretch">
                {/* Sidebar for md+ */}
                <aside className="hidden md:block md:sticky md:top-[68px] md:h-[calc(100dvh-68px)] md:w-64 shrink-0 border-r p-4 space-y-5">
                    <div className="space-y-2">
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard">
                                <LayoutDashboard className="mr-2 w-4 h-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="uppercase text-xs font-bold text-muted-foreground">Master Data</div>
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard/category">
                                <Layers3 className="mr-2 w-4 h-4" />
                                Categories
                            </Link>
                        </Button>

                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard/content">
                                <BookOpen className="mr-2 w-4 h-4" />
                                Contents
                            </Link>
                        </Button>

                        <div className="uppercase text-xs font-bold text-muted-foreground">Manage Account</div>
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard/user">
                                <User className="mr-2 w-4 h-4" />
                                Profile
                            </Link>
                        </Button>
                    </div>
                    <ButtonLogout/>
                </aside>

                <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto">{children}</main>
            </section>
        </section>
    )
}
