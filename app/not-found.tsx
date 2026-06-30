import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="text-8xl font-bold mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          404
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
          页面不存在或已移除
        </p>
        <Link
          href="/"
          style={{
            background: "var(--color-accent)",
            color: "white",
            padding: "12px 28px",
            borderRadius: "var(--radius-button)",
            fontWeight: 600,
          }}
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
