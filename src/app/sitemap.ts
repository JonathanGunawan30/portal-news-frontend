import { MetadataRoute } from "next";
import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://blog.jonathangunawan.com";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fe/contents?per_page=100`, {
        next: { revalidate: 3600 },
    });
    const json: ApiResponse<Content[]> = await res.json();
    const contents = json.data ?? [];

    const contentUrls = contents.map((content) => ({
        url: `${baseUrl}/content-all/detail/${content.id}`,
        lastModified: new Date(content.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/content-all`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...contentUrls,
    ];
}