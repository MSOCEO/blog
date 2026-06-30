import { Metadata } from "next";
import { getAllMurmurs } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { formatDate, getTagColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MurmurMeta } from "@/lib/types";

export const metadata: Metadata = {
  title: "碎念",
};

export default function MurmursPage() {
  const { items: murmurs } = getAllMurmurs();

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
        碎念
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        日常微言碎语
      </p>

      {murmurs.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-lg)",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          {murmurs.map((murmur) => (
            <Card key={murmur.slug}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                <time
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  {formatDate(murmur.date)}
                </time>
                {(murmur as unknown as MurmurMeta).location && (
                  <span
                    style={{
                      color: "var(--color-green)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    📍 {(murmur as unknown as MurmurMeta).location}
                  </span>
                )}
                {(murmur as unknown as MurmurMeta).mood && (
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    {(murmur as unknown as MurmurMeta).mood}
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {murmur.description || murmur.title}
              </p>
            </Card>
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
            💭
          </p>
          <p>还没有碎念，说点什么吧</p>
        </div>
      )}
    </div>
  );
}
