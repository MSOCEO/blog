// ===== 叙溯 Xusu v2.0 — 类型定义 =====

export type ContentType = "post" | "murmur" | "garden";

export interface ContentMeta {
  slug: string;
  title: string;
  date: string; // ISO 8601
  updated?: string;
  description?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  coverImage?: string;
}

export interface PostMeta extends ContentMeta {
  contentType: "post";
  readingTime?: string;
}

export interface MurmurMeta extends ContentMeta {
  contentType: "murmur";
  location?: string;
  mood?: string;
}

export interface GardenMeta extends ContentMeta {
  contentType: "garden";
}

export type AnyContentMeta = PostMeta | MurmurMeta | GardenMeta;

export interface TagCount {
  name: string;
  count: number;
}

export interface CategoryCount {
  name: string;
  count: number;
  slug: string;
}

export interface ContentCollection<T extends ContentMeta> {
  items: T[];
  tags: TagCount[];
  categories: CategoryCount[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: string;
  email?: string;
  avatar?: string;
  postsPerPage: number;
  theme: string;
  social?: {
    github?: string;
    twitter?: string;
  };
}

export interface PostData {
  meta: PostMeta;
  html: string;
}
