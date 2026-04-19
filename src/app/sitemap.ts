import { MetadataRoute } from "next";
import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://blog.jonathangunawan.com";

    let contentUrls: MetadataRoute.Sitemap = [];

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/fe/contents?per_page=100`, {
            next: { revalidate: 3600 },
        });
        if (res.ok) {
            const json: ApiResponse<Content[]> = await res.json();
            const contents = json.data ?? [];
            contentUrls = contents.map((content) => ({
                url: `${baseUrl}/content-all/detail/${content.id}`,
                lastModified: new Date(content.created_at),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            }));
        }
    } catch (err) {
        console.error("Failed to fetch contents for sitemap:", err);
    }

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