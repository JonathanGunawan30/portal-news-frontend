export function ContentDetailSkeleton() {
    return (
        <div>
            <div className="container px-8 mx-auto xl:px-5 max-w-screen py-5 lg:py-8 !pt-0">
                <div className="mx-auto max-w-screen-md">
                    <div className="flex justify-center mt-5">
                        <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                    </div>
                    <div className="space-y-3 mt-2 mb-3">
                        <div className="h-8 lg:h-10 bg-gray-300 rounded-md w-4/5 mx-auto animate-pulse"></div>
                    </div>
                </div>
                <div className="mt-3 flex justify-center space-x-3">
                    <div className="h-5 bg-gray-200 rounded-md w-40 animate-pulse"></div>
                </div>
            </div>

            <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            </div>

            <div className="container px-8 mx-auto xl:px-5 max-w-screen py-5 lg:py-8">
                <article className="mx-auto max-w-screen-md">
                    <div className="prose mx-auto my-3 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                    <div className="mb-7 mt-7 flex justify-center">
                        <div className="h-10 bg-gray-200 rounded-full w-36 animate-pulse"></div>
                    </div>
                </article>
            </div>
        </div>
    );
}