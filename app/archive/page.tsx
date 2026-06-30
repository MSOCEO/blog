import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { getYear } from "@/lib/utils";

export const metadata: Metadata = {
  title: "归档",
};

export default function ArchivePage() {
  const { items: posts } = getAllPosts();

  // Group by year
  const grouped = new Map<string, typeof posts>();
  for (const post of posts) {
    const year = getYear(post.date);
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(post);
  }

  const years = Array.from(grouped.entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

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
        归档
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        共 {posts.length} 篇文章
      </p>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {years.map(([year, yearPosts]) => (
          <div key={year} style={{ marginBottom: "var(--space-2xl)" }}>
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: "var(--space-lg)",
              }}
            >
              {year}
            </h2>

            <div className="theme-timeline">
              {yearPosts.map((post) => (
                <div
                  key={post.slug}
                  style={{
                    position: "relative",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  <div className="theme-timeline-dot" />
                  <Link
                    href={`/posts/${post.slug}/`}
                    className="archive-link"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "var(--radius-md)",
                      padding: "var(--space-md) var(--space-lg)",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "var(--text-xs)",
                        display: "inline-block",
                        marginRight: "var(--space-md)",
                        minWidth: 45,
                      }}
                    >
                      {new Date(post.date).toLocaleDateString("zh-CN", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                    <span
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {post.title}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .archive-link:hover {
          border-color: var(--color-accent) !important;
          background: var(--bg-card-hover) !important;
        }
      `}</style>
    </div>
  );
}
