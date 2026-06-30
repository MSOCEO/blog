import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "友链",
};

interface Friend {
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

const FRIENDS: Friend[] = [
  {
    name: "示例友链",
    url: "https://example.com",
    description: "一个示例友链描述",
  },
];

export default function FriendsPage() {
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
        友链
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        我的朋友们
      </p>

      {FRIENDS.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-lg)",
          }}
        >
          {FRIENDS.map((friend) => (
            <a
              key={friend.url}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-md)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-full)",
                      background: "var(--color-accent-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {friend.name[0]}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {friend.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "var(--text-sm)",
                        margin: 0,
                      }}
                    >
                      {friend.description}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
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
            🤝
          </p>
          <p>暂无友链</p>
          <p style={{ fontSize: "var(--text-sm)" }}>
            编辑 <code style={{
              background: "var(--bg-card-alt)",
              padding: "2px 6px",
              borderRadius: "var(--radius-sm)",
            }}>app/(blog)/friends/page.tsx</code> 添加友链
          </p>
        </div>
      )}
    </div>
  );
}
