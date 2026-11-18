"use client"

import { useEffect, useId, useRef, useState } from "react";
import { Category } from "@/model/Category";
import axiosInstance from "@lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Category[]>>("/fe/categories");
                setCategories(res.data.data);
            } catch {
                toast.error("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setCategoryOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setCategoryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
            <nav>
                <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                    <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-row md:justify-start">
                        <Link href="/" className="w-28">
                            <Image src="/img/news-logo.png" alt="logo" width={132} height={52} />
                        </Link>
                        <Link href="/" className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500">
                            Home
                        </Link>
                        <div ref={dropdownRef} className="relative inline-block text-left">
                            <button
                                id={id}
                                type="button"
                                aria-expanded={categoryOpen}
                                aria-haspopup="menu"
                                onClick={() => setCategoryOpen((prev) => !prev)}
                                className="inline-flex w-full justify-center items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 focus:outline-none"
                            >
                                Category
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className={`-mr-1 size-5 text-gray-400 transition-transform duration-150 ${categoryOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {categoryOpen && (
                                <div
                                    role="menu"
                                    aria-labelledby={id}
                                    className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                                >
                                    <div className="py-1">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                role="menuitem"
                                                href={`/category/${category.id}`}
                                                onClick={() => setCategoryOpen(false)}
                                                className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-500"
                                            >
                                                {category.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/" className="md:hidden w-28">
                            <Image src="/img/news-logo.png" alt="logo" width={132} height={52} />
                        </Link>

                        <Button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="ml-auto bg-transparent rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:bg-transparent hover:bg-transparent focus:outline-none md:hidden"
                        >
                            {menuOpen ? <X /> : <Menu color="#949494" />}
                        </Button>
                    </div>
                    {menuOpen && (
                        <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                            {categories.map((category) => (
                                <Link
                                    href={`/category/${category.id}`}
                                    key={category.id}
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
