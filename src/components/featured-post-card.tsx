import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Content } from "@/model/Content";

interface PostCardProps {
    content: Content;
}

export function FeaturedPostCard({ content }: PostCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
                <Link
                    className="relative block aspect-video"
                    href={`/content-all/detail/${content.id}`}
                >
                    {content.image && (
                        <Image
                            src={content.image}
                            alt={content.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-all"
                        />
                    )}
                </Link>
            </div>
            <div>
                <div className="flex gap-3 mt-5">
                    <Link href={`/category/${content.category_id}`}>
            <span className="inline-block text-sm font-medium tracking-wider uppercase text-blue-600">
              {content.category_name}
            </span>
                    </Link>
                </div>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight mt-2">
                    <Link href={`/content-all/detail/${content.id}`}>
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-left-center bg-no-repeat transition-all duration-300 bg-[length:0%_70%] hover:bg-[length:100%_70%]">
              {content.title}
            </span>
                    </Link>
                </h2>
                <div className="mt-3 flex items-center space-x-3 text-gray-500">
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
                    <span className="text-xs text-gray-300">•</span>
                    <time
                        dateTime={content.created_at}
                        className="truncate text-sm"
                    >
                        {format(new Date(content.created_at), "MMMM d, y", { locale: enUS })}
                    </time>
                </div>
                {content.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{content.excerpt}</p>
                )}
                {content.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {content.tags.split(',').map(tag => {
                            const t = tag.trim();
                            if (!t) return null;
                            return (
                                <span key={t} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">#{t}</span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
