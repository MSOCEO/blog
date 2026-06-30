import { Metadata } from "next";
import { getAllTags } from "@/lib/content";
import { TagList } from "@/components/blog/tag-list";

export const metadata: Metadata = {
  title: "标签",
};

export default function TagsPage() {
  const tags = getAllTags();

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
        标签
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        共 {tags.length} 个标签
      </p>
      <TagList tags={tags} />
    </div>
  );
}
