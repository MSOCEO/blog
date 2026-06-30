import { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const baseUrl = config.url + (process.env.BASE_PATH || "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
