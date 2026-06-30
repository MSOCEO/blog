import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { calculateReadingTime, getPostBySlug } from "@/lib/content";
import type { ContentType, PostData } from "@/lib/types";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "wrap",
    properties: {
      className: ["heading-anchor"],
    },
  })
  .use(rehypeStringify);

export async function renderMarkdown(mdContent: string): Promise<string> {
  const result = await processor.process(mdContent);
  return String(result);
}

export async function getPostData(
  slug: string,
  type: ContentType = "post"
): Promise<PostData | null> {
  const post = getPostBySlug(slug, type);
  if (!post) return null;

  const html = await renderMarkdown(post.content);
  const readingTime = calculateReadingTime(post.content);

  return {
    meta: {
      ...post.meta,
      contentType: type as "post",
      readingTime,
    } as import("@/lib/types").PostMeta,
    html,
  };
}

// 导出统一处理器供 external 使用
export { processor };
