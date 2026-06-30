import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMurmurs } from "@/lib/content";
import { getPostData } from "@/lib/markdown";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getTagColor } from "@/lib/utils";
import { MurmurMeta } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const { items } = getAllMurmurs();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { items } = getAllMurmurs();
  const item = items.find((p) => p.slug === slug);
  if (!item) return { title: "404" };

  return {
    title: item.title || "碎念",
    description: item.description,
  };
}

export default async function MurmurDetailPage({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug, "murmur");

  if (!postData) notFound();

  const { meta, html } = postData;
  const murmurMeta = meta as unknown as MurmurMeta;

  return (
    <div style={{ maxWidth: "var(--max-width-content)", margin: "0 auto" }}>
      <Card hover={false}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
            marginBottom: "var(--space-lg)",
            flexWrap: "wrap",
          }}
        >
          <time
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            {formatDate(murmurMeta.date)}
          </time>
          {murmurMeta.location && (
            <span
              style={{
                color: "var(--color-green)",
                fontSize: "var(--text-sm)",
              }}
            >
              📍 {murmurMeta.location}
            </span>
          )}
          {murmurMeta.mood && (
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-sm)",
              }}
            >
              {murmurMeta.mood}
            </span>
          )}
        </div>

        <div
          className="theme-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Card>
    </div>
  );
}
