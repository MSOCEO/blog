import { MetadataRoute } from "next";
import { getAllPosts, getAllGardens, getAllMurmurs } from "@/lib/content";
import { getSiteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();
  const baseUrl = config.url + (process.env.BASE_PATH || "");

  const { items: posts } = getAllPosts();
  const { items: gardens } = getAllGardens();
  const { items: murmurs } = getAllMurmurs();

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/posts/`, priority: 0.9 },
    { url: `${baseUrl}/archive/`, priority: 0.8 },
    { url: `${baseUrl}/tags/`, priority: 0.7 },
    { url: `${baseUrl}/garden/`, priority: 0.7 },
    { url: `${baseUrl}/murmurs/`, priority: 0.6 },
    { url: `${baseUrl}/friends/`, priority: 0.5 },
    { url: `${baseUrl}/about/`, priority: 0.5 },
  ];

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}/`,
    lastModified: new Date(post.updated || post.date),
    priority: 0.7 as const,
  }));

  const gardenPages = gardens.map((g) => ({
    url: `${baseUrl}/garden/${g.slug}/`,
    lastModified: new Date(g.updated || g.date),
    priority: 0.5 as const,
  }));

  const murmurPages = murmurs.map((m) => ({
    url: `${baseUrl}/murmurs/${m.slug}/`,
    lastModified: new Date(m.date),
    priority: 0.4 as const,
  }));

  return [
    ...staticPages.map((p) => ({
      ...p,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
    })),
    ...postPages.map((p) => ({
      ...p,
      changeFrequency: "weekly" as const,
    })),
    ...gardenPages.map((p) => ({
      ...p,
      changeFrequency: "monthly" as const,
    })),
    ...murmurPages.map((p) => ({
      ...p,
      changeFrequency: "monthly" as const,
    })),
  ];
}
