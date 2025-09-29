import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8080/api/:path*",
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.blog.jonathangunawan.com',
            },
            {
                protocol: 'https',
                hostname: 'pub-73d673f650c8460c823f39b38c29c12d.r2.dev',
            },
        ],
    },

};

export default nextConfig;
