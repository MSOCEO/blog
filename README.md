# 叙溯 Xusu v2.0

**mrzym.top 博客结构 + koel.dev 深色质感 = 混合主题静态博客引擎**

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15.5 + React 19 |
| 样式 | Tailwind CSS 4 + CSS 变量体系 |
| 内容 | gray-matter (YAML frontmatter) + unified/remark/rehype (Markdown → HTML) |
| 部署 | `output: "export"` 静态导出 → GitHub Pages |
| 辅助 | date-fns (日期), feed (RSS), tsx (脚本) |

## 项目结构

```
blog-v2/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 根布局 (Header + Footer + SEO)
│   ├── page.tsx          # 首页
│   ├── not-found.tsx     # 404 页面
│   ├── robots.ts         # robots.txt
│   ├── sitemap.ts        # sitemap.xml
│   ├── posts/            # 文章列表 + [slug] 详情
│   ├── archive/          # 归档时间轴
│   ├── tags/             # 标签云 + [tag] 筛选
│   ├── garden/           # 数字花园 + [slug] 详情
│   ├── murmurs/          # 碎念 + [slug] 详情
│   ├── about/            # 关于页
│   └── friends/          # 友链
├── components/
│   ├── ui/               # 基础 UI: Button, Card, Badge, Avatar
│   ├── layout/           # 布局: Header, Nav, Footer, ThemeToggle
│   ├── blog/             # 博客: PostCard, PostList, PostMeta, Toc, TagList, Pager
│   └── mdx/              # MDX 自定义组件 (预留)
├── content/              # Markdown 内容
│   ├── posts/            # 文章 (post)
│   ├── murmurs/          # 碎念 (murmur)
│   └── garden/           # 花园 (garden)
├── lib/
│   ├── types.ts          # TypeScript 类型定义
│   ├── config.ts         # 站点配置读取
│   ├── content.ts        # 内容扫描 + frontmatter 解析
│   ├── markdown.ts       # Markdown → HTML 管线
│   └── utils.ts          # 工具函数
├── themes/aurora/        # 极光 Aurora 主题
│   ├── variables.css     # CSS 变量定义
│   └── globals.css       # 全局样式
├── scripts/
│   └── generate-rss.ts   # RSS 2.0 生成脚本
├── public/
│   └── og-default.svg    # 默认 OG 图片
├── next.config.ts        # 含 basePath + output:export
└── package.json
```

## 设计语言 — 极光 Aurora

| 维度 | 值 |
|------|-----|
| 背景 | `#080810` 深海黑 |
| 卡片背景 | `rgba(255, 255, 255, 0.03)` 半透明 |
| 卡片悬浮 | `rgba(255, 255, 255, 0.06)` |
| 强调色一 | `#E91E8C` 品红 (按钮/链接高亮) |
| 强调色二 | `#4ADE80` 青绿 (花园/成功标记) |
| 正文字色 | `#f1f5f9` 浅灰白 |
| 次要字色 | `#94a3b8` 中灰 |
| 导航栏 | `backdrop-filter: blur(20px)` 毛玻璃 |
| 圆角 | `12px` 卡片 / `8px` 按钮 / `9999px` 标签 |
| 字体 | system-ui 优先，中文优化 |

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式 (localhost:3000)
npm run dev

# 生产构建 + RSS 生成
npm run build

# 仅生成 RSS
npm run rss
```

## 内容写作

在 `content/posts/` 下创建 `.md` 文件，YAML frontmatter 格式：

```yaml
---
title: "文章标题"
date: "2026-06-30"
description: "文章描述，用于 SEO 和列表展示"
tags: ["标签1", "标签2"]
category: "分类"
coverImage: "/images/cover.webp"
draft: false
---
```

`draft: true` 的文章在构建时会被跳过。

## 部署

```bash
npm run build   # 生成 out/ 目录
# out/ 目录内容推送到 GitHub Pages (gh-pages 分支)
```

需要在 GitHub 仓库 Settings > Pages 中开启 GitHub Pages，选择 `gh-pages` 分支。

## 页面清单

| 页面 | URL | 类型 |
|------|-----|------|
| 首页 | `/` | 静态 |
| 文章列表 | `/posts/` | 静态 |
| 文章详情 | `/posts/[slug]/` | SSG |
| 归档 | `/archive/` | 静态 |
| 标签云 | `/tags/` | 静态 |
| 标签筛选 | `/tags/[tag]/` | SSG |
| 花园 | `/garden/` | 静态 |
| 花园详情 | `/garden/[slug]/` | SSG |
| 碎念 | `/murmurs/` | 静态 |
| 碎念详情 | `/murmurs/[slug]/` | SSG |
| 关于 | `/about/` | 静态 |
| 友链 | `/friends/` | 静态 |
| RSS | `/rss.xml` | 构建生成 |
| Sitemap | `/sitemap.xml` | 构建生成 |
| Robots | `/robots.txt` | 构建生成 |

## License

MIT
