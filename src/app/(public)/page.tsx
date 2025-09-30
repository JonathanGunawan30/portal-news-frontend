"use client"

import {useEffect, useState} from "react";
import {Content} from "@/model/Content";
import axiosInstance from "@lib/axios";
import {ApiResponse} from "@/model/ApiResponse";
import {toast} from "sonner";
import Link from "next/link";
import { HomeSkeleton } from "@/components/home-skeleton";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { PostCard } from "@/components/post-card";

export default function Home() {
    const [contents, setContents] = useState<Content[]>([]);
    const [sliceData, setSliceData] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Content[]>>("/fe/contents?limit=8");
                const allData = res.data.data;
                setSliceData(allData.slice(0, 2));
                setContents(allData.slice(2));
            } catch (err){
                toast.error("Failed to fetch contents");
            } finally {
                setIsLoading(false);
            }
        }
        fetchContents().then(r => console.info("Contents fetched successfully"));
    }, [])

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <div className="space-y-16">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {sliceData.map((content) => (
                    <FeaturedPostCard key={content.id} content={content} />
                ))}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-8">More Posts</h2>
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