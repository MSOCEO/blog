import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ContentMeta,
  ContentType,
  PostMeta,
  MurmurMeta,
  GardenMeta,
  AnyContentMeta,
  ContentCollection,
  TagCount,
  CategoryCount,
} from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function contentDir(type: ContentType): string {
  return path.join(CONTENT_ROOT, type === "post" ? "posts" : `${type}s`);
}

// ===== 文件扫描 =====

function scanFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f));
}

function parseFrontmatter<T extends ContentMeta>(
  filePath: string,
  contentType: ContentType
): T | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    // 草稿跳过
    if (data.draft === true) return null;

    const slug = path.basename(filePath, ".md");
    const date = normalizeDate(data.date);

    return {
      slug,
      title: data.title || slug,
      date,
      updated: data.updated ? normalizeDate(data.updated) : undefined,
      description: data.description || undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || undefined,
      draft: data.draft || false,
      coverImage: data.coverImage || undefined,
      contentType,
    } as unknown as T;
  } catch {
    return null;
  }
}

function normalizeDate(date: unknown): string {
  if (!date) return new Date().toISOString();
  if (date instanceof Date) return date.toISOString();
  if (typeof date === "string") {
    // YYYY-MM-DD → ISO 8601
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(date + "T00:00:00+08:00").toISOString();
    }
    return new Date(date).toISOString();
  }
  return new Date().toISOString();
}

// ===== 内容读取 =====

export function getAllPosts(): ContentCollection<PostMeta> {
  return getCollection<PostMeta>("post");
}

export function getAllMurmurs(): ContentCollection<MurmurMeta> {
  return getCollection<MurmurMeta>("murmur");
}

export function getAllGardens(): ContentCollection<GardenMeta> {
  return getCollection<GardenMeta>("garden");
}

function getCollection<T extends AnyContentMeta>(
  type: ContentType
): ContentCollection<T> {
  const dir = contentDir(type);
  const files = scanFiles(dir);

  const items = files
    .map((f) => parseFrontmatter<T>(f, type))
    .filter((item): item is T => item !== null)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const tagMap = new Map<string, number>();
  const categoryMap = new Map<string, number>();

  for (const item of items) {
    for (const tag of item.tags || []) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
    if (item.category) {
      categoryMap.set(
        item.category,
        (categoryMap.get(item.category) || 0) + 1
      );
    }
  }

  const tags: TagCount[] = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const categories: CategoryCount[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count);

  return { items, tags, categories };
}

// ===== 单篇文章 =====

export function getPostBySlug(
  slug: string,
  type: ContentType = "post"
): { meta: AnyContentMeta; content: string } | null {
  const typeDir = type === "post" ? "posts" : `${type}s`;
  const filePath = path.join(CONTENT_ROOT, typeDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (data.draft === true && process.env.NODE_ENV !== "development") {
      return null;
    }

    const meta: AnyContentMeta = {
      slug,
      title: data.title || slug,
      date: normalizeDate(data.date),
      updated: data.updated ? normalizeDate(data.updated) : undefined,
      description: data.description || undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || undefined,
      draft: data.draft || false,
      coverImage: data.coverImage || undefined,
      contentType: type,
    };

    return { meta, content };
  } catch {
    return null;
  }
}

// ===== 阅读时间 =====

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 300; // 中文字数
  const chars = text.replace(/\s/g, "").length;
  const minutes = Math.max(1, Math.ceil(chars / wordsPerMinute));
  return `${minutes} min`;
}

// ===== 全部标签 =====

export function getAllTags(): TagCount[] {
  const posts = getAllPosts();
  const garden = getAllGardens();
  const murmurs = getAllMurmurs();

  const tagMap = new Map<string, number>();

  for (const col of [posts, garden, murmurs]) {
    for (const tag of col.tags) {
      tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + tag.count);
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// ===== 分页 =====

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const slice = items.slice(start, start + perPage);

  return { items: slice, currentPage: safePage, totalPages, totalItems };
}
