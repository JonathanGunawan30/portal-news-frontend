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
            <nav className="border-b border-muted p-5">
                <div className="flex-row items-center justify-between">
                    <span className="font-bold text-primary">Portal News</span>
                </div>
            </nav>

            <section className="flex flex-row gap-5 item-start flex-nowrap">
                <aside className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
                    <div className="space-y-2">
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard">
                                <LayoutDashboard className="mr-2 w-4 h-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="uppercase text-xs font-bold">
                            Master Data
                        </div>
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

                        <div className="uppercase text-xs font-bold">
                            Manage Account
                        </div>
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/dashboard/user">
                                <User className="mr-2 w-4 h-4" />
                                Profile
                            </Link>
                        </Button>
                    </div>
                    <ButtonLogout/>
                </aside>

                <main className="flex-1 p-5">{children}</main>
            </section>
        </section>
    )
}
