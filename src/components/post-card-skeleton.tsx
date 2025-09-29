export function PostCardSkeleton() {
    return (
        <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-md bg-gray-200 aspect-video animate-pulse">
            </div>
            <div>
                <div className="h-4 bg-gray-200 rounded-md w-20 mt-5 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-md w-full mt-2 animate-pulse"></div>
                <div className="mt-3 flex items-center space-x-3">
                    <div className="h-5 w-5 flex-shrink-0 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                    <span className="text-xs text-gray-300">•</span>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}