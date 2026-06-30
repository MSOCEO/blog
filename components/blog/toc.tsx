"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    items.push({
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
      level: parseInt(match[1]),
    });
  }

  return items;
}

interface TocProps {
  html: string;
}

export function Toc({ html }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractToc(html);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      style={{
        position: "sticky",
        top: "calc(var(--header-height) + var(--space-xl))",
        paddingLeft: "var(--space-lg)",
        borderLeft: "1px solid var(--border-default)",
      }}
    >
      <p
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          color: "var(--text-muted)",
          marginBottom: "var(--space-md)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        目录
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
        }}
      >
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${h.id}`}
              style={{
                display: "block",
                paddingLeft: h.level === 3 ? "var(--space-lg)" : "0",
                fontSize: "var(--text-xs)",
                color:
                  activeId === h.id
                    ? "var(--color-accent)"
                    : "var(--text-muted)",
                fontWeight: activeId === h.id ? 600 : 400,
                textDecoration: "none",
                transition: "color var(--transition-fast)",
                lineHeight: 1.6,
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
