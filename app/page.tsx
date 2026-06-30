import { getSiteConfig } from "@/lib/config";

export default function HomePage() {
  const config = getSiteConfig();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          {config.name}
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          {config.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/posts/"
            style={{
              background: "var(--color-accent)",
              color: "white",
              padding: "12px 28px",
              borderRadius: "var(--radius-button)",
              fontWeight: 600,
            }}
          >
            文章列表
          </a>
          <a
            href="/archive/"
            style={{
              border: "1px solid var(--border-default)",
              padding: "12px 28px",
              borderRadius: "var(--radius-button)",
              fontWeight: 600,
            }}
          >
            归档
          </a>
          <a
            href="/about/"
            style={{
              border: "1px solid var(--border-default)",
              padding: "12px 28px",
              borderRadius: "var(--radius-button)",
              fontWeight: 600,
            }}
          >
            关于
          </a>
        </div>
      </div>
    </main>
  );
}
