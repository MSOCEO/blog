/**
 * RSS 2.0 生成脚本
 *
 * 由于 output: 'export' 不支持 API Route，需要在 build 后运行此脚本。
 * 用法：npx tsx scripts/generate-rss.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

function normalizeDate(date: unknown): string {
  if (!date) return new Date().toUTCString();
  if (date instanceof Date) return date.toUTCString();
  if (typeof date === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(date + "T00:00:00+08:00").toUTCString();
    }
    return new Date(date).toUTCString();
  }
  return new Date().toUTCString();
}

function generateRSS() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "叙溯 Xusu";
  const siteDesc =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "记录思考，分享技术，探索世界。";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://msoceo.github.io";
  const basePath = process.env.BASE_PATH || "/blog";
  const fullUrl = siteUrl + basePath;

  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) {
    console.log("No posts directory found, skipping RSS generation.");
    return;
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  const items: FeedItem[] = [];

  for (const file of files.slice(0, 20)) {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = matter(raw);

    if (data.draft === true) continue;

    const slug = path.basename(file, ".md");
    const description =
      data.description || content.slice(0, 200).replace(/\n/g, " ") + "...";

    items.push({
      title: data.title || slug,
      link: `${fullUrl}/posts/${slug}/`,
      description,
      pubDate: normalizeDate(data.date),
      guid: `${fullUrl}/posts/${slug}/`,
    });
  }

  const now = new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <link>${fullUrl}</link>
    <description><![CDATA[${siteDesc}]]></description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Xusu v2.0</generator>
    <atom:link href="${fullUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "rss.xml"), rss, "utf-8");
  console.log(`RSS feed generated → out/rss.xml (${items.length} items)`);
}

generateRSS();
