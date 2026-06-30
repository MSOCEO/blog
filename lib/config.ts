import { SiteConfig } from "@/lib/types";

export function getSiteConfig(): SiteConfig {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "叙溯 Xusu",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "记录思考，分享技术，探索世界。",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://msoceo.github.io",
    author: process.env.NEXT_PUBLIC_AUTHOR || "MSOCEO",
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "",
    postsPerPage: parseInt(
      process.env.NEXT_PUBLIC_POSTS_PER_PAGE || "9",
      10
    ),
    theme: process.env.NEXT_PUBLIC_THEME || "aurora",
    social: {
      github: "https://github.com/MSOCEO",
    },
  };
}
