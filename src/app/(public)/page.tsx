"use client"

import {useEffect, useState} from "react";
import {Content} from "@/model/Content";
import axiosInstance from "@lib/axios";
import {ApiResponse} from "@/model/ApiResponse";
import {toast} from "sonner";
import Link from "next/link";
import Image from "next/image";
import {format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import { HomeSkeleton } from "@/components/home-skeleton";

export default function Home() {
    const [contents, setContents] = useState<Content[]>([])
    const [sliceData, setSliceData] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)

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
        <div>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {sliceData.map((content) => (
                    <div key={content.id} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 ">
                            <Link className="relative block aspect-video" href={`/content-all/detail/${content.id}`}>
                                {content.image != "" && (
                                    <Image priority src={content.image} alt={content.title} width={600} height={400} className="object-cover transition-all"/>
                                )}
                            </Link>
                        </div>
                        <div>
                            <div>
                                <div className="flex gap-3">
                                    <Link href={`/category/${content.category_id}`}>
                                    <span className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-600">
                                        {content.category_name}
                                    </span>
                                    </Link>
                                </div>
                                <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 ">
                                    <Link href={`/content-all/detail/${content.id}`}>
                                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
                                        {content.title}
                                    </span>
                                    </Link>
                                </h2>
                                <div className="mt-3 flex items-center space-x-3 text-gray-500">
                                    <Link href={""}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-5 w-5 flex-shrink-0">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7xmT7OxoAs2AfeX3RWF_RDlUMevO2VDG31w&s" alt="author" className="rounded-full object-cover" sizes="20px"/>
                                            </div>
                                            <span className="truncate text-sm">
                                            {content.author}
                                        </span>
                                        </div>
                                    </Link>
                                    <span className="text-xs text-gray-300">•</span>
                                    <time dateTime={content.created_at} className="truncate text-sm">{format(new Date(content.created_at), 'MMMM d, y', {locale: enUS})}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 grid gap:10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                {contents.map((content) => (
                    <div key={content.id} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
                            <Link className="relative block aspect-ratio" href={`/content-all/detail/${content.id}`}>
                                {content.image != "" && (
                                    <Image src={content.image} alt={content.title} width={600} height={400}
                                           className="object-cover transition-all"/>
                                )}
                                {content.image == "" && (
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROxdqcF6F-dngsRT-lYEA46xmPbXSFFd1FQ&s"} alt={content.title} width={600} height={400} className="object-cover transition-all"/>
                                )}
                            </Link>
                        </div>
                        <div>
                            <div>
                                <div className="flex gap-3">
                                    <Link href={`/category/${content.category_id}`}>
                                    <span className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-600">
                                        {content.category_name}
                                    </span>
                                    </Link>
                                </div>
                                <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 ">
                                    <Link href={`/content-all/detail/${content.id}`}>
                                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
                                        {content.title}
                                    </span>
                                    </Link>
                                </h2>
                                <div className="mt-3 flex items-center space-x-3 text-gray-500">
                                    <Link href={""}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-5 w-5 flex-shrink-0">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7xmT7OxoAs2AfeX3RWF_RDlUMevO2VDG31w&s" alt="author" className="rounded-full object-cover" sizes="20px"/>
                                            </div>
                                            <span className="truncate text-sm">
                                            {content.author}
                                        </span>
                                        </div>
                                    </Link>
                                    <span className="text-xs text-gray-300">•</span>
                                    <time dateTime={content.created_at} className="truncate text-sm">{format(new Date(content.created_at), 'MMMM d, y', {locale: enUS})}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Link href={"/content-all"} className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ">
                    <span>View All Posts</span>
                </Link>
            </div>
        </div>
    );
}
