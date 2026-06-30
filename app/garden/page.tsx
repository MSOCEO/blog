import { Metadata } from "next";
import { getAllGardens } from "@/lib/content";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getTagColor } from "@/lib/utils";

export const metadata: Metadata = {
  title: "花园",
};

export default function GardenPage() {
  const { items: gardens } = getAllGardens();

  return (
    <div>
      <h1
        style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 700,
          marginBottom: "var(--space-xl)",
          color: "var(--text-primary)",
        }}
      >
        花园
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        思考、随笔与长篇
      </p>

      {gardens.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "var(--space-lg)",
          }}
        >
          {gardens.map((garden) => (
            <Link
              key={garden.slug}
              href={`/blog/garden/${garden.slug}/`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <h2
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "0 0 var(--space-sm) 0",
                    lineHeight: 1.35,
                  }}
                >
                  {garden.title}
                </h2>
                {garden.description && (
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-sm)",
                      lineHeight: 1.6,
                      margin: "0 0 var(--space-md) 0",
                    }}
                  >
                    {garden.description}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "var(--space-sm)",
                  }}
                >
                  <time
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    {formatDate(garden.date)}
                  </time>
                  {garden.category && (
                    <span
                      style={{
                        color: "var(--color-green)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 500,
                      }}
                    >
                      {garden.category}
                    </span>
                  )}
                </div>
                {garden.tags && garden.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-xs)",
                      flexWrap: "wrap",
                      marginTop: "var(--space-md)",
                    }}
                  >
                    {garden.tags.map((tag, i) => (
                      <Badge key={tag} color={getTagColor(i)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-4xl)",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-md)" }}>
            🌿
          </p>
          <p>花园还没种下种子</p>
        </div>
      )}
    </div>
  );
}
