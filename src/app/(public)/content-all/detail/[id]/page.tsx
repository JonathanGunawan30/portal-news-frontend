"use client"

import React, {use, useEffect, useState} from "react";
import {Content} from "@/model/Content";
import axiosInstance from "@lib/axios";
import {ApiResponse} from "@/model/ApiResponse";
import {toast} from "sonner";
import Link from "next/link";
import Image from "next/image";
import {format} from "date-fns";
import {enUS} from "date-fns/locale";
import { ContentDetailSkeleton } from "@/components/content-detail-skeleton";

interface ContentDetailPageProps {
    params: Promise<{ id: string }>
}


export default function ContentDetail({params}: ContentDetailPageProps) {
    const contentId = use(params).id;
    const [content, setContent] = useState<Content | null>(null)

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Content>>(`/fe/contents/${contentId}`)
                setContent(res.data.data)
            } catch (err){
                toast.error("Failed to fetch contents")
            }
        }
        fetchContents().then(r => console.info("Content fetched successfully"));
    }, [contentId]);

    if (!content) {
        return <ContentDetailSkeleton/>
    }

    return (
        <div>
            <div className="container px-8 mx-auto xl:px-5 max-w-screen py-5 lg:py-8 !pt-0">
                <div className="mx-auto max-w-screen-md">
                    <div className="flex justify-center">
                        <div className="flex gap-3">
                            <Link href={`/category/${content?.category_id}`}>
                                <span className="inline-block text-sm font-medium tracking-wider uppercase mt-5 text-blue-600">
                                    {content?.category_name}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <h2 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
                        {content?.title}
                    </h2>
                </div>
                <div className="mt-3 flex justify-center space-x-3 text-gray-500">
                    <div className="flex items-center gap-3">
                        <div>
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
            </div>
            <div className="relative z-0 mx-auto aspect-ratio max-w-screen-lg overflow-hidden lg:rounded-lg">
                {content?.image != "" && (
                    <Image src={`${content?.image}`} alt={`${content?.title}`} width={600} height={400}
                           className="object-cover w-screen"/>
                )}
                {content?.image == "" && (
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROxdqcF6F-dngsRT-lYEA46xmPbXSFFd1FQ&s"} alt={content?.title} width={600} height={400} className="object-cover transition-all" sizes="100vw"/>
                )}
            </div>
            <div className="container px-8 mx-auto xl:px-5 max-w-screen py-5 lg:py-8">
                <article className="mx-auto max-w-screen-md">
                    <div className="prose mx-auto my-3">
                        {content?.description}
                    </div>
                    <div className="mb-7 mt-7 flex justify-center">
                        <Link href={`/content-all`} className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 ">
                            View All Contents
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    )
}