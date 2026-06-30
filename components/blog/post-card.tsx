import Link from "next/link";
import { PostMeta } from "@/lib/types";
import { PostMetaInfo } from "./post-meta";
import { Card } from "@/components/ui/card";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <Link
        href={`/posts/${post.slug}/`}
        style={{
          textDecoration: "none",
          display: "block",
        }}
      >
        <h2
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 var(--space-sm) 0",
            lineHeight: 1.35,
            transition: "color var(--transition-fast)",
          }}
          className="hover-color-accent"
        >
          {post.title}
        </h2>
        <PostMetaInfo meta={post} />
      </Link>
      <style>{`
        .hover-color-accent:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
    </Card>
  );
}
