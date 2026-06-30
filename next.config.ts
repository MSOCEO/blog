import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 静态导出 —— 避免 Serverless Function 502
  output: "export",
  distDir: "out",

  // vercel.json redirects 处理跳转到 msoceo.pages.dev
};

export default nextConfig;
