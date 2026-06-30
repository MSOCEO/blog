import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllGardens, getAllTags } from "@/lib/content";
import { PostCard } from "@/components/blog/post-card";
import { Card } from "@/components/ui/card";
import { PostMeta } from "@/lib/types";

interface Props {
  params: Promise<{ tag: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签: ${decodeURIComponent(tag)}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);

  const { items: posts } = getAllPosts();
  const { items: gardens } = getAllGardens();

  const matched = [...posts, ...gardens].filter(
    (item) => (item as unknown as PostMeta).tags?.includes(tagName)
  );

  if (matched.length === 0) notFound();

  return (
    <div>
      <h1
        style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 700,
          marginBottom: "var(--space-sm)",
          color: "var(--text-primary)",
        }}
      >
        标签:{" "}
        <span style={{ color: "var(--color-accent)" }}>{tagName}</span>
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-xl)",
        }}
      >
        {matched.length} 篇文章
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg)",
        }}
      >
        {matched.map((item) => (
          <PostCard key={item.slug} post={item as unknown as PostMeta} />
        ))}
      </div>
    </div>
  );
}
