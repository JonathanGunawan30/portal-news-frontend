"use client"

import React, { useEffect, useState } from "react"
import { Content } from "@/model/Content"
import { ApiResponse, Pagination } from "@/model/ApiResponse"
import axiosInstance from "@lib/axios"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ContentByCategoryPageProps {
    params: { id: string }
}

export default function ContentByCategory({ params }: ContentByCategoryPageProps) {
    const categoryId = params.id
    const [contents, setContents] = useState<Content[]>([])
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchContents = async (page: number = 1) => {
        try {
            const res = await axiosInstance.get<ApiResponse<Content[]>>(
                `/fe/contents?limit=9&page=${page}&category_id=${categoryId}`
            )
            setContents(res.data.data)
            setPagination(res.data.pagination ?? null)
        } catch (err) {
            toast.error("Failed to fetch contents")
        }
    }

    const handlePrevPage = () => {
        if (pagination && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (pagination && currentPage < pagination.total_page) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        fetchContents(currentPage).then(() => console.info("Contents fetched successfully"))
    }, [currentPage])

    return (
        <div>
            <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 relative">
                <h1 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
                    Content
                </h1>
                <div className="text-center">
                    <p className="mt-2 text-lg">View All Contents</p>
                </div>
                <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                    {contents.map((content) => (
                        <div key={content.id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
                                <Link
                                    className="relative block aspect-video"
                                    href={`/content-all/detail/${content.id}`}
                                >
                                    {content.image ? (
                                        <Image
                                            src={content.image}
                                            alt={content.title}
                                            fill
                                            className="object-cover transition-all"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <Image
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROxdqcF6F-dngsRT-lYEA46xmPbXSFFd1FQ&s"
                                            alt={content.title}
                                            fill
                                            className="object-cover transition-all"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}
                                </Link>
                            </div>
                            <div>
                                <div className="flex gap-3">
                                    <Link href={`/category/${content.category_id}`}>
                    <span className="inline-block text-sm font-medium tracking-wider uppercase mt-5 text-blue-600">
                      {content.category_name}
                    </span>
                                    </Link>
                                </div>
                                <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2">
                                    <Link href={`/content-all/detail/${content.id}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-left-center bg-no-repeat transition-all duration-300 bg-[length:0%_70%] hover:bg-[length:100%_70%]">
                      {content.title}
                    </span>
                                    </Link>
                                </h2>
                                <div className="mt-3 flex items-center space-x-3 text-gray-500">
                                    <Link href={`/content-all/detail/${content.id}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-5 w-5 flex-shrink-0">
                                                <Image
                                                    src="/img/admin.png"
                                                    alt="author"
                                                    width={20}
                                                    height={20}
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                            <span className="truncate text-sm">{content.author}</span>
                                        </div>
                                    </Link>
                                    <span className="text-xs text-gray-300">•</span>
                                    <time
                                        dateTime={content.created_at}
                                        className="truncate text-sm"
                                    >
                                        {format(new Date(content.created_at), "MMMM d, y", { locale: enUS })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {pagination && (
                    <div className="flex justify-center items-center mt-10">
                        <nav className="flex justify-center mt-10">
                            <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
                                <Button
                                    type="button"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 border-r border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40 rounded-none"
                                >
                                    <ArrowLeft className="h-3 w-3 stroke-1" />
                                    <span>Previous</span>
                                </Button>

                                {Array.from({ length: pagination.total_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 text-sm font-medium border-r border-gray-300 rounded-none ${
                                            currentPage === page
                                                ? "bg-gray-900 text-white"
                                                : "bg-white text-gray-500 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </Button>
                                ))}

                                <Button
                                    type="button"
                                    onClick={handleNextPage}
                                    disabled={pagination.total_page <= currentPage}
                                    className="flex items-center gap-1 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40 rounded-none"
                                >
                                    <span>Next</span>
                                    <ArrowRight className="h-3 w-3 stroke-1" />
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}