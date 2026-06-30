import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/content";
import { getPostData } from "@/lib/markdown";
import { PostMetaInfo } from "@/components/blog/post-meta";
import { Toc } from "@/components/blog/toc";
import { Card } from "@/components/ui/card";
import type { PostMeta } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const { items } = getAllPosts();
  return items.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { items } = getAllPosts();
  const post = items.find((p) => p.slug === slug);
  if (!post) return { title: "404" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://msoceo.github.io";
  const basePath = process.env.BASE_PATH || "/blog";
  const ogImage = post.coverImage || `${basePath}/og-default.svg`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [process.env.NEXT_PUBLIC_AUTHOR || "MSOCEO"],
      tags: post.tags,
      url: `${siteUrl}${basePath}/posts/${slug}/`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug, "post");

  if (!postData) notFound();

  const { meta, html } = postData;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 220px",
        gap: "var(--space-2xl)",
        alignItems: "start",
      }}
    >
      <article>
        <Card hover={false}>
          {/* Cover Image */}
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

          {/* Title */}
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

          {/* Meta */}
          <div style={{ marginBottom: "var(--space-xl)" }}>
            <PostMetaInfo meta={meta as unknown as PostMeta} showDescription={false} />
          </div>

          {/* Description */}
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
                borderLeft: "3px solid var(--color-accent)",
              }}
            >
              {meta.description}
            </p>
          )}

          {/* Content */}
          <div
            className="theme-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      </article>

      {/* Sidebar TOC */}
      <aside className="hidden lg:block">
        <Toc html={html} />
      </aside>
    </div>
  );
}
