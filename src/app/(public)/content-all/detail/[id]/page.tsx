import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';

import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";

interface ContentDetailPageProps {
    params: { id: string }
}

async function getContentDetail(id: string): Promise<Content | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fe/contents/${id}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) { return null; }
        const jsonResponse: ApiResponse<Content> = await res.json();
        return jsonResponse.data;
    } catch (err) {
        console.error("Failed to fetch content:", err);
        return null;
    }
}

export async function generateMetadata(
    { params }: ContentDetailPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;
    const content = await getContentDetail(id);

    if (!content) {
        return {
            title: "Content Not Found",
        }
    }

    return {
        title: content.title,
        description: content.excerpt,
        openGraph: {
            title: content.title,
            description: content.excerpt,
            url: `/content-all/detail/${id}`,
            type: 'article',
            publishedTime: content.created_at,
            authors: [content.author],
            images: [
                {
                    url: content.image,
                    width: 1200,
                    height: 630,
                    alt: content.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: content.title,
            description: content.excerpt,
            images: [content.image],
        }
    }
}

export default async function ContentDetail({ params }: ContentDetailPageProps) {
    const contentId = params.id;
    const content = await getContentDetail(contentId);

    if (!content) {
        notFound();
    }

    return (
        <div>
            <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
                <div className="mx-auto max-w-screen-md">
                    <div className="flex justify-center">
                        <div className="flex gap-3">
                            <Link href={`/category/${content.category_id}`}>
                                <span className="inline-block text-sm font-medium tracking-wider uppercase mt-5 text-blue-600">
                                    {content.category_name}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <h1 className="text-brand-primary mb-2 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
                        {content.title}
                    </h1>
                    {content.excerpt && (
                        <p className="text-center text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">
                            {content.excerpt}
                        </p>
                    )}
                </div>

                <div className="mt-3 flex justify-center space-x-3 text-gray-500">
                    <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 flex-shrink-0">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7xmT7OxoAs2AfeX3RWF_RDlUMevO2VDG31w&s" alt="author" className="rounded-full object-cover"/>
                        </div>
                        <div>
                            <p className="text-gray-800 text-sm font-medium">{content.author}</p>
                            <div className="flex items-center space-x-2 text-sm">
                                <time dateTime={content.created_at} className="truncate text-sm">
                                    {format(new Date(content.created_at), 'MMMM d, yyyy', { locale: enUS })}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
                {content.image && (
                    <Image
                        src={content.image}
                        alt={content.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
                <article className="mx-auto max-w-screen-md">
                    <div
                        className="prose mx-auto my-3"
                        dangerouslySetInnerHTML={{ __html: content.description }}
                    />
                    {/* Tags */}
                    {(() => {
                        const tagList = Array.isArray(content.tags)
                            ? content.tags
                            : typeof content.tags === 'string'
                                ? content.tags.split(',')
                                : [];
                        const cleaned = tagList.map((t) => String(t).trim()).filter(Boolean);
                        if (cleaned.length === 0) return null;
                        return (
                            <div className="mt-8 mb-3 flex flex-wrap items-center gap-2">
                                {cleaned.map((t) => (
                                    <span key={t} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">#{t}</span>
                                ))}
                            </div>
                        );
                    })()}
                    <div className="mb-7 mt-7 flex justify-center">
                        <Link href={`/content-all`} className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600">
                            View All Contents
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    )
}