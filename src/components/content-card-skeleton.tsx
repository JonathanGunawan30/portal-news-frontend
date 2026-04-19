"use client";

import { cn } from "@/lib/utils";

export function ContentCardSkeleton() {
    return (
        <div className="flex flex-col">
            {/* Image Placeholder */}
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-zinc-200 animate-pulse" />
            
            <div className="flex flex-col">
                {/* Category Placeholder */}
                <div className="mt-5 h-4 w-20 rounded bg-zinc-200 animate-pulse" />
                
                {/* Title Placeholder */}
                <div className="mt-2 space-y-2">
                    <div className="h-6 w-full rounded bg-zinc-200 animate-pulse" />
                    <div className="h-6 w-2/3 rounded bg-zinc-200 animate-pulse" />
                </div>
                
                {/* Meta Placeholder (Author & Date) */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-5 w-5 shrink-0 rounded-full bg-zinc-200 animate-pulse" />
                    <div className="h-4 w-16 rounded bg-zinc-200 animate-pulse" />
                    <span className="text-xs text-gray-300">•</span>
                    <div className="h-4 w-24 rounded bg-zinc-200 animate-pulse" />
                </div>
            </div>
        </div>
    );
}
