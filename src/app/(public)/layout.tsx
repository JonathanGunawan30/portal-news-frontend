import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.jonathangunawan.com'),

    title: {
        default: "Jonathan's News Portal",
        template: "%s | Jonathan's News Portal",
    },
    description: "An up-to-date news portal covering technology, business, and travel.",

    openGraph: {
        title: "Jonathan's News Portal",
        description: "An up-to-date news portal covering technology, business, and travel.",
        url: "https://blog.jonathangunawan.com",
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
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased text-gray-800">
                <Navbar/>
                    <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:-py-5">
                        {children}
                    </main>
                <Footer/>
            </body>
        </html>
    );
}