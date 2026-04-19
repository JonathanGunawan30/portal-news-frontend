import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@/components/google-analytics"
import { CookieConsent } from "@/components/CookieConsent"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.jonathangunawan.com'),

    title: {
        default: "Jonathan News Portal | Daily Tech & Business News",
        template: "%s | Jonathan News Portal",
    },

    description: "Stay updated with the latest technology, business, and gaming news. Jonathan News Portal delivers trusted, in-depth coverage for curious minds.",

    openGraph: {
        title: "Jonathan News Portal",
        description: "Your go-to source for tech, business, and gaming news — updated daily.",
        url: 'https://blog.jonathangunawan.com',
        siteName: "Jonathan News Portal",
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

    keywords: ["technology news", "business news", "gaming news", "Jonathan News Portal"],

    alternates: {
        canonical: 'https://blog.jonathangunawan.com',
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
        title: "Jonathan News Portal",
        description: "Your go-to source for tech, business, and gaming news — updated daily.",
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Suspense fallback={null}>
                    <GoogleAnalytics />
                </Suspense>
                {children}
                <CookieConsent />
            </body>
        </html>
    )
}