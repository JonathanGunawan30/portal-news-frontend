"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Content } from "@/model/Content";
import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/model/ApiResponse";
import { toast } from "sonner";
import Link from "next/link";
import { HomeSkeleton } from "@/components/home-skeleton";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { PostCard } from "@/components/post-card";

export default function Home() {
    const { data: allData = [], isLoading, isError } = useQuery({
        queryKey: ["fe", "contents", "home"],
        queryFn: async () => {
            const res = await apiFetch<ApiResponse<Content[]>>("/fe/contents?limit=8");
            return res.data;
        },
    });

    useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch contents");
        }
    }, [isError]);

    if (isLoading) {
        return <HomeSkeleton />;
    }

    const sliceData = allData.slice(0, 2);
    const contents = allData.slice(2);

    return (
        <div className="space-y-16">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {sliceData.map((content) => (
                    <FeaturedPostCard key={content.id} content={content} />
                ))}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-8 hidden md:block">More Posts</h2>
                <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                    {contents.map((content) => (
                        <PostCard key={content.id} content={content} />
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                <Link href={"/content-all"} className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span>View All Posts</span>
                </Link>
            </div>
        </div>
    );
}
