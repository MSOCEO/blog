import Link from "next/link";
import { TagCount } from "@/lib/types";
import { getTagColor } from "@/lib/utils";

interface TagListProps {
  tags: TagCount[];
  maxSize?: number;
}

export function TagList({ tags, maxSize = 60 }: TagListProps) {
  if (tags.length === 0) {
    return (
      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
        暂无标签
      </p>
    );
  }

  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-sm)",
      }}
    >
      {tags.map((tag, i) => {
        const size =
          Math.max(12, (tag.count / maxCount) * maxSize) + 2;

        return (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}/`}
            className="theme-tag"
            style={{
              fontSize: `${size}px`,
              background: `${getTagColor(i)}22`,
              color: getTagColor(i),
              padding: "6px 14px",
              textDecoration: "none",
            }}
          >
            {tag.name}
            <span
              style={{
                marginLeft: "4px",
                opacity: 0.7,
                fontSize: `${size * 0.75}px`,
              }}
            >
              {tag.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
