import { PostMeta } from "@/lib/types";
import { PostCard } from "./post-card";
import { Pager } from "./pager";

interface PostListProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function PostList({
  posts,
  currentPage,
  totalPages,
  basePath = "/posts",
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "var(--space-4xl) var(--space-xl)",
          color: "var(--text-muted)",
        }}
      >
        <p style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-md)" }}>
          📝
        </p>
        <p>还没有文章</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg)",
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath}
          />
        </div>
      )}
    </div>
  );
}
