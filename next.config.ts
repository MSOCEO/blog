import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel — 原生 SSR/SSG，next.config.ts redirects() 生效
  // Netlify / GitHub Pages — 由 vercel.json / netlify.toml / public/ 内文件处理重定向
};

export default nextConfig;
