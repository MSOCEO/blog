import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData } from "@/lib/markdown";
import { PostMetaInfo } from "@/components/blog/post-meta";
import { Card } from "@/components/ui/card";
import type { PostMeta } from "@/lib/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

function getGardenSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "garden");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data } = matter(raw);
      if (data.draft === true) return null;
      return path.basename(f, ".md");
    })
    .filter((s): s is string => s !== null);
}

export async function generateStaticParams() {
  return getGardenSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", "garden", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: "404" };
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    title: data.title || slug,
    description: data.description || undefined,
  };
}

export default async function GardenDetailPage({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug, "garden");

  if (!postData) notFound();

  const { meta, html } = postData;

  return (
    <div style={{ maxWidth: "var(--max-width-content)", margin: "0 auto" }}>
      <article>
        <Card hover={false}>
          {meta.coverImage && (
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <img
                src={meta.coverImage}
                alt={meta.title}
                style={{
                  width: "100%",
                  borderRadius: "var(--radius-lg)",
                  maxHeight: 400,
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              marginBottom: "var(--space-md)",
            }}
          >
            <span
              style={{
                background: "var(--color-green-dim)",
                color: "var(--color-green)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: "var(--radius-full)",
              }}
            >
              花园
            </span>
          </div>

          <h1
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              lineHeight: 1.3,
              margin: "0 0 var(--space-md) 0",
              color: "var(--text-primary)",
            }}
          >
            {meta.title}
          </h1>

          <div style={{ marginBottom: "var(--space-xl)" }}>
            <PostMetaInfo meta={meta as unknown as PostMeta} showDescription={false} />
          </div>

          {meta.description && (
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-lg)",
                lineHeight: 1.6,
                marginBottom: "var(--space-xl)",
                padding: "var(--space-lg)",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                borderLeft: "3px solid var(--color-green)",
              }}
            >
              {meta.description}
            </p>
          )}

          <div
            className="theme-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      </article>
    </div>
  );
}
