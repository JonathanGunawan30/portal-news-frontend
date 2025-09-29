import { PostCardSkeleton } from "./post-card-skeleton";

export function HomeSkeleton() {
    return (
        <div>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                {Array.from({ length: 2 }).map((_, index) => (
                    <PostCardSkeleton key={`top-${index}`} />
                ))}
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <PostCardSkeleton key={`bottom-${index}`} />
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
}