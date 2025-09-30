// src/app/layout.tsx

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.jonathangunawan.com'),

    title: {
        default: "Jonathan's News Portal | Daily Tech & Business News",
        template: "%s | Jonathan's News Portal",
    },

    description: "The latest news portal covering technology, business, gaming, and lifestyle, keeping you updated with trusted information.",

    openGraph: {
        title: "Jonathan's News Portal",
        description: "The latest news portal covering technology, business, gaming, and lifestyle.",
        url: 'https://blog.jonathangunawan.com',
        siteName: "Jonathan's News Portal",
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    twitter: {
        card: 'summary_large_image',
        title: "Jonathan's News Portal",
        description: "The latest news portal covering technology, business, gaming, and lifestyle.",
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <GoogleAnalytics />
                {children}
            </body>
        </html>
    )
}