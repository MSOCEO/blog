import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "叙溯 Xusu";
const siteDesc =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "记录思考，分享技术，探索世界。";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://msoceo.github.io";
const basePath = process.env.BASE_PATH || "/blog";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  metadataBase: new URL(siteUrl),

  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}${basePath}/rss.xml`,
    },
  },

  openGraph: {
    title: siteName,
    description: siteDesc,
    url: siteUrl + basePath,
    siteName,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${basePath}/og-default.svg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: [`${basePath}/og-default.svg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteName}
          href={`${basePath}/rss.xml`}
        />
      </head>
      <body>
        <Header />
        <main
          style={{
            maxWidth: "var(--max-width-wide)",
            margin: "0 auto",
            padding: "var(--space-2xl) var(--space-xl)",
            minHeight: "calc(100vh - var(--header-height))",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
