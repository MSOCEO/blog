import { Metadata } from "next";
import { getAllPosts, paginate } from "@/lib/content";
import { PostList } from "@/components/blog/post-list";
import { getSiteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "文章",
};

export default function PostsPage() {
  const config = getSiteConfig();
  const { items } = getAllPosts();
  const { items: posts } = paginate(items, 1, config.postsPerPage);

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
        文章
      </h1>
      <PostList
        posts={posts}
        currentPage={1}
        totalPages={Math.ceil(items.length / config.postsPerPage)}
      />
    </div>
  );
}
