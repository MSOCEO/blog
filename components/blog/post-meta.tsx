import { PostMeta as PostMetaType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getTagColor } from "@/lib/utils";

interface PostMetaProps {
  meta: PostMetaType;
  showDescription?: boolean;
}

export function PostMetaInfo({ meta, showDescription = true }: PostMetaProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-md)",
          marginBottom: "var(--space-sm)",
          flexWrap: "wrap",
        }}
      >
        {meta.category && (
          <span
            style={{
              color: "var(--color-accent)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
            }}
          >
            {meta.category}
          </span>
        )}
        <time
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-xs)",
          }}
          dateTime={meta.date}
        >
          {formatDate(meta.date)}
        </time>
        {meta.readingTime && (
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-xs)",
            }}
          >
            {meta.readingTime}
          </span>
        )}
      </div>
      {showDescription && meta.description && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.6,
            margin: "var(--space-sm) 0",
          }}
        >
          {meta.description}
        </p>
      )}
      {meta.tags && meta.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "var(--space-xs)",
            flexWrap: "wrap",
            marginTop: "var(--space-sm)",
          }}
        >
          {meta.tags.map((tag, i) => (
            <Badge key={tag} color={getTagColor(i)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
