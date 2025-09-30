import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

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
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_US',
        type: 'website',
    },
};

export default function PublicLayout({
                                         children,
                                     }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={`${inter.className} antialiased text-gray-800`}>
            <Navbar />
            <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
                {children}
            </main>
            <Footer />
            <Toaster richColors />
        </div>
    );
}